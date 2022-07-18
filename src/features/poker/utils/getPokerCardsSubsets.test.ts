import { PokerCard } from '../classes/PokerCard';

import { getPokerCardsSubsets } from './getPokerCardsSubsets';

test('should accept 5 cards', () => {
  expect(getPokerCardsSubsets([
    new PokerCard(0, 1),
    new PokerCard(1, 2),
    new PokerCard(2, 3),
    new PokerCard(3, 4),
    new PokerCard(0, 5),
  ])).toStrictEqual([
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(0, 5)],
  ]);
});

test('should accept less than 5 cards', () => {
  expect(getPokerCardsSubsets([
    new PokerCard(0, 1),
    new PokerCard(1, 2),
    new PokerCard(2, 3),
    new PokerCard(3, 4),
  ])).toStrictEqual([]);
});

test('should accept 0 cards', () => {
  expect(getPokerCardsSubsets([])).toStrictEqual([]);
});

test('should accept more than 5 cards', () => {
  expect(getPokerCardsSubsets([
    new PokerCard(0, 1),
    new PokerCard(1, 2),
    new PokerCard(2, 3),
    new PokerCard(3, 4),
    new PokerCard(0, 5),
    new PokerCard(1, 6),
    new PokerCard(2, 7),
  ])).toStrictEqual([
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(0, 5)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(1, 6)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(0, 5), new PokerCard(1, 6)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(0, 5), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(1, 6)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(3, 4), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(1, 2), new PokerCard(0, 5), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(1, 6)],
    [new PokerCard(0, 1), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(2, 3), new PokerCard(0, 5), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(0, 1), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(1, 6)],
    [new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(2, 7)],
    [new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(1, 2), new PokerCard(2, 3), new PokerCard(0, 5), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(1, 2), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(1, 6), new PokerCard(2, 7)],
    [new PokerCard(2, 3), new PokerCard(3, 4), new PokerCard(0, 5), new PokerCard(1, 6), new PokerCard(2, 7)],
  ]);
});
