import { format } from 'date-fns';

export const isFirstApril = () => ['04-01'].includes(format(new Date(), 'MM-dd'));
