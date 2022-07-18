import { isFirstApril } from './isFirstApril';

export const getDayString = () => {
  let text = 'дня';

  if (isFirstApril()) {
    text = 'часа';
  }

  return text;
};
