import { User } from 'grammy/out/platform.node';

export const getUserName = (user?: User) => {
  if (!user) {
    return '';
  }

  return user.username ?? [user.first_name, user.last_name].filter(Boolean).join(' ');
};
