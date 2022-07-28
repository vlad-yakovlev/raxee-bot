import * as R from 'remeda';

import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerCardsSubsets, PokerCardsSubset } from './getPokerCardsSubsets';

const isStraight = (subset: PokerCardsSubset): boolean => {
  for (let i = 1; i < subset.length; i += 1) {
    const diff = subset[0].value - subset[i].value - i;

    if (diff !== 0 && diff !== -13) {
      return false;
    }
  }

  return true;
};

export const getPokerStraight = (cards: PokerCard[]): PokerCombination[] => {
  return R.pipe(
    [...cards, ...cards],
    getPokerCardsSubsets,
    R.filter(isStraight),
    R.uniqWith(R.equals),
    R.map((subset) => new PokerCombination(4, subset)),
  );
};
