import { PokerCard } from '../classes/PokerCard';

import { getPokerCombinations } from './getPokerCombinations';

test('should sort cards strictly not in place and return combinations', () => {
  const cards = [
    new PokerCard(3, 2),
    new PokerCard(1, 9),
    new PokerCard(0, 2),
    new PokerCard(1, 3),
    new PokerCard(2, 2),
    new PokerCard(2, 9),
    new PokerCard(3, 9),
  ];

  expect(getPokerCombinations(cards)).toMatchSnapshot();

  expect(cards).toStrictEqual([
    new PokerCard(3, 2),
    new PokerCard(1, 9),
    new PokerCard(0, 2),
    new PokerCard(1, 3),
    new PokerCard(2, 2),
    new PokerCard(2, 9),
    new PokerCard(3, 9),
  ]);
});
