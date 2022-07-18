import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerFullHouse } from './getPokerFullHouse';
import { getPokerOnePair } from './getPokerOnePair';
import { getPokerThreeOfAKind } from './getPokerThreeOfAKind';

test('should return all available houses [1]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(2, 9),
    new PokerCard(1, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
  ];

  expect(getPokerFullHouse(getPokerOnePair(cards), getPokerThreeOfAKind(cards))).toStrictEqual([
    new PokerCombination(6, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(1, 9), new PokerCard(3, 2), new PokerCard(2, 2)]),
  ]);
});

test('should return all available houses [2]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(2, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 2),
  ];

  expect(getPokerFullHouse(getPokerOnePair(cards), getPokerThreeOfAKind(cards))).toStrictEqual([
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(3, 9), new PokerCard(2, 9)]),
  ]);
});

test('should return all available houses [3]', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(2, 9),
    new PokerCard(1, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 2),
    new PokerCard(0, 2),
  ];

  expect(getPokerFullHouse(getPokerOnePair(cards), getPokerThreeOfAKind(cards))).toStrictEqual([
    new PokerCombination(6, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(1, 9), new PokerCard(3, 2), new PokerCard(2, 2)]),
    new PokerCombination(6, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(1, 9), new PokerCard(3, 2), new PokerCard(1, 2)]),
    new PokerCombination(6, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(1, 9), new PokerCard(3, 2), new PokerCard(0, 2)]),
    new PokerCombination(6, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(1, 9), new PokerCard(2, 2), new PokerCard(1, 2)]),
    new PokerCombination(6, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(1, 9), new PokerCard(2, 2), new PokerCard(0, 2)]),
    new PokerCombination(6, [new PokerCard(3, 9), new PokerCard(2, 9), new PokerCard(1, 9), new PokerCard(1, 2), new PokerCard(0, 2)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(3, 9), new PokerCard(2, 9)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(3, 9), new PokerCard(1, 9)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(2, 9), new PokerCard(1, 9)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(0, 2), new PokerCard(3, 9), new PokerCard(2, 9)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(0, 2), new PokerCard(3, 9), new PokerCard(1, 9)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(0, 2), new PokerCard(2, 9), new PokerCard(1, 9)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(1, 2), new PokerCard(0, 2), new PokerCard(3, 9), new PokerCard(2, 9)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(1, 2), new PokerCard(0, 2), new PokerCard(3, 9), new PokerCard(1, 9)]),
    new PokerCombination(6, [new PokerCard(3, 2), new PokerCard(1, 2), new PokerCard(0, 2), new PokerCard(2, 9), new PokerCard(1, 9)]),
    new PokerCombination(6, [new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(0, 2), new PokerCard(3, 9), new PokerCard(2, 9)]),
    new PokerCombination(6, [new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(0, 2), new PokerCard(3, 9), new PokerCard(1, 9)]),
    new PokerCombination(6, [new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(0, 2), new PokerCard(2, 9), new PokerCard(1, 9)]),
  ]);
});

test('should return nothing when no houses', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(2, 9),
    new PokerCard(1, 9),
    new PokerCard(3, 4),
    new PokerCard(2, 3),
    new PokerCard(1, 2),
    new PokerCard(0, 1),
  ];

  expect(getPokerFullHouse(getPokerOnePair(cards), getPokerThreeOfAKind(cards))).toStrictEqual([]);
});
