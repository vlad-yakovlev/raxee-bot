import { pokerRootStateMiddleware } from './pokerRootState';

jest.mock('@grammyjs/storage-file');
jest.mock('../classes/PokerRootState');

const { FileAdapter } = jest.requireMock('@grammyjs/storage-file');
const { PokerRootState } = jest.requireMock('../classes/PokerRootState');

beforeEach(() => {
  FileAdapter.mockClear();
  PokerRootState.mockClear();
});

test('pokerRootState', async () => {
  const ctx = {} as any;
  const next = jest.fn().mockImplementation(async () => {
    expect(ctx.pokerRootState).toBeInstanceOf(PokerRootState);
  });

  await pokerRootStateMiddleware('some-path')(ctx, next);

  expect(FileAdapter).toBeCalledWith(expect.objectContaining({ dirName: 'some-path' }));
  expect(FileAdapter.prototype.read).toBeCalledWith('poker_root');
  expect(FileAdapter.prototype.write).toBeCalledWith('poker_root', ctx.pokerRootState);
  expect(next).toBeCalledWith();
});

test('pokerRootState deserializer', async () => {
  const ctx = {} as any;
  const next = jest.fn();

  await pokerRootStateMiddleware('some-path')(ctx, next);

  const state = new PokerRootState(ctx);

  const deserializer = FileAdapter.mock.calls[0][0].deserializer;

  PokerRootState.fromRaw.mockImplementation(() => state);

  expect(deserializer('{"foo":"bar"}')).toBe(state);
  expect(PokerRootState.fromRaw).toBeCalledWith(ctx, { foo: 'bar' });
});

test('pokerRootState serializer', async () => {
  const ctx = {} as any;
  const next = jest.fn();

  await pokerRootStateMiddleware('some-path')(ctx, next);

  const state = new PokerRootState(ctx);

  const serializer = FileAdapter.mock.calls[0][0].serializer;

  state.toRaw.mockImplementation(() => ({ foo: 'bar' }));

  expect(serializer(state)).toBe('{"foo":"bar"}');
  expect(state.toRaw).toBeCalledWith();
});
