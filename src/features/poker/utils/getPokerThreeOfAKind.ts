import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

export const getPokerThreeOfAKind = (cards: PokerCard[]): PokerCombination[] => {
  const combinations: PokerCombination[] = [];

  for (let i = 0; i < cards.length - 2; i += 1) {
    for (let j = i + 1; j < cards.length - 1; j += 1) {
      for (let k = j + 1; k < cards.length; k += 1) {
        if (cards[i].value === cards[j].value && cards[i].value === cards[k].value) {
          combinations.push(new PokerCombination(3, [cards[i], cards[j], cards[k]]));
        }
      }
    }
  }

  return combinations;
};
