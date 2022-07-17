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

const { Bot } = jest.requireMock('grammy');
const { pidorStateMiddleware } = jest.requireMock('../middleware/pidorState');
const { pokerRootStateMiddleware } = jest.requireMock('../middleware/pokerRootState');
const { pokerStateMiddleware } = jest.requireMock('../middleware/pokerState');
const { pidorModule } = jest.requireMock('../modules/pidor');
const { pokerModule } = jest.requireMock('../modules/poker');
const { voiceModule } = jest.requireMock('../modules/voice');
const { replyWithMarkdownPlugin } = jest.requireMock('../plugins/replyWithMarkdown');

beforeEach(() => {
  Bot.mockClear();
  pidorStateMiddleware.mockClear();
  pokerRootStateMiddleware.mockClear();
  pokerStateMiddleware.mockClear();
  pidorModule.mockClear();
  pokerModule.mockClear();
  voiceModule.mockClear();
  replyWithMarkdownPlugin.mockClear();

  process.env.BOT_TOKEN = 'test-bot-token';
});

test('run', async () => {
  Bot.prototype.api = { setMyCommands: jest.fn() };
  pidorStateMiddleware.mockImplementation(() => 'pidorStateMiddleware');
  pokerRootStateMiddleware.mockImplementation(() => 'pokerRootStateMiddleware');
  pokerStateMiddleware.mockImplementation(() => 'pokerStateMiddleware');
  pidorModule.mockImplementation(() => 'pidorModule');
  pokerModule.mockImplementation(() => 'pokerModule');
  voiceModule.mockImplementation(() => 'voiceModule');
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
