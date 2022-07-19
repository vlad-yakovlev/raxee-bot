import { User } from 'grammy/out/platform.node';
import * as R from 'remeda';

import { differenceWith } from '../../../utils/differenceWith';
import { MayBeEscaped, md } from '../../../utils/md';
import { pokerMessages, pokerStrings } from '../constants';
import { PokerContext } from '../types';
import { getPokerCombinations } from '../utils/getPokerCombinations';

import { PokerCard, PokerCardRaw } from './PokerCard';

export interface PokerPlayerRaw {
  balance: number;
  bet: number;
  cards: PokerCardRaw[];
  folded: boolean;
  lost: boolean;
  turnMade: boolean;
  user: User;
}

export class PokerPlayer {
  balance = 1000;

  bet = 0;

  cards: PokerCard[] = [];

  folded = false;

  lost = false;

  turnMade = false;

  constructor(public ctx: PokerContext, public user: User) {}

  static fromRaw(ctx: PokerContext, raw: PokerPlayerRaw) {
    const instance = new PokerPlayer(ctx, raw.user);
    instance.balance = raw.balance;
    instance.bet = raw.bet;
    instance.cards = raw.cards.map((rawCard) => PokerCard.fromRaw(rawCard));
    instance.folded = raw.folded;
    instance.lost = raw.lost;
    instance.turnMade = raw.turnMade;
    return instance;
  }

  toRaw(): PokerPlayerRaw {
    return {
      balance: this.balance,
      bet: this.bet,
      cards: this.cards.map((card) => card.toRaw()),
      folded: this.folded,
      lost: this.lost,
      turnMade: this.turnMade,
      user: this.user,
    };
  }

  get topCombination() {
    return R.pipe(
      [...this.ctx.pokerState.cards, ...this.cards],
      getPokerCombinations,
      differenceWith(this.ctx.pokerState.boardCombinations, R.equals),
      R.first(),
    );
  }

  get win() {
    return !this.lost && !this.folded && this.topCombination?.weight === this.ctx.pokerState.topWeight;
  }

  get callAmount() {
    return this.ctx.pokerState.topBet - this.bet;
  }

  get canFold() {
    return !(this.ctx.pokerState.isAllIn && this.balance === 0);
  }

  get canCheck() {
    return this.callAmount === 0;
  }

  get canCall() {
    return this.callAmount > 0 && this.callAmount < this.balance;
  }

  get canAllIn() {
    return !this.ctx.pokerState.isAllIn || (!this.canCheck && !this.canCall);
  }

  get canRaise() {
    return !this.ctx.pokerState.isAllIn;
  }

  get keyboard(): string[][] {
    return [
      this.ctx.pokerState.cards.map((card, index) => (index < this.ctx.pokerState.cardsOpened ? card.toString() : ' ')),
      [`Банк: ${this.ctx.pokerState.bankAmount} 🪙`],
      !this.lost && [...this.cards.map(String), `${this.balance} 🪙`],
      this === this.ctx.pokerState.activePlayer && [
        this.canFold && pokerStrings.fold,
        this.canCheck && pokerStrings.check,
        this.canCall && pokerStrings.call(this.callAmount),
        this.canAllIn && pokerStrings.allIn,
      ].filter(R.isTruthy),
    ].filter(R.isTruthy);
  }

  async sendMessage(message: MayBeEscaped, withKeyboard = false) {
    await this.ctx.api.sendMessage(
      this.user.id,
      md.build(message),
      {
        parse_mode: 'MarkdownV2',
        ...withKeyboard && { reply_markup: { keyboard: this.keyboard } },
      },
    );
  }

  async setKeyboard() {
    await this.sendMessage(
      pokerMessages._.userTurn(this.ctx.pokerState.activePlayer),
      true,
    );
  }

  increaseBet(amount: number) {
    amount = Math.min(amount, this.balance);

    this.bet += amount;
    this.balance -= amount;
  }
}
