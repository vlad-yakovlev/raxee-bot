import * as R from 'remeda';
import { Markdown } from 'telegram-md';

import { getRandomItem } from '../../../utils/getRandomItem';
import { shuffleItems } from '../../../utils/shuffleItems';
import { pokerMessages, pokerStickers, pokerStrings } from '../constants';
import { PokerContext } from '../types';
import { getPokerCombinations } from '../utils/getPokerCombinations';

import { PokerCard, PokerCardRaw } from './PokerCard';
import { PokerPlayer } from './PokerPlayer';
import { PokerPlayersList, PokerPlayersListRaw } from './PokerPlayersList';

export interface PokerStateRaw {
  cards: PokerCardRaw[];
  cardsOpened: number;
  firstPlayerIndex: number;
  playersList: PokerPlayersListRaw;
  round: number;
  started: boolean;
}

export class PokerState {
  cards: PokerCard[] = [];

  cardsOpened = 0;

  firstPlayerIndex = -1;

  playersList = new PokerPlayersList([], 0);

  round = -1;

  started = false;

  constructor(public ctx: PokerContext) {}

  static fromRaw(ctx: PokerContext, raw: PokerStateRaw) {
    const instance = new PokerState(ctx);
    instance.cards = raw.cards.map((rawCard) => PokerCard.fromRaw(rawCard));
    instance.cardsOpened = raw.cardsOpened;
    instance.firstPlayerIndex = raw.firstPlayerIndex;
    instance.playersList = PokerPlayersList.fromRaw(ctx, raw.playersList);
    instance.round = raw.round;
    instance.started = raw.started;
    return instance;
  }

  toRaw(): PokerStateRaw {
    return {
      cards: this.cards.map((card) => card.toRaw()),
      cardsOpened: this.cardsOpened,
      firstPlayerIndex: this.firstPlayerIndex,
      playersList: this.playersList.toRaw(),
      round: this.round,
      started: this.started,
    };
  }

  get bankAmount() {
    return this.playersList.players.reduce((sum, player) => sum + player.bet, 0);
  }

  get baseBet() {
    return (Math.floor(this.round / 4) + 1) * 10;
  }

  get topBet() {
    return Math.max(...this.playersList.players.map((player) => player.bet));
  }

  get isAllIn() {
    return this.playersList.players.some((player) => !player.lost && player.balance === 0);
  }

  get boardCombinations() {
    return getPokerCombinations(this.cards);
  }

  get topWeight() {
    return Math.max(...this.playersList.players.map((player) => (!player.lost && !player.folded && player.topCombination ? player.topCombination.weight : -1)));
  }

  async broadcastMessage(message: string | Markdown, players = this.playersList.players) {
    await Promise.all(players.map((player) => player.sendMessage(message)));
  }

  async broadcastPlayerMessage(player: PokerPlayer, message: string) {
    const fullMessage = pokerMessages._.playerMessage(player, message);

    await Promise.all(this.playersList.players.map(async (p) => {
      if (player !== p) {
        await p.sendMessage(fullMessage);
      }
    }));
  }

  async setKeyboards() {
    await Promise.all(this.playersList.players.map((player) => player.setKeyboard()));
  }

  async dealCards() {
    const deck = shuffleItems(R.range(0, 52)).map((fullValue) => new PokerCard(fullValue % 4, Math.floor(fullValue / 4)));

    this.started = true;
    this.round += 1;
    this.cards = deck.splice(0, 5);
    this.cardsOpened = 0;

    this.playersList.players.forEach((player) => {
      player.bet = 0;
      player.cards = deck.splice(0, 2);
      player.folded = false;
      player.turnMade = false;
    });

    this.playersList.toIndex(this.firstPlayerIndex);
    this.playersList.toNext();
    this.firstPlayerIndex = this.playersList.index;
    const small = this.playersList.current;
    this.playersList.toNext();
    const big = this.playersList.current;
    this.playersList.toNext();

    big.increaseBet(this.baseBet * 2);
    small.increaseBet(this.baseBet);

    await this.broadcastMessage(pokerMessages._.roundStarted(this.playersList.players.filter((player) => !player.lost), big, small));
    await this.setKeyboards();
  }

  async finishGame() {
    await this.broadcastMessage(pokerMessages._.gameFinished);

    await Promise.all(this.playersList.players.map(async (player) => {
      await this.ctx?.api.sendSticker(player.user.id, getRandomItem(pokerStickers), { reply_markup: { remove_keyboard: true } });
    }));

    this.ctx.pokerRootState.resetLobby();
    this.ctx.pokerState = new PokerState(this.ctx);
  }

  async finishRound() {
    await this.broadcastMessage(pokerMessages._.roundFinished(this.cards, this.playersList.players.filter((player) => !player.lost)));

    const winnersCount = this.playersList.players.reduce((acc, player) => (player.win ? acc + 1 : acc), 0);
    const winAmount = this.bankAmount / winnersCount;

    this.playersList.players.forEach((player) => {
      if (player.win) {
        player.balance += winAmount;
      }

      if (player.balance === 0) {
        player.lost = true;
      }
    });

    if (this.playersList.players.filter((player) => !player.lost).length < 2) {
      await this.finishGame();
    } else {
      await this.dealCards();
    }
  }

  async nextTurn() {
    this.playersList.current.turnMade = true;

    if (this.playersList.players.filter((player) => !player.lost && !player.folded).length < 2) {
      await this.finishRound();
      return;
    }

    if (this.playersList.players.every((player) => player.lost || player.folded || player.balance === 0 || (player.turnMade && player.bet === this.topBet))) {
      if (this.cardsOpened === 5 || this.isAllIn) {
        await this.finishRound();
        return;
      }

      this.playersList.players.forEach((player) => {
        player.turnMade = false;
      });

      this.cardsOpened += this.cardsOpened ? 1 : 3;
      this.playersList.toIndex(this.firstPlayerIndex - 1);
    }

    this.playersList.toNext();

    await this.setKeyboards();
  }

  async handleMessage(player: PokerPlayer, message: string) {
    switch (message) {
      case pokerStrings.fold: {
        if (!this.playersList.current.canFold) {
          return pokerMessages.onMessage.foldIsNotAllowed;
        }

        this.playersList.current.folded = true;
        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
        break;
      }

      case pokerStrings.check: {
        if (!this.playersList.current.canCheck) {
          return pokerMessages.onMessage.checkIsNotAllowed;
        }

        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
        break;
      }

      case pokerStrings.call(this.playersList.current.callAmount): {
        if (!this.playersList.current.canCall) {
          return pokerMessages.onMessage.callIsNotAllowed;
        }

        this.playersList.current.increaseBet(this.playersList.current.callAmount);
        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
        break;
      }

      case pokerStrings.allIn: {
        if (!this.playersList.current.canAllIn) {
          return pokerMessages.onMessage.allInIsNotAllowed;
        }

        this.playersList.current.increaseBet(this.playersList.current.balance);
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

        if (!this.playersList.current.canRaise) {
          return pokerMessages.onMessage.raiseIsNotAllowed;
        }

        if (betAmount >= this.playersList.current.balance) {
          return pokerMessages.onMessage.betTooBig;
        }

        if (betAmount < this.playersList.current.callAmount + this.baseBet) {
          return pokerMessages.onMessage.betTooSmall;
        }

        this.playersList.current.increaseBet(betAmount);
        await this.broadcastPlayerMessage(player, message);
        await this.nextTurn();
      }
    }
  }
}
