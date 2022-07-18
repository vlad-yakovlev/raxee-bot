import * as R from 'remeda';

import { PokerCombination } from '../classes/PokerCombination';

export const getPokerStraightFlush = (straight: PokerCombination[]): PokerCombination[] => {
  return R.pipe(
    straight,
    R.filter((combination) => combination.cards.every((card) => card.suit === combination.cards[0].suit)),
    R.map((combination) => new PokerCombination(8, combination.cards)),
  );
};
