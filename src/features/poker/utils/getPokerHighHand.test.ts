import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerHighHand } from './getPokerHighHand';

test('should return combination for every card', () => {
  const cards = [
    new PokerCard(3, 4),
    new PokerCard(2, 3),
    new PokerCard(1, 2),
    new PokerCard(0, 1),
  ];

  expect(getPokerHighHand(cards)).toStrictEqual([
    new PokerCombination(0, [new PokerCard(3, 4)]),
    new PokerCombination(0, [new PokerCard(2, 3)]),
    new PokerCombination(0, [new PokerCard(1, 2)]),
    new PokerCombination(0, [new PokerCard(0, 1)]),
  ]);
});
