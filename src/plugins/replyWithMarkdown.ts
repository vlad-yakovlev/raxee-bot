import { Context, NextFunction } from 'grammy';

import { formatter } from '../utils/formatter';

export interface ReplyWithMarkdownFlavour {
  replyWithMarkdown: Context['reply']
}

export const replyWithMarkdownPlugin = () => async (ctx: Context & ReplyWithMarkdownFlavour, next: NextFunction) => {
  ctx.replyWithMarkdown = function replyWithMarkdown(this: typeof ctx, ...args: Parameters<Context['reply']>) {
    return this.reply(formatter.build(args[0]), { parse_mode: 'MarkdownV2', ...args[1] }, args[2]);
  };

  await next();
};
