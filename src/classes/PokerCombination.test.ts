import { PokerCard } from './PokerCard';
import { PokerCombination } from './PokerCombination';

describe('#constructor', () => {
  test('should properly save level and cards', () => {
    const cards = [new PokerCard(1, 3), new PokerCard(0, 7)];
    const combination = new PokerCombination(1, cards);
    expect(combination.level).toBe(1);
    expect(combination.cards).toBe(cards);
  });
});

describe('#weight', () => {
  test('should return weight when 5 cards', () => {
    const cards = [new PokerCard(1, 7), new PokerCard(2, 4), new PokerCard(0, 12), new PokerCard(3, 2), new PokerCard(0, 5)];
    const combination = new PokerCombination(2, cards);
    expect(combination.weight).toBe(20704120205);
  });

  test('should return weight when less than 5 cards', () => {
    const cards = [new PokerCard(1, 7), new PokerCard(2, 4)];
    const combination = new PokerCombination(1, cards);
    expect(combination.weight).toBe(10704000000);
  });

  test('should return weight when no cards', () => {
    const combination = new PokerCombination(2, []);
    expect(combination.weight).toBe(20000000000);
  });
});

describe('#levelName', () => {
  test('should return level name', () => {
    const cards = [new PokerCard(1, 3), new PokerCard(0, 7), new PokerCard(3, 4)];
    const combination = new PokerCombination(3, cards);
    expect(combination.levelName).toBe('сет');
  });
});

describe('#toString', () => {
  test('should return text value', () => {
    const cards = [new PokerCard(1, 3), new PokerCard(0, 7), new PokerCard(3, 4), new PokerCard(3, 5)];
    const combination = new PokerCombination(2, cards);
    expect(combination.toString()).toBe('♣️5 ♠️9 ♦️6 ♦️7 (две пары)');
  });
});
