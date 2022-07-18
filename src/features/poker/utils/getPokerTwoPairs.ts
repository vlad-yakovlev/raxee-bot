import * as R from 'remeda';

import { uniqWith } from '../../../utils/uniqWith';
import { PokerCombination } from '../classes/PokerCombination';

export const getPokerTwoPairs = (onePair: PokerCombination[]): PokerCombination[] => {
  const combinations: PokerCombination[] = [];

  for (let i = 0; i < onePair.length - 1; i += 1) {
    for (let j = i + 1; j < onePair.length; j += 1) {
      const subset = [...onePair[i].cards, ...onePair[j].cards];

      if (uniqWith(subset, R.equals).length === 4) {
        combinations.push(new PokerCombination(2, subset));
      }
    }
  }

  return combinations;
};
