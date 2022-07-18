import { voiceModule } from './module';

jest.mock('grammy');

const { Composer } = jest.requireMock('grammy');

beforeEach(() => {
  Composer.mockClear();
});

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
});

test('should reply with sticker when Math.random less than 0.5', async () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.3);

  expect(voiceModule()).toBeInstanceOf(Composer);
  expect(Composer).toBeCalledWith();
  expect(Composer.prototype.on).toBeCalledWith('message:voice', expect.any(Function));

  const ctx = { replyWithSticker: jest.fn() } as any;
  const next = jest.fn();

  await Composer.prototype.on.mock.calls[0][1](ctx, next);

  expect(ctx.replyWithSticker).toBeCalledWith('CAACAgIAAxkBAAEV1F1iyfQL8tS-lOMH8CFUKbo7oWispgACBQgAAhUp-UqUfZ4xg7K-CSkE');
  expect(next).toBeCalledWith();
});

test('should not reply when Math.random more than 0.5', async () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.7);

  expect(voiceModule()).toBeInstanceOf(Composer);
  expect(Composer).toBeCalledWith();
  expect(Composer.prototype.on).toBeCalledWith('message:voice', expect.any(Function));

  const ctx = { replyWithSticker: jest.fn() } as any;
  const next = jest.fn();

  await Composer.prototype.on.mock.calls[0][1](ctx, next);

  expect(ctx.replyWithSticker).not.toBeCalled();
  expect(next).toBeCalledWith();
});
