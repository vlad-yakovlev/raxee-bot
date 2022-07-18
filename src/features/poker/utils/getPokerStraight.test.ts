import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerStraight } from './getPokerStraight';

test('should return all available straights [1]', () => {
  const cards = [
    new PokerCard(1, 8),
    new PokerCard(0, 5),
    new PokerCard(0, 4),
    new PokerCard(2, 3),
    new PokerCard(1, 3),
    new PokerCard(2, 2),
    new PokerCard(1, 1),
  ];

  expect(getPokerStraight(cards)).toStrictEqual([
    new PokerCombination(4, [new PokerCard(0, 5), new PokerCard(0, 4), new PokerCard(2, 3), new PokerCard(2, 2), new PokerCard(1, 1)]),
    new PokerCombination(4, [new PokerCard(0, 5), new PokerCard(0, 4), new PokerCard(1, 3), new PokerCard(2, 2), new PokerCard(1, 1)]),
  ]);
});

test('should return all available straights [2]', () => {
  const cards = [
    new PokerCard(1, 8),
    new PokerCard(2, 6),
    new PokerCard(0, 5),
    new PokerCard(0, 4),
    new PokerCard(2, 3),
    new PokerCard(2, 2),
    new PokerCard(1, 1),
  ];

  expect(getPokerStraight(cards)).toStrictEqual([
    new PokerCombination(4, [new PokerCard(2, 6), new PokerCard(0, 5), new PokerCard(0, 4), new PokerCard(2, 3), new PokerCard(2, 2)]),
    new PokerCombination(4, [new PokerCard(0, 5), new PokerCard(0, 4), new PokerCard(2, 3), new PokerCard(2, 2), new PokerCard(1, 1)]),
  ]);
});

test('should cycle through aces', () => {
  const cards = [
    new PokerCard(1, 12),
    new PokerCard(2, 11),
    new PokerCard(0, 5),
    new PokerCard(2, 4),
    new PokerCard(1, 2),
    new PokerCard(2, 1),
    new PokerCard(1, 0),
  ];

  expect(getPokerStraight(cards)).toStrictEqual([
    new PokerCombination(4, [new PokerCard(1, 2), new PokerCard(2, 1), new PokerCard(1, 0), new PokerCard(1, 12), new PokerCard(2, 11)]),
  ]);
});

test('should return nothing when no straights', () => {
  const cards = [
    new PokerCard(1, 10),
    new PokerCard(1, 7),
    new PokerCard(3, 4),
    new PokerCard(2, 4),
    new PokerCard(1, 3),
    new PokerCard(0, 2),
    new PokerCard(1, 1),
  ];

  expect(getPokerStraight(cards)).toStrictEqual([]);
});
