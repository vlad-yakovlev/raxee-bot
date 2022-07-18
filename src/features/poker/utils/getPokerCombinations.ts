import { PokerCard } from '../classes/PokerCard';
import { PokerCombination } from '../classes/PokerCombination';

import { getPokerFlush } from './getPokerFlush';
import { getPokerFourOfAKind } from './getPokerFourOfAKind';
import { getPokerFullHouse } from './getPokerFullHouse';
import { getPokerHighHand } from './getPokerHighHand';
import { getPokerOnePair } from './getPokerOnePair';
import { getPokerRoyalFlush } from './getPokerRoyalFlush';
import { getPokerStraight } from './getPokerStraight';
import { getPokerStraightFlush } from './getPokerStraightFlush';
import { getPokerThreeOfAKind } from './getPokerThreeOfAKind';
import { getPokerTwoPairs } from './getPokerTwoPairs';

export const getPokerCombinations = (cards: PokerCard[]): PokerCombination[] => {
  cards = [...cards].sort((a, b) => (b.value - a.value) * 100 + (b.suit - a.suit));

  const highHand = getPokerHighHand(cards);
  const onePair = getPokerOnePair(cards);
  const twoPairs = getPokerTwoPairs(onePair);
  const threeOfAKind = getPokerThreeOfAKind(cards);
  const straight = getPokerStraight(cards);
  const flush = getPokerFlush(cards);
  const fullHouse = getPokerFullHouse(onePair, threeOfAKind);
  const fourOfAKind = getPokerFourOfAKind(twoPairs);
  const straightFlush = getPokerStraightFlush(straight);
  const royalFlush = getPokerRoyalFlush(straightFlush);

  return [
    ...royalFlush,
    ...straightFlush,
    ...fourOfAKind,
    ...fullHouse,
    ...flush,
    ...straight,
    ...threeOfAKind,
    ...twoPairs,
    ...onePair,
    ...highHand,
  ];
};
