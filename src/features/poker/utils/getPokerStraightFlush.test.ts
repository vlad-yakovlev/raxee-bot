import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerStraight } from './getPokerStraight';
import { getPokerStraightFlush } from './getPokerStraightFlush';

test('should return all available straight flushes [1]', () => {
  const cards = [
    new PokerCard(3, 8),
    new PokerCard(1, 5),
    new PokerCard(1, 4),
    new PokerCard(2, 3),
    new PokerCard(1, 3),
    new PokerCard(1, 2),
    new PokerCard(1, 1),
  ];

  expect(getPokerStraightFlush(getPokerStraight(cards))).toStrictEqual([
    new PokerCombination(8, [new PokerCard(1, 5), new PokerCard(1, 4), new PokerCard(1, 3), new PokerCard(1, 2), new PokerCard(1, 1)]),
  ]);
});

test('should return all available straight flushes [2]', () => {
  const cards = [
    new PokerCard(1, 8),
    new PokerCard(2, 6),
    new PokerCard(2, 5),
    new PokerCard(2, 4),
    new PokerCard(2, 3),
    new PokerCard(2, 2),
    new PokerCard(2, 1),
  ];

  expect(getPokerStraightFlush(getPokerStraight(cards))).toStrictEqual([
    new PokerCombination(8, [new PokerCard(2, 6), new PokerCard(2, 5), new PokerCard(2, 4), new PokerCard(2, 3), new PokerCard(2, 2)]),
    new PokerCombination(8, [new PokerCard(2, 5), new PokerCard(2, 4), new PokerCard(2, 3), new PokerCard(2, 2), new PokerCard(2, 1)]),
  ]);
});

test('should return nothing when no straight flushes', () => {
  const cards = [
    new PokerCard(1, 8),
    new PokerCard(0, 5),
    new PokerCard(0, 4),
    new PokerCard(2, 3),
    new PokerCard(1, 3),
    new PokerCard(2, 2),
    new PokerCard(1, 1),
  ];

  expect(getPokerStraightFlush(getPokerStraight(cards))).toStrictEqual([]);
});
