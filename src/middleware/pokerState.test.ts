import { FileAdapter } from '@grammyjs/storage-file';

import { PokerState } from '../classes/PokerState';
import { CustomContext } from '../types/context';

import { pokerStateMiddleware } from './pokerState';

jest.mock('@grammyjs/storage-file');
jest.mock('../classes/PokerState');

beforeEach(() => {
  // @ts-expect-error
  FileAdapter.mockClear();
  // @ts-expect-error
  PokerState.mockClear();
});

test('pokerState', async () => {
  const ctx = { pokerRootState: { lobby: { id: 12345 } } } as any as CustomContext;
  const next = jest.fn().mockImplementation(async () => {
    expect(ctx.pokerState).toBeInstanceOf(PokerState);
  });

  await pokerStateMiddleware()(ctx, next);

  expect(FileAdapter).toBeCalled();
  expect(FileAdapter.prototype.read).toBeCalledWith('poker_12345');
  expect(FileAdapter.prototype.write).toBeCalledWith('poker_12345', ctx.pokerState);
  expect(next).toBeCalled();
});

test('pokerState deserializer', async () => {
  const ctx = { pokerRootState: { lobby: { id: 12345 } } } as any as CustomContext;
  const next = jest.fn();

  await pokerStateMiddleware()(ctx, next);

  const state = new PokerState(ctx);

  // @ts-expect-error
  const deserializer = FileAdapter.mock.calls[0][0].deserializer;

  // @ts-expect-error
  PokerState.fromRaw.mockImplementation(() => state);

  expect(deserializer('{"foo":"bar"}')).toBe(state);
  expect(PokerState.fromRaw).toBeCalledWith(ctx, { foo: 'bar' });
});

test('pokerState serializer', async () => {
  const ctx = { pokerRootState: { lobby: { id: 12345 } } } as any as CustomContext;
  const next = jest.fn();

  await pokerStateMiddleware()(ctx, next);

  const state = new PokerState(ctx);

  // @ts-expect-error
  const serializer = FileAdapter.mock.calls[0][0].serializer;

  // @ts-expect-error
  state.toRaw.mockImplementation(() => ({ foo: 'bar' }));

  expect(serializer(state)).toBe('{"foo":"bar"}');
  expect(state.toRaw).toBeCalledWith();
});

test('pokerState without lobbyId', async () => {
  const ctx = { pokerRootState: {} } as any as CustomContext;
  const next = jest.fn().mockImplementation(async () => {
    expect(() => ctx.pokerState).toThrow(new Error('Cannot access session data because the `getSessionKey` returned undefined'));
  });

  await pokerStateMiddleware()(ctx, next);

  expect(FileAdapter).not.toBeCalled();
  expect(next).toBeCalled();
});
