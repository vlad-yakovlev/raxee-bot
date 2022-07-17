import { FileAdapter } from '@grammyjs/storage-file';

import { FILE_ADAPTER_DIRNAME } from '../constants/db';
import { CustomContext } from '../types/context';

import { pidorMiddleware } from './pidorState';

jest.mock('@grammyjs/storage-file');

beforeEach(() => {
  // @ts-expect-error
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

  await pidorMiddleware()(ctx, next);

  expect(FileAdapter).toBeCalledWith({ dirName: FILE_ADAPTER_DIRNAME });
  expect(FileAdapter.prototype.read).toBeCalledWith('pidor_12345');
  expect(FileAdapter.prototype.write).toBeCalledWith('pidor_12345', {
    importedStats: {},
    stats: {},
    users: {},
  });
  expect(next).toBeCalled();
});

test('pidorState without chatId', async () => {
  const ctx = {} as any as CustomContext;
  const next = jest.fn().mockImplementation(async () => {
    expect(() => ctx.pidorState).toThrow(new Error('Cannot access session data because the `getSessionKey` returned undefined'));
  });

  await pidorMiddleware()(ctx, next);

  expect(FileAdapter).not.toBeCalled();
  expect(next).toBeCalled();
});
