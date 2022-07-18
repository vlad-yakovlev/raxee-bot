import * as R from 'remeda';

import { getRandomItem } from '../../../utils/getRandomItem';
import { shuffleItems } from '../../../utils/shuffleItems';
import { pokerMessages, pokerStickers, pokerStrings } from '../constants';
import { PokerContext } from '../types';
import { getPokerCombinations } from '../utils/getPokerCombinations';

import { PokerCard, PokerCardRaw } from './PokerCard';
import { PokerPlayer, PokerPlayerRaw } from './PokerPlayer';

export interface PokerStateRaw {
  activePlayerIndex: number;
  cards: PokerCardRaw[];
  cardsOpened: number;
  firstPlayerIndex: number;
  players: PokerPlayerRaw[];
  round: number;
  started: boolean;
}

export class PokerState {
  activePlayerIndex = 0;

  cards: PokerCard[] = [];

  cardsOpened = 0;

  firstPlayerIndex = -1;

  players: PokerPlayer[] = [];

  round = -1;

  started = false;

  constructor(public ctx: PokerContext) {}

  static fromRaw(ctx: PokerContext, raw: PokerStateRaw) {
    const instance = new PokerState(ctx);
    instance.activePlayerIndex = raw.activePlayerIndex;
    instance.cards = raw.cards.map((rawCard) => PokerCard.fromRaw(rawCard));
    instance.cardsOpened = raw.cardsOpened;
    instance.firstPlayerIndex = raw.firstPlayerIndex;
    instance.players = raw.players.map((rawPlayer) => PokerPlayer.fromRaw(ctx, rawPlayer));
    instance.round = raw.round;
    instance.started = raw.started;
    return instance;
  }

  toRaw(): PokerStateRaw {
    return {
      activePlayerIndex: this.activePlayerIndex,
      cards: this.cards.map((card) => card.toRaw()),
      cardsOpened: this.cardsOpened,
      firstPlayerIndex: this.firstPlayerIndex,
      players: this.players.map((player) => player.toRaw()),
      round: this.round,
      started: this.started,
    };
  }

  getPlayerByUserId(userId: number) {
    return this.players.find((player) => player.user.id === userId);
  }

  get activePlayer() {
    return this.players[this.activePlayerIndex];
  }

  get bankAmount() {
    return this.players.reduce((sum, player) => sum + player.bet, 0);
  }

  get baseBet() {
    return (Math.floor(this.round / 4) + 1) * 10;
  }

  get topBet() {
    return Math.max(...this.players.map((player) => player.bet));
  }

  get isAllIn() {
    return this.players.some((player) => !player.lost && player.balance === 0);
  }

  get boardCombinations() {
    return getPokerCombinations(this.cards);
  }

  get topWeight() {
    return Math.max(...this.players.map((player) => (!player.lost && !player.folded && player.topCombination ? player.topCombination.weight : -1)));
  }

  getNextPlayerIndex(index: number, checkBalance = false) {
    do {
      index += 1;
      index %= this.players.length;
    } while (this.players[index].lost || this.players[index].folded || (checkBalance && this.players[index].balance === 0));

    return index;
  }

  async broadcastMessage(message: string, players = this.players) {
    await Promise.all(players.map((player) => player.sendMessage(message)));
  }

  async broadcastPlayerMessage(player: PokerPlayer, message: string) {
    const fullMessage = pokerMessages._.playerMessage(player, message);

    await Promise.all(this.players.map(async (p) => {
      if (player !== p) {
        await p.sendMessage(fullMessage);
      }
    }));
  }

  async setKeyboards() {
    await Promise.all(this.players.map((player) => player.setKeyboard()));
  }

  async dealCards() {
    const deck = shuffleItems(R.range(0, 52)).map((fullValue) => new PokerCard(fullValue % 4, Math.floor(fullValue / 4)));

    this.started = true;
    this.round += 1;
    this.cards = deck.splice(0, 5);
    this.cardsOpened = 3;

    this.players.forEach((player) => {
      player.bet = 0;
      player.cards = deck.splice(0, 2);
      player.folded = false;
      player.turnMade = false;
    });

    this.firstPlayerIndex = this.getNextPlayerIndex(this.firstPlayerIndex);
    this.activePlayerIndex = this.getNextPlayerIndex(this.firstPlayerIndex);

    const big = this.players[this.firstPlayerIndex];
    const small = this.activePlayer;

    big.increaseBet(this.baseBet * 2);
    small.increaseBet(this.baseBet);

    await this.broadcastMessage(pokerMessages._.roundStarted(this.players.filter((player) => !player.lost), big, small));
    await this.setKeyboards();
  }

  async finishGame() {
    await this.broadcastMessage(pokerMessages._.gameFinished);

    await Promise.all(this.players.map(async (player) => {
      await this.ctx?.api.sendSticker(player.user.id, getRandomItem(pokerStickers), { reply_markup: { remove_keyboard: true } });
    }));

    this.ctx.pokerRootState.resetLobby();
    this.ctx.pokerState = new PokerState(this.ctx);
  }

  async finishRound() {
    await this.broadcastMessage(pokerMessages._.roundFinished(this.cards, this.players.filter((player) => !player.lost)));

    const winnersCount = this.players.reduce((acc, player) => (player.win ? acc + 1 : acc), 0);
    const winAmount = this.bankAmount / winnersCount;

    this.players.forEach((player) => {
      if (player.win) {
        player.balance += winAmount;
      }

      if (player.balance === 0) {
        player.lost = true;
      }
    });

    if (this.players.filter((player) => !player.lost).length < 2) {
      await this.finishGame();
    } else {
      await this.dealCards();
    }
  }

  async nextTurn() {
    this.activePlayer.turnMade = true;

    if (this.players.filter((player) => !player.lost && !player.folded).length < 2) {
      await this.finishRound();
      return;
    }

    if (this.players.every((player) => player.lost || player.folded || player.balance === 0 || (player.turnMade && player.bet === this.topBet))) {
      if (this.cardsOpened === 5 || this.isAllIn) {
        await this.finishRound();
        return;
      }

      this.players.forEach((player) => {
        player.turnMade = false;
      });

      this.cardsOpened += 1;
      this.activePlayerIndex = this.getNextPlayerIndex(this.firstPlayerIndex - 1);
    } else {
      this.activePlayerIndex = this.getNextPlayerIndex(this.activePlayerIndex);
    }

    await this.setKeyboards();
  }

  async handleMessage(player: PokerPlayer, message: string) {
    switch (message) {
      case pokerStrings.fold: {
        if (!this.activePlayer.canFold) {
          return pokerMessages.onMessage.foldIsNotAllowed;
        }

        this.activePlayer.folded = true;
        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
        break;
      }

      case pokerStrings.check: {
        if (!this.activePlayer.canCheck) {
          return pokerMessages.onMessage.checkIsNotAllowed;
        }

        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
        break;
      }

      case pokerStrings.call(this.activePlayer.callAmount): {
        if (!this.activePlayer.canCall) {
          return pokerMessages.onMessage.callIsNotAllowed;
        }

        this.activePlayer.increaseBet(this.activePlayer.callAmount);
        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
        break;
      }

      case pokerStrings.allIn: {
        if (!this.activePlayer.canAllIn) {
          return pokerMessages.onMessage.allInIsNotAllowed;
        }

        this.activePlayer.increaseBet(this.activePlayer.balance);
        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
        break;
      }

      default: {
        const betAmount = Number(message);

        if (!betAmount) {
          await this.broadcastPlayerMessage(player, message);
          return pokerMessages.onMessage.unknownCommand;
        }

        if (!this.activePlayer.canRaise) {
          return pokerMessages.onMessage.raiseIsNotAllowed;
        }

        if (betAmount >= this.activePlayer.balance) {
          return pokerMessages.onMessage.betTooBig;
        }

        if (betAmount < this.activePlayer.callAmount + this.baseBet) {
          return pokerMessages.onMessage.betTooSmall;
        }

        this.activePlayer.increaseBet(betAmount);
        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
      }
    }
  }
}
