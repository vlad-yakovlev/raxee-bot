import { CustomContext } from '../types/context';

import { pidorStateMiddleware } from './pidorState';

jest.mock('@grammyjs/storage-file');

const { FileAdapter } = jest.requireMock('@grammyjs/storage-file');

beforeEach(() => {
  FileAdapter.mockClear();
});

test('pidorState', async () => {
  const ctx = { chat: { id: 12345 } } as any as CustomContext;
  const next = jest.fn().mockImplementation(async () => {
    expect(ctx.pidorState).toStrictEqual({
      importedStats: {},
      stats: {},
      users: {},
    });
  });

  await pidorStateMiddleware()(ctx, next);

  expect(FileAdapter).toBeCalled();
  expect(FileAdapter.prototype.read).toBeCalledWith('pidor_12345');
  expect(FileAdapter.prototype.write).toBeCalledWith('pidor_12345', ctx.pidorState);
  expect(next).toBeCalled();
});

test('pidorState without chatId', async () => {
  const ctx = {} as any as CustomContext;
  const next = jest.fn().mockImplementation(async () => {
    expect(() => ctx.pidorState).toThrow(new Error('Cannot access session data because the `getSessionKey` returned undefined'));
  });

  await pidorStateMiddleware()(ctx, next);

  expect(FileAdapter).not.toBeCalled();
  expect(next).toBeCalled();
});
