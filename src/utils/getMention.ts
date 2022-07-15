import { User } from 'grammy/out/platform.node';

import { getUserName } from './getUserName';

export const getMention = (user?: User) => {
  return user?.username ? `@${getUserName(user)}` : `[${getUserName(user)}](tg://user?id=${user?.id})`;
};
