import { User } from 'grammy/out/platform.node';
import * as R from 'remeda';

export const getUserName = (user?: User) => {
  return user ? user.username?.replaceAll('_', '\\_') || [user.first_name, user.last_name].filter(R.isTruthy).join(' ') : '';
};
