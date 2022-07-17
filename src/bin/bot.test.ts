import { Bot } from 'grammy';

import { pidorStateMiddleware } from '../middleware/pidorState';
import { pokerRootStateMiddleware } from '../middleware/pokerRootState';
import { pokerStateMiddleware } from '../middleware/pokerState';
import { pidorModule } from '../modules/pidor';
import { pokerModule } from '../modules/poker';
import { voiceModule } from '../modules/voice';
import { replyWithMarkdownPlugin } from '../plugins/replyWithMarkdown';
import { handleError } from '../utils/handleError';

import { runBot } from './bot';

jest.mock('grammy');
jest.mock('../middleware/pidorState');
jest.mock('../middleware/pokerRootState');
jest.mock('../middleware/pokerState');
jest.mock('../modules/pidor');
jest.mock('../modules/poker');
jest.mock('../modules/voice');
jest.mock('../plugins/replyWithMarkdown');

beforeEach(() => {
  // @ts-expect-error
  Bot.mockClear();
  // @ts-expect-error
  pidorStateMiddleware.mockClear();
  // @ts-expect-error
  pokerRootStateMiddleware.mockClear();
  // @ts-expect-error
  pokerStateMiddleware.mockClear();
  // @ts-expect-error
  pidorModule.mockClear();
  // @ts-expect-error
  pokerModule.mockClear();
  // @ts-expect-error
  voiceModule.mockClear();
  // @ts-expect-error
  replyWithMarkdownPlugin.mockClear();

  process.env.BOT_TOKEN = 'test-bot-token';
});

test('run', async () => {
  // @ts-expect-error
  Bot.prototype.api = { setMyCommands: jest.fn() };
  // @ts-expect-error
  pidorStateMiddleware.mockImplementation(() => 'pidorStateMiddleware');
  // @ts-expect-error
  pokerRootStateMiddleware.mockImplementation(() => 'pokerRootStateMiddleware');
  // @ts-expect-error
  pokerStateMiddleware.mockImplementation(() => 'pokerStateMiddleware');
  // @ts-expect-error
  pidorModule.mockImplementation(() => 'pidorModule');
  // @ts-expect-error
  pokerModule.mockImplementation(() => 'pokerModule');
  // @ts-expect-error
  voiceModule.mockImplementation(() => 'voiceModule');
  // @ts-expect-error
  replyWithMarkdownPlugin.mockImplementation(() => 'replyWithMarkdownPlugin');

  await runBot();

  expect(Bot).toBeCalledWith('test-bot-token');
  expect(Bot.prototype.api.setMyCommands).toBeCalledWith([
    { command: 'pidor', description: 'Определить пидора дня [group]' },
    { command: 'pidor_reg', description: 'Стать участником пидора дня [group]' },
    { command: 'pidor_stats', description: 'Посмотреть статистику пидора дня [group]' },
    { command: 'pidor_stats_year', description: 'Посмотреть статистику пидора дня за текущий год [group]' },
    { command: 'poker_reg', description: 'Присоединиться к игре в покер [group]' },
    { command: 'poker_start', description: 'Начать игру в покер [group]' },
    { command: 'poker_stop', description: 'Закончить игру в покер [private/group]' },
  ]);
  expect(Bot.prototype.use).toBeCalledWith(
    'replyWithMarkdownPlugin',
    'pidorStateMiddleware',
    'pokerRootStateMiddleware',
    'pokerStateMiddleware',
    'pidorModule',
    'pokerModule',
    'voiceModule',
  );
  expect(Bot.prototype.catch).toBeCalledWith(handleError);
  expect(Bot.prototype.start).toBeCalledWith();
});
