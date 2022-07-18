import { MiddlewareFn } from 'grammy';

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

  let cb!: MiddlewareFn;

  Composer.prototype.on.mockImplementation((filter: string, ...middleware: MiddlewareFn[]) => {
    expect(filter).toBe('message:voice');
    expect(middleware.length).toBe(1);
    expect(middleware[0]).toBeInstanceOf(Function);
    cb = middleware[0];
  });

  expect(voiceModule()).toBeInstanceOf(Composer);
  expect(Composer).toBeCalledWith();

  const ctx = { replyWithSticker: jest.fn() } as any;
  const next = jest.fn();

  await cb(ctx, next);

  expect(ctx.replyWithSticker).toBeCalledWith('CAACAgIAAxkBAAEV1F1iyfQL8tS-lOMH8CFUKbo7oWispgACBQgAAhUp-UqUfZ4xg7K-CSkE');
  expect(next).toBeCalledWith();
});

test('should not reply when Math.random more than 0.5', async () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.7);

  let cb!: MiddlewareFn;

  Composer.prototype.on.mockImplementation((filter: string, ...middleware: MiddlewareFn[]) => {
    expect(filter).toBe('message:voice');
    expect(middleware.length).toBe(1);
    expect(middleware[0]).toBeInstanceOf(Function);
    cb = middleware[0];
  });

  expect(voiceModule()).toBeInstanceOf(Composer);
  expect(Composer).toBeCalledWith();

  const ctx = { replyWithSticker: jest.fn() } as any;
  const next = jest.fn();

  await cb(ctx, next);

  expect(ctx.replyWithSticker).not.toBeCalled();
  expect(next).toBeCalledWith();
});
