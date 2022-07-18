import { Bot } from 'grammy';

import { pidorModule } from '../features/pidor/module';
import { pokerModule } from '../features/poker/module';
import { voiceModule } from '../features/voice/module';
import { handleError } from '../utils/handleError';

interface RunBotOptions {
  botToken: string,
  stateDirName: string
}

export const runBot = async (options: RunBotOptions) => {
  const bot = new Bot(options.botToken);

  await bot.api.setMyCommands([
    { command: 'pidor', description: 'Определить пидора дня [group]' },
    { command: 'pidor_reg', description: 'Стать участником пидора дня [group]' },
    { command: 'pidor_stats', description: 'Посмотреть статистику пидора дня [group]' },
    { command: 'pidor_stats_year', description: 'Посмотреть статистику пидора дня за текущий год [group]' },
    { command: 'poker_reg', description: 'Присоединиться к игре в покер [group]' },
    { command: 'poker_start', description: 'Начать игру в покер [group]' },
    { command: 'poker_stop', description: 'Закончить игру в покер [private/group]' },
  ]);

  bot.use(
    pidorModule(options.stateDirName),
    pokerModule(options.stateDirName),
    voiceModule(),
  );

  bot.catch(handleError);

  await bot.start();
};

/* istanbul ignore next */
if (require.main === module) {
  // eslint-disable-next-line global-require
  require('dotenv-flow').config();

  runBot({
    botToken: process.env.BOT_TOKEN!,
    stateDirName: 'db/v1',
  })
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    });
}
