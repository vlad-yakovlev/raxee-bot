import { Bot } from 'grammy';

import { pidorStateMiddleware } from '../middleware/pidorState';
import { pokerRootStateMiddleware } from '../middleware/pokerRootState';
import { pokerStateMiddleware } from '../middleware/pokerState';
import { pidorModule } from '../modules/pidor';
import { pokerModule } from '../modules/poker';
import { voiceModule } from '../modules/voice';
import { replyWithMarkdownPlugin } from '../plugins/replyWithMarkdown';
import { CustomContext } from '../types/context';
import { handleError } from '../utils/index';

export const runBot = async () => {
  const bot = new Bot<CustomContext>(process.env.BOT_TOKEN!);

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
    replyWithMarkdownPlugin(),
    pidorStateMiddleware(),
    pokerRootStateMiddleware(),
    pokerStateMiddleware(),
    pidorModule(),
    pokerModule(),
    voiceModule(),
  );

  bot.catch(handleError);

  await bot.start();
};

/* istanbul ignore next */
if (require.main === module) {
  // eslint-disable-next-line global-require
  require('dotenv-flow').config();

  runBot()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    });
}
