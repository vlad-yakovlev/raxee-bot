import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

export const getPokerOnePair = (cards: PokerCard[]): PokerCombination[] => {
  const combinations: PokerCombination[] = [];

  for (let i = 0; i < cards.length - 1; i += 1) {
    for (let j = i + 1; j < cards.length; j += 1) {
      if (cards[i].value === cards[j].value) {
        combinations.push(new PokerCombination(1, [cards[i], cards[j]]));
      }
    }
  }

  return combinations;
};
