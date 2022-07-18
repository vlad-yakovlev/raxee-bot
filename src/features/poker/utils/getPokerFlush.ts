import * as R from 'remeda';

import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerCardsSubsets } from './getPokerCardsSubsets';

export const getPokerFlush = (cards: PokerCard[]): PokerCombination[] => {
  return R.pipe(
    cards,
    getPokerCardsSubsets,
    R.filter((subset) => subset.every((card) => card.suit === subset[0].suit)),
    R.map((subset) => new PokerCombination(5, subset)),
  );
};
