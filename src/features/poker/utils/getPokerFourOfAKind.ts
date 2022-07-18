import * as R from 'remeda';

import { PokerCombination } from '../classes/PokerCombination';

export const getPokerFourOfAKind = (twoPairs: PokerCombination[]): PokerCombination[] => {
  return R.pipe(
    twoPairs,
    R.filter((combination) => combination.cards[0].value === combination.cards[2].value),
    R.map((combination) => new PokerCombination(7, combination.cards)),
  );
};
