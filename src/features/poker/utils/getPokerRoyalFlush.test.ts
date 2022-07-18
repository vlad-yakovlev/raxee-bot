import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerRoyalFlush } from './getPokerRoyalFlush';
import { getPokerStraight } from './getPokerStraight';
import { getPokerStraightFlush } from './getPokerStraightFlush';

test('should return all available royal flushes', () => {
  const cards = [
    new PokerCard(2, 12),
    new PokerCard(2, 11),
    new PokerCard(2, 10),
    new PokerCard(2, 9),
    new PokerCard(2, 8),
    new PokerCard(2, 7),
    new PokerCard(2, 6),
  ];

  expect(getPokerRoyalFlush(getPokerStraightFlush(getPokerStraight(cards)))).toStrictEqual([
    new PokerCombination(9, [new PokerCard(2, 12), new PokerCard(2, 11), new PokerCard(2, 10), new PokerCard(2, 9), new PokerCard(2, 8)]),
  ]);
});

test('should return nothing when no royal flushes', () => {
  const cards = [
    new PokerCard(2, 7),
    new PokerCard(2, 6),
    new PokerCard(2, 5),
    new PokerCard(2, 4),
    new PokerCard(2, 3),
    new PokerCard(2, 2),
    new PokerCard(2, 1),
  ];

  expect(getPokerRoyalFlush(getPokerStraightFlush(getPokerStraight(cards)))).toStrictEqual([]);
});
