import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerFlush } from './getPokerFlush';

test('should return all available flushes', () => {
  const cards = [
    new PokerCard(1, 10),
    new PokerCard(1, 7),
    new PokerCard(1, 4),
    new PokerCard(2, 4),
    new PokerCard(1, 3),
    new PokerCard(1, 2),
    new PokerCard(1, 1),
  ];

  expect(getPokerFlush(cards)).toStrictEqual([
    new PokerCombination(5, [new PokerCard(1, 10), new PokerCard(1, 7), new PokerCard(1, 4), new PokerCard(1, 3), new PokerCard(1, 2)]),
    new PokerCombination(5, [new PokerCard(1, 10), new PokerCard(1, 7), new PokerCard(1, 4), new PokerCard(1, 3), new PokerCard(1, 1)]),
    new PokerCombination(5, [new PokerCard(1, 10), new PokerCard(1, 7), new PokerCard(1, 4), new PokerCard(1, 2), new PokerCard(1, 1)]),
    new PokerCombination(5, [new PokerCard(1, 10), new PokerCard(1, 7), new PokerCard(1, 3), new PokerCard(1, 2), new PokerCard(1, 1)]),
    new PokerCombination(5, [new PokerCard(1, 10), new PokerCard(1, 4), new PokerCard(1, 3), new PokerCard(1, 2), new PokerCard(1, 1)]),
    new PokerCombination(5, [new PokerCard(1, 7), new PokerCard(1, 4), new PokerCard(1, 3), new PokerCard(1, 2), new PokerCard(1, 1)]),
  ]);
});

test('should return nothing when no flushes', () => {
  const cards = [
    new PokerCard(1, 10),
    new PokerCard(1, 7),
    new PokerCard(3, 4),
    new PokerCard(2, 4),
    new PokerCard(1, 3),
    new PokerCard(0, 2),
    new PokerCard(1, 1),
  ];

  expect(getPokerFlush(cards)).toStrictEqual([]);
});
