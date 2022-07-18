import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerOnePair } from './getPokerOnePair';
import { getPokerTwoPairs } from './getPokerTwoPairs';

test('should return all available double pairs [1]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(2, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 1),
    new PokerCard(0, 1),
  ];

  expect(getPokerTwoPairs(getPokerOnePair(cards))).toStrictEqual([
    new PokerCombination(2, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(3, 2), new PokerCard(2, 2)]),
    new PokerCombination(2, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(1, 1), new PokerCard(0, 1)]),
    new PokerCombination(2, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(1, 1), new PokerCard(0, 1)]),
  ]);
});

test('should return all available double pairs [2]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 2),
    new PokerCard(0, 2),
  ];

  expect(getPokerTwoPairs(getPokerOnePair(cards))).toStrictEqual([
    new PokerCombination(2, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(0, 2)]),
    new PokerCombination(2, [new PokerCard(3, 2), new PokerCard(1, 2), new PokerCard(2, 2), new PokerCard(0, 2)]),
    new PokerCombination(2, [new PokerCard(3, 2), new PokerCard(0, 2), new PokerCard(2, 2), new PokerCard(1, 2)]),
  ]);
});

test('should return nothing when no double pairs [1]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 2),
    new PokerCard(0, 1),
  ];

  expect(getPokerTwoPairs(getPokerOnePair(cards))).toStrictEqual([]);
});

test('should return nothing when no double pairs [2]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 3),
    new PokerCard(0, 1),
  ];

  expect(getPokerTwoPairs(getPokerOnePair(cards))).toStrictEqual([]);
});
