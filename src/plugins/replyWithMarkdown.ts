import { Context, NextFunction, RawApi } from 'grammy';
import { Other } from 'grammy/out/core/api';
import { AbortSignal } from 'grammy/out/shim.node';
import { Markdown, md } from 'telegram-md';

function replyWithMarkdown(
  this: Context,
  text: string | Markdown,
  other?: Other<RawApi, 'sendMessage', 'chat_id' | 'text'>,
  signal?: AbortSignal,
) {
  return this.reply(
    md.build(text),
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
