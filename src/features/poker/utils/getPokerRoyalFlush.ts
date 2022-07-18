import * as R from 'remeda';

import { PokerCombination } from '../classes/PokerCombination';

export const getPokerRoyalFlush = (straightFlush: PokerCombination[]): PokerCombination[] => {
  return R.pipe(
    straightFlush,
    R.filter((combination) => combination.cards[0].value === 12),
    R.map((combination) => new PokerCombination(9, combination.cards)),
  );
};
