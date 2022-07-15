import { User } from 'grammy/out/platform.node';
import * as R from 'remeda';

export const getUserName = (user?: User, escape = false) => {
  if (!user) {
    return '';
  }

  if (user.username) {
    return escape ? user.username.replaceAll('_', '\\_') : user.username;
  }

  return [user.first_name, user.last_name].filter(R.isTruthy).join(' ');
};
