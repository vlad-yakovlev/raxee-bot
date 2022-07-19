import { User } from 'grammy/out/platform.node';
import * as R from 'remeda';

export interface StatsItem {
  count: number
  user: User
}

export const getStatsItems = (
  items: Record<string, number>,
  users: Record<string, User>,
): StatsItem[] => {
  return R.pipe(
    items,
    R.values,

    R.reduce((acc, userId) => {
      acc[userId] = acc[userId] ? acc[userId] + 1 : 1;
      return acc;
    }, {} as Record<string, number>),

    R.toPairs,

    R.map((item) => ({
      count: item[1],
      user: users[item[0]],
    })),

    R.sort((a, b) => b.count - a.count),
  );
};
