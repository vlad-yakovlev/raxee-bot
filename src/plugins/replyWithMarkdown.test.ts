import { Context } from 'grammy';

import { ReplyWithMarkdownFlavour, replyWithMarkdownPlugin } from './replyWithMarkdown';

test('should set ctx.replyWithMarkdown and call next', async () => {
  const ctx = {} as any;
  const next = jest.fn();

  await replyWithMarkdownPlugin()(ctx, next);

  expect(ctx.replyWithMarkdown).toBeInstanceOf(Function);
  expect(next).toBeCalledWith(); // TODO: test that async was used
});

test('should run correctly when only text presented', async () => {
  const ctx = { reply: jest.fn() } as any as Context & ReplyWithMarkdownFlavour;
  const next = jest.fn();

  await replyWithMarkdownPlugin()(ctx, next);
  await ctx.replyWithMarkdown('text_test');

  expect(ctx.reply).toBeCalledWith('text\\_test', { parse_mode: 'MarkdownV2' }, undefined);
});

test('should pass arguments to ctx.reply', async () => {
  const ctx = { reply: jest.fn() } as any as Context & ReplyWithMarkdownFlavour;
  const next = jest.fn();
  const signal = {} as any;

  await replyWithMarkdownPlugin()(ctx, next);
  await ctx.replyWithMarkdown('text_test', { reply_markup: { keyboard: [] } }, signal);

  expect(ctx.reply).toBeCalledWith('text\\_test', { parse_mode: 'MarkdownV2', reply_markup: { keyboard: [] } }, signal);
});
