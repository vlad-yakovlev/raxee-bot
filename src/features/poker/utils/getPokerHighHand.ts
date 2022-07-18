import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

export const getPokerHighHand = (cards: PokerCard[]): PokerCombination[] => {
  return cards.map((card) => new PokerCombination(0, [card]));
};
