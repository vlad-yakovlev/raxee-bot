import { Composer } from 'grammy';

export const voiceModule = () => {
  const bot = new Composer();

  bot.on('message:voice', async (ctx, next) => {
    if (Math.random() < 0.5) {
      await ctx.replyWithSticker('CAACAgIAAxkBAAEV1F1iyfQL8tS-lOMH8CFUKbo7oWispgACBQgAAhUp-UqUfZ4xg7K-CSkE');
    }

    await next();
  });

  return bot;
};
