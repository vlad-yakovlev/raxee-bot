import { PokerCard } from '../classes/PokerCard';

export type PokerCardsSubset = [PokerCard, PokerCard, PokerCard, PokerCard, PokerCard];

export const getPokerCardsSubsets = (cards: PokerCard[]): PokerCardsSubset[] => {
  const subsets: PokerCardsSubset[] = [];

  for (let i = 0; i < cards.length - 4; i += 1) {
    for (let j = i + 1; j < cards.length - 3; j += 1) {
      for (let k = j + 1; k < cards.length - 2; k += 1) {
        for (let l = k + 1; l < cards.length - 1; l += 1) {
          for (let m = l + 1; m < cards.length; m += 1) {
            subsets.push([cards[i], cards[j], cards[k], cards[l], cards[m]]);
          }
        }
      }
    }
  }

  return subsets;
};
