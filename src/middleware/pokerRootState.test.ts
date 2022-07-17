import { FileAdapter } from '@grammyjs/storage-file';

import { PokerRootState } from '../classes/PokerRootState';
import { CustomContext } from '../types/context';

import { pokerRootStateMiddleware } from './pokerRootState';

jest.mock('@grammyjs/storage-file');
jest.mock('../classes/PokerRootState');

beforeEach(() => {
  // @ts-expect-error
  FileAdapter.mockClear();
  // @ts-expect-error
  PokerRootState.mockClear();
});

test('pokerRootState', async () => {
  const ctx = {} as any as CustomContext;
  const next = jest.fn().mockImplementation(async () => {
    expect(ctx.pokerRootState).toBeInstanceOf(PokerRootState);
  });

  await pokerRootStateMiddleware()(ctx, next);

  expect(FileAdapter).toBeCalled();
  expect(FileAdapter.prototype.read).toBeCalledWith('poker_root');
  expect(FileAdapter.prototype.write).toBeCalledWith('poker_root', ctx.pokerRootState);
  expect(next).toBeCalled();
});

test('pokerRootState deserializer', async () => {
  const ctx = {} as any as CustomContext;
  const next = jest.fn();

  await pokerRootStateMiddleware()(ctx, next);

  const state = new PokerRootState(ctx);

  // @ts-expect-error
  const deserializer = FileAdapter.mock.calls[0][0].deserializer;

  // @ts-expect-error
  PokerRootState.fromRaw.mockImplementation(() => state);

  expect(deserializer('{"foo":"bar"}')).toBe(state);
  expect(PokerRootState.fromRaw).toBeCalledWith(ctx, { foo: 'bar' });
});

test('pokerRootState serializer', async () => {
  const ctx = {} as any as CustomContext;
  const next = jest.fn();

  await pokerRootStateMiddleware()(ctx, next);

  const state = new PokerRootState(ctx);

  // @ts-expect-error
  const serializer = FileAdapter.mock.calls[0][0].serializer;

  // @ts-expect-error
  state.toRaw.mockImplementation(() => ({ foo: 'bar' }));

  expect(serializer(state)).toBe('{"foo":"bar"}');
  expect(state.toRaw).toBeCalledWith();
});
