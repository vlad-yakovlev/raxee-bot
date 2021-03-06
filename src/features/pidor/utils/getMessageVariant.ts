import { User } from 'grammy/out/platform.node';

import { getRandomItem } from '../../../utils/getRandomItem';

import { MessageVariants } from './buildMessageVariants';

export const getMessageVariant = (variants: MessageVariants, user?: User) => getRandomItem(variants)(user);
