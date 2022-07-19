import { Context, NextFunction, RawApi } from 'grammy';
import { Other } from 'grammy/out/core/api';
import { AbortSignal } from 'grammy/out/shim.node';

import { formatter, MayBeEscaped } from '../utils/formatter';

function replyWithMarkdown(
  this: Context,
  text: MayBeEscaped,
  other?: Other<RawApi, 'sendMessage', 'chat_id' | 'text'>,
  signal?: AbortSignal,
) {
  return this.reply(
    formatter.build(text),
    {
      parse_mode: 'MarkdownV2',
      ...other,
    },
    signal,
  );
}

export interface ReplyWithMarkdownFlavour {
  replyWithMarkdown: typeof replyWithMarkdown
}

export const replyWithMarkdownPlugin = () => async (ctx: Context & ReplyWithMarkdownFlavour, next: NextFunction) => {
  ctx.replyWithMarkdown = replyWithMarkdown;
  await next();
};
