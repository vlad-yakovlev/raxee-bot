import { PokerCard } from './PokerCard';

export class PokerCombination {
  constructor(public level: number, public cards: PokerCard[]) {}

  get weight() {
    return this.level * 1e10
    + (this.cards[0]?.value || 0) * 1e8
    + (this.cards[1]?.value || 0) * 1e6
    + (this.cards[2]?.value || 0) * 1e4
    + (this.cards[3]?.value || 0) * 1e2
    + (this.cards[4]?.value || 0);
  }

  get levelName() {
    return ['старшая карта', 'пара', 'две пары', 'сет', 'стрит', 'флеш', 'фулл хаус', 'каре', 'стрит флеш', 'флеш рояль'][this.level];
  }

  toString() {
    return [
      this.cards.join(' '),
      `(${this.levelName})`,
    ].join(' ');
  }
}
