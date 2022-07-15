import { User } from 'grammy/out/platform.node';

import { getUserName } from './getUserName';

export const getMention = (user?: User) => {
  return user?.username ? `@${getUserName(user, true)}` : `[${getUserName(user)}](tg://user?id=${user?.id})`;
};
