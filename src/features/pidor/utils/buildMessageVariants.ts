import { User } from 'grammy/out/platform.node';

import { MayBeEscaped } from '../../../utils/formatter';

export type MessageVariants = Array<(user?: User) => MayBeEscaped>;

export const buildMessageVariants = (variants: MessageVariants) => variants;
