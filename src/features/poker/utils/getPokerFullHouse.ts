import { PokerCombination } from '../classes/PokerCombination';

export const getPokerFullHouse = (onePair: PokerCombination[], threeOfAKind: PokerCombination[]): PokerCombination[] => {
  const combinations: PokerCombination[] = [];

  for (let i = 0; i < threeOfAKind.length; i += 1) {
    for (let j = 0; j < onePair.length; j += 1) {
      if (threeOfAKind[i].cards[0].value !== onePair[j].cards[0].value) {
        combinations.push(new PokerCombination(6, [...threeOfAKind[i].cards, ...onePair[j].cards]));
      }
    }
  }

  return combinations;
};
