import { PokerCard } from './PokerCard';

describe('#constructor', () => {
  test('should properly save suit and value', () => {
    const card = new PokerCard(2, 10);
    expect(card.suit).toBe(2);
    expect(card.value).toBe(10);
  });
});

describe('#fromRaw', () => {
  test('should properly build from raw', () => {
    const card = PokerCard.fromRaw({
      suit: 2,
      value: 10,
    });

    expect(card.suit).toBe(2);
    expect(card.value).toBe(10);
  });
});

describe('#toRaw', () => {
  test('should properly build raw', () => {
    const card = new PokerCard(2, 10);

    expect(card.toRaw()).toStrictEqual({
      suit: 2,
      value: 10,
    });
  });
});

describe('#toString', () => {
  test('should return text value', () => {
    const card = new PokerCard(2, 10);
    expect(card.toString()).toBe('♥️Q');
  });
});
