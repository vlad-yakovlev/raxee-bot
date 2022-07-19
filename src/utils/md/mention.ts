import { User } from 'grammy/out/platform.node';

import { getUserName } from '../getUserName';

import { Escaped } from './escaped';
import { link } from './link';

export const mention = (user?: User) => {
  if (user?.username) {
    return new Escaped(`@${new Escaped(user.username)}`, true);
  }

  return link(getUserName(user), `tg://user?id=${user?.id}`);
};
