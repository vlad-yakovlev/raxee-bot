import { format } from 'date-fns';
import { Composer } from 'grammy';
import * as R from 'remeda';

import { pidorMessages } from '../constants/pidor';
import { CustomContext } from '../types/context';
import { asyncPause, getMessageVariant, getPidorCurrentDate, getPidorStats, getRandomItem, getUserName, pickBy } from '../utils';

export const pidorModule = () => {
  const bot = new Composer<CustomContext>();

  bot.chatType(['group', 'supergroup']).command('pidor', async (ctx) => {
    if (!Object.keys(ctx.pidorState.users).length) {
      await ctx.replyWithMarkdown(getMessageVariant(pidorMessages._.empty, ctx.from));
      return;
    }

    const date = getPidorCurrentDate();

    if (ctx.pidorState.stats[date]) {
      const currentUser = ctx.pidorState.users[ctx.pidorState.stats[date]];
      await ctx.replyWithMarkdown(getMessageVariant(pidorMessages._.duplicate, currentUser));
      return;
    }

    const randomUser = getRandomItem(Object.values(ctx.pidorState.users));
    ctx.pidorState.stats[date] = randomUser.id;
    await ctx.replyWithMarkdown(getMessageVariant(pidorMessages._.found1, randomUser));
    await asyncPause(2500);
    await ctx.replyWithMarkdown(getMessageVariant(pidorMessages._.found2, randomUser));
    await asyncPause(2500);
    await ctx.replyWithMarkdown(getMessageVariant(pidorMessages._.found3, randomUser));
    await asyncPause(4000);
    await ctx.replyWithMarkdown(getMessageVariant(pidorMessages._.found4, randomUser));

    if (date.endsWith('12-31')) {
      await asyncPause(10000);
      await ctx.replyWithMarkdown(pidorMessages._.newYear(date.slice(0, 4)));
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
      if (statsMention.replaceAll('_', '\\_') === userMention) {
        ctx.pidorState.stats[date] = ctx.from.id;
      }
    });
    ctx.pidorState.importedStats = pickBy(ctx.pidorState.importedStats, (_value, date) => !ctx.pidorState.stats[date]);

    await ctx.replyWithMarkdown(getMessageVariant(
      alreadyRegistered ? pidorMessages.register.duplicate : pidorMessages.register.added,
      ctx.from,
    ));
  });

  bot.chatType(['group', 'supergroup']).command('pidor_stats', async (ctx) => {
    const stats = getPidorStats(ctx.pidorState.stats, ctx.pidorState.users);

    await ctx.replyWithMarkdown([
      pidorMessages.stats.title(),
      '',
      ...stats.map((item, index) => pidorMessages.stats.row(index, item.user, item.count)),
      '',
      pidorMessages.stats.total(Object.keys(ctx.pidorState.users).length),
    ].join('\n'));
  });

  bot.chatType(['group', 'supergroup']).command('pidor_stats_year', async (ctx) => {
    const currentYear = format(new Date(), 'yyyy');
    const stats = getPidorStats(pickBy(ctx.pidorState.stats, (_, key) => key.startsWith(currentYear)), ctx.pidorState.users);

    await ctx.replyWithMarkdown([
      pidorMessages.statsYear.title(),
      '',
      ...stats.map((item, index) => pidorMessages.statsYear.row(index, item.user, item.count)),
      '',
      pidorMessages.statsYear.total(Object.keys(ctx.pidorState.users).length),
    ].join('\n'));
  });

  // TODO: https://grammy.dev/plugins/command-filter.html
  bot.chatType(['group', 'supergroup']).command('pidor_2021', async (ctx) => {
    const stats = getPidorStats(pickBy(ctx.pidorState.stats, (_, key) => key.startsWith('2021')), ctx.pidorState.users);

    if (!stats.length) {
      throw new Error('ctx.pidor.stats for 2021 is empty');
    }

    await ctx.replyWithMarkdown(pidorMessages._.year(stats[0].user, '2021'));
  });

  bot.chatType(['group', 'supergroup']).on('message', async (ctx, next) => {
    if (ctx.from.id === ctx.pidorState.stats[getPidorCurrentDate()] && Math.random() < 0.1) {
      await ctx.replyWithMarkdown(getMessageVariant(pidorMessages.onMessage.current, ctx.from), { reply_to_message_id: ctx.message.message_id });
    }

    await next();
  });

  return bot;
};
