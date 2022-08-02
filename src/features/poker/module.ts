import { Composer, Context } from 'grammy';

import { replyWithMarkdownPlugin } from '../../plugins/replyWithMarkdown';

import { PokerPlayer } from './classes/PokerPlayer';
import { pokerMessages } from './constants';
import { pokerRootStateMiddleware } from './middleware/pokerRootState';
import { pokerStateMiddleware } from './middleware/pokerState';

export const pokerModule = (stateDirName: string) => {
  const bot = new Composer(
    replyWithMarkdownPlugin(),
    pokerRootStateMiddleware(stateDirName),
    pokerStateMiddleware(stateDirName),
  );

  bot.chatType('private').command('start', async (ctx, next) => {
    if (ctx.match === 'poker') {
      await ctx.replyWithMarkdown(pokerMessages.start.help);
    } else {
      await next();
    }
  });

  bot.chatType(['group', 'supergroup']).command('poker_reg', async (ctx) => {
    if (!ctx.from) {
      throw new Error('ctx.from is empty');
    }

    if (ctx.pokerRootState.lobbyByUser) {
      if (ctx.pokerRootState.lobbyByUser === ctx.pokerRootState.lobbyByGroup) {
        await ctx.replyWithMarkdown(pokerMessages.pokerReg.duplicateSameChat, { reply_to_message_id: ctx.message?.message_id });
      } else {
        await ctx.replyWithMarkdown(pokerMessages.pokerReg.duplicateOtherChat, { reply_to_message_id: ctx.message?.message_id });
      }

      return;
    }

    if (ctx.pokerState.started) {
      await ctx.replyWithMarkdown(pokerMessages.pokerReg.alreadyStarted, { reply_to_message_id: ctx.message?.message_id });
      return;
    }

    if (ctx.pokerState.playersList.size >= 10) {
      await ctx.replyWithMarkdown(pokerMessages.pokerReg.tooMany, { reply_to_message_id: ctx.message?.message_id });
      return;
    }

    ctx.pokerRootState.addUserToLobby();
    ctx.pokerState.playersList.add(new PokerPlayer(ctx, ctx.from));

    await ctx.replyWithMarkdown(pokerMessages.pokerReg.registered, { reply_to_message_id: ctx.message?.message_id });
  });

  bot.chatType(['group', 'supergroup']).command('poker_start', async (ctx) => {
    if (ctx.pokerState.started) {
      await ctx.replyWithMarkdown(pokerMessages.pokerStart.alreadyStarted);
      return;
    }

    if (ctx.pokerState.playersList.size < 2) {
      await ctx.replyWithMarkdown(pokerMessages.pokerStart.tooFew);
      return;
    }

    await ctx.pokerState.dealCards();
    await ctx.replyWithMarkdown(pokerMessages.pokerStart.started);
  });

  bot.chatType(['group', 'supergroup']).command('poker_stop', async (ctx) => {
    const isStarted = ctx.pokerState.started;
    await ctx.pokerState.finishGame();
    await ctx.replyWithMarkdown(isStarted ? pokerMessages.pokerStopGroup.stopped : pokerMessages.pokerStopGroup.cancelled);
  });

  bot.chatType('private').command('poker_stop', async (ctx) => {
    if (ctx.pokerRootState.lobbyByUser) {
      await ctx.pokerState.finishGame();
    } else {
      await ctx.replyWithMarkdown(pokerMessages.pokerStopPrivate.notFound);
    }
  });

  bot.chatType('private').on('message:text', async (ctx, next) => {
    if (ctx.pokerRootState.lobbyByUser) {
      const player = ctx.pokerState.playersList.getPlayerByUserId(ctx.from.id)!;
      const message = ctx.message?.text || '';

      if (ctx.from.id === ctx.pokerState.playersList.current.user.id) {
        const reply = await ctx.pokerState.handleMessage(player, message);

        if (reply) {
          await ctx.replyWithMarkdown(reply);
        }
      } else {
        await ctx.replyWithMarkdown(pokerMessages.onMessage.wrongTurn);
        await ctx.pokerState.broadcastPlayerMessage(player, message);
      }
    }

    await next();
  });

  return bot as unknown as Composer<Context>;
};
