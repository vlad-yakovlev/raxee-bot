import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerFourOfAKind } from './getPokerFourOfAKind';
import { getPokerOnePair } from './getPokerOnePair';
import { getPokerTwoPairs } from './getPokerTwoPairs';

test('should return all available quads', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(2, 9),
    new PokerCard(1, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 2),
    new PokerCard(0, 2),
  ];

  expect(getPokerFourOfAKind(getPokerTwoPairs(getPokerOnePair(cards)))).toStrictEqual([
    new PokerCombination(7, [new PokerCard(3, 2), new PokerCard(2, 2), new PokerCard(1, 2), new PokerCard(0, 2)]),
    new PokerCombination(7, [new PokerCard(3, 2), new PokerCard(1, 2), new PokerCard(2, 2), new PokerCard(0, 2)]),
    new PokerCombination(7, [new PokerCard(3, 2), new PokerCard(0, 2), new PokerCard(2, 2), new PokerCard(1, 2)]),
  ]);
});

test('should return nothing when no quads', () => {
  const cards = [
    new PokerCard(3, 9),
    new PokerCard(2, 9),
    new PokerCard(1, 9),
    new PokerCard(3, 2),
    new PokerCard(2, 2),
    new PokerCard(1, 1),
    new PokerCard(0, 1),
  ];

  expect(getPokerFourOfAKind(getPokerTwoPairs(getPokerOnePair(cards)))).toStrictEqual([]);
});
