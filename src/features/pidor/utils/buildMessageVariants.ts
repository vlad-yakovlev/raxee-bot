import { User } from 'grammy/out/platform.node';
import { Markdown } from 'telegram-md';

export type MessageVariants = Array<(user?: User) => string | Markdown>;

export const buildMessageVariants = (variants: MessageVariants) => variants;
