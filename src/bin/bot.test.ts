import { handleError } from '../utils/handleError';

import { runBot } from './bot';

jest.mock('grammy');
jest.mock('../features/pidor/module');
jest.mock('../features/poker/module');
jest.mock('../features/voice/module');

const { Bot } = jest.requireMock('grammy');
const { pidorModule } = jest.requireMock('../features/pidor/module');
const { pokerModule } = jest.requireMock('../features/poker/module');
const { voiceModule } = jest.requireMock('../features/voice/module');

beforeEach(() => {
  Bot.mockClear();
  pidorModule.mockClear();
  pokerModule.mockClear();
  voiceModule.mockClear();
});

test('run', async () => {
  Bot.prototype.api = { setMyCommands: jest.fn() };
  pidorModule.mockImplementation(() => 'pidorModule');
  pokerModule.mockImplementation(() => 'pokerModule');
  voiceModule.mockImplementation(() => 'voiceModule');

  await runBot({
    botToken: 'test-bot-token',
    stateDirName: 'some-path',
  });

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
    'pidorModule',
    'pokerModule',
    'voiceModule',
  );
  expect(pidorModule).toBeCalledWith('some-path');
  expect(pokerModule).toBeCalledWith('some-path');
  expect(Bot.prototype.catch).toBeCalledWith(handleError);
  expect(Bot.prototype.start).toBeCalledWith();
});
