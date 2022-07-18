export interface PokerCardRaw {
  suit: number
  value: number
}

export class PokerCard {
  constructor(public suit: number, public value: number) {}

  static fromRaw(raw: PokerCardRaw) {
    return new PokerCard(raw.suit, raw.value);
  }

  toRaw(): PokerCardRaw {
    return {
      suit: this.suit,
      value: this.value,
    };
  }

  toString() {
    return [
      ['♠️', '♣️', '♥️', '♦️'][this.suit],
      ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'][this.value],
    ].join('');
  }
}
