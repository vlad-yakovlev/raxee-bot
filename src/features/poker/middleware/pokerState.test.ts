import { pokerStateMiddleware } from './pokerState';

jest.mock('@grammyjs/storage-file');
jest.mock('../classes/PokerState');

const { FileAdapter } = jest.requireMock('@grammyjs/storage-file');
const { PokerState } = jest.requireMock('../classes/PokerState');

beforeEach(() => {
  FileAdapter.mockClear();
  PokerState.mockClear();
});

test('pokerState', async () => {
  const ctx = { pokerRootState: { lobby: { id: 12345 } } } as any;
  const next = jest.fn().mockImplementation(async () => {
    expect(ctx.pokerState).toBeInstanceOf(PokerState);
  });

  await pokerStateMiddleware('some-path')(ctx, next);

  expect(FileAdapter).toBeCalledWith(expect.objectContaining({ dirName: 'some-path' }));
  expect(FileAdapter.prototype.read).toBeCalledWith('poker_12345');
  expect(FileAdapter.prototype.write).toBeCalledWith('poker_12345', ctx.pokerState);
  expect(next).toBeCalledWith();
});

test('pokerState deserializer', async () => {
  const ctx = { pokerRootState: { lobby: { id: 12345 } } } as any;
  const next = jest.fn();

  await pokerStateMiddleware('some-path')(ctx, next);

  const state = new PokerState(ctx);

  const deserializer = FileAdapter.mock.calls[0][0].deserializer;

  PokerState.fromRaw.mockImplementation(() => state);

  expect(deserializer('{"foo":"bar"}')).toBe(state);
  expect(PokerState.fromRaw).toBeCalledWith(ctx, { foo: 'bar' });
});

test('pokerState serializer', async () => {
  const ctx = { pokerRootState: { lobby: { id: 12345 } } } as any;
  const next = jest.fn();

  await pokerStateMiddleware('some-path')(ctx, next);

  const state = new PokerState(ctx);

  const serializer = FileAdapter.mock.calls[0][0].serializer;

  state.toRaw.mockImplementation(() => ({ foo: 'bar' }));

  expect(serializer(state)).toBe('{"foo":"bar"}');
  expect(state.toRaw).toBeCalledWith();
});

test('pokerState without lobbyId', async () => {
  const ctx = { pokerRootState: {} } as any;
  const next = jest.fn().mockImplementation(async () => {
    expect(() => ctx.pokerState).toThrow(new Error('Cannot access session data because the `getSessionKey` returned undefined'));
  });

  await pokerStateMiddleware('some-path')(ctx, next);

  expect(FileAdapter).not.toBeCalled();
  expect(next).toBeCalledWith();
});
