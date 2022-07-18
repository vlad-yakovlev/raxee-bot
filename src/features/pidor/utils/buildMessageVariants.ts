import { User } from 'grammy/out/platform.node';

export type MessageVariants = Array<(user?: User) => string>;

export const buildMessageVariants = (variants: MessageVariants) => variants;
