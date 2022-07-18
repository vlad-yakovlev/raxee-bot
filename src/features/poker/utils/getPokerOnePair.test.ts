import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerOnePair } from './getPokerOnePair';

test('should return all available pairs [1]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(2, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 1),
    new PokerCard(0, 1),
  ];

  expect(getPokerOnePair(cards)).toStrictEqual([
    new PokerCombination(1, [new PokerCard(3, 9), new PokerCard(2, 9)]),
    new PokerCombination(1, [new PokerCard(3, 2), new PokerCard(2, 2)]),
    new PokerCombination(1, [new PokerCard(1, 1), new PokerCard(0, 1)]),
  ]);
});

test('should return all available pairs [2]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 2),
    new PokerCard(0, 1),
  ];

  expect(getPokerOnePair(cards)).toStrictEqual([
    new PokerCombination(1, [new PokerCard(3, 2), new PokerCard(2, 2)]),
    new PokerCombination(1, [new PokerCard(3, 2), new PokerCard(1, 2)]),
    new PokerCombination(1, [new PokerCard(2, 2), new PokerCard(1, 2)]),
  ]);
});

test('should return all available pairs [3]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 2),
    new PokerCard(0, 2),
  ];

  expect(getPokerOnePair(cards)).toStrictEqual([
    new PokerCombination(1, [new PokerCard(3, 2), new PokerCard(2, 2)]),
    new PokerCombination(1, [new PokerCard(3, 2), new PokerCard(1, 2)]),
    new PokerCombination(1, [new PokerCard(3, 2), new PokerCard(0, 2)]),
    new PokerCombination(1, [new PokerCard(2, 2), new PokerCard(1, 2)]),
    new PokerCombination(1, [new PokerCard(2, 2), new PokerCard(0, 2)]),
    new PokerCombination(1, [new PokerCard(1, 2), new PokerCard(0, 2)]),
  ]);
});

test('should return all available pairs [4]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 3),
    new PokerCard(0, 1),
  ];

  expect(getPokerOnePair(cards)).toStrictEqual([
    new PokerCombination(1, [new PokerCard(3, 2), new PokerCard(2, 2)]),
  ]);
});

test('should return nothing when no pairs', () => {
  expect(getPokerOnePair([
    new PokerCard(3, 9),
    new PokerCard(3, 4),
    new PokerCard(2, 3),
    new PokerCard(1, 2),
    new PokerCard(0, 1),
  ])).toStrictEqual([]);
});
