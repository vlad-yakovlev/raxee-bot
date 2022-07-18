import { format } from 'date-fns';

import { isFirstApril } from './isFirstApril';

export const getCurrentDate = () => {
  if (isFirstApril()) {
    return format(new Date(), 'yyyy-MM-dd-HH');
  }

  return format(new Date(), 'yyyy-MM-dd');
};
