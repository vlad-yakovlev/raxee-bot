import { format } from 'date-fns';
import { Composer, Context } from 'grammy';
import * as R from 'remeda';

import { replyWithMarkdownPlugin } from '../../plugins/replyWithMarkdown';
import { asyncPause } from '../../utils/asyncPause';
import { getRandomItem } from '../../utils/getRandomItem';
import { getUserName } from '../../utils/getUserName';

import { pidorMessages } from './constants';
import { pidorStateMiddleware } from './middleware/pidorState';
import { getCurrentDate } from './utils/getCurrentDate';
import { getMessageVariant } from './utils/getMessageVariant';
import { getStatsItems } from './utils/getStatsItems';

export const pidorModule = (stateDirName: string) => {
  const bot = new Composer(
    replyWithMarkdownPlugin(),
    pidorStateMiddleware(stateDirName),
  );

  bot.chatType(['group', 'supergroup']).command('pidor', async (ctx) => {
    if (!Object.keys(ctx.pidorState.users).length) {
      await ctx.replyWithMarkdown(getMessageVariant(pidorMessages.pidor.empty, ctx.from));
      return;
    }

    const date = getCurrentDate();

    if (ctx.pidorState.stats[date]) {
      const currentUser = ctx.pidorState.users[ctx.pidorState.stats[date]];
      await ctx.replyWithMarkdown(getMessageVariant(pidorMessages.pidor.duplicate, currentUser));
      return;
    }

    const randomUser = getRandomItem(Object.values(ctx.pidorState.users));
    ctx.pidorState.stats[date] = randomUser.id;
    await ctx.replyWithMarkdown(getMessageVariant(pidorMessages.pidor.found1, randomUser));
    await asyncPause(2500);
    await ctx.replyWithMarkdown(getMessageVariant(pidorMessages.pidor.found2, randomUser));
    await asyncPause(2500);
    await ctx.replyWithMarkdown(getMessageVariant(pidorMessages.pidor.found3, randomUser));
    await asyncPause(4000);
    await ctx.replyWithMarkdown(getMessageVariant(pidorMessages.pidor.found4, randomUser));

    if (date.endsWith('12-31')) {
      await asyncPause(10000);
      await ctx.replyWithMarkdown(pidorMessages.pidor.newYear(date.slice(0, 4)));
    }
  });

  bot.chatType(['group', 'supergroup']).command('pidor_reg', async (ctx) => {
    if (!ctx.from) {
      throw new Error('ctx.from is empty');
    }

    const alreadyRegistered = Boolean(ctx.pidorState.users[ctx.from.id]);
    ctx.pidorState.users[ctx.from.id] = ctx.from;

    const userMention = `${ctx.from.username ? '@' : ''}${getUserName(ctx.from)}`;
    R.forEachObj.indexed(ctx.pidorState.importedStats, (statsMention, date) => {
      if (statsMention === userMention) {
        ctx.pidorState.stats[date] = ctx.from.id;
      }
    });
    ctx.pidorState.importedStats = R.pickBy(ctx.pidorState.importedStats, (_value, date) => !ctx.pidorState.stats[date]);

    await ctx.replyWithMarkdown(getMessageVariant(
      alreadyRegistered ? pidorMessages.pidorReg.duplicate : pidorMessages.pidorReg.added,
      ctx.from,
    ));
  });

  bot.chatType(['group', 'supergroup']).command('pidor_stats', async (ctx) => {
    const statsItems = getStatsItems(ctx.pidorState.stats, ctx.pidorState.users);

    await ctx.replyWithMarkdown(pidorMessages.pidorStats(statsItems, Object.keys(ctx.pidorState.users).length));
  });

  bot.chatType(['group', 'supergroup']).command('pidor_stats_year', async (ctx) => {
    const currentYear = format(new Date(), 'yyyy');
    const statsItems = getStatsItems(R.pickBy(ctx.pidorState.stats, (_, key) => key.startsWith(currentYear)), ctx.pidorState.users);

    await ctx.replyWithMarkdown(pidorMessages.pidorStatsYear(statsItems, Object.keys(ctx.pidorState.users).length));
  });

  // TODO: https://grammy.dev/plugins/command-filter.html
  bot.chatType(['group', 'supergroup']).command('pidor_2021', async (ctx) => {
    const stats = getStatsItems(R.pickBy(ctx.pidorState.stats, (_, key) => key.startsWith('2021')), ctx.pidorState.users);

    if (!stats.length) {
      throw new Error('ctx.pidor.stats for 2021 is empty');
    }

    await ctx.replyWithMarkdown(pidorMessages.pidor.year(stats[0].user, '2021'));
  });

  bot.chatType(['group', 'supergroup']).on('message', async (ctx, next) => {
    if (ctx.from.id === ctx.pidorState.stats[getCurrentDate()] && Math.random() < 0.1) {
      await ctx.replyWithMarkdown(getMessageVariant(pidorMessages.onMessage.current, ctx.from), { reply_to_message_id: ctx.message.message_id });
    }

    await next();
  });

  return bot as unknown as Composer<Context>;
};
