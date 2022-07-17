import { Context } from 'grammy';

import { namedSession } from './namedSession';

test('should call next', async () => {
  const ctx = { bar: 'baz' } as any;
  const next = jest.fn();
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn();
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(ctx).toHaveProperty('test');
  expect(next).toBeCalled(); // TODO: test that async was used
});

test('should pass ctx', async () => {
  const ctx = { bar: 'baz' } as any;
  const next = jest.fn();
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn();
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(getInitial).toBeCalledWith(ctx);
  expect(getSessionKey).toBeCalledWith(ctx);
  expect(getStorage).toBeCalledWith(ctx);
});

test('should throw access error when key is undefined', async () => {
  const ctx = { bar: 'baz' } as any;
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn();
  const getSessionKey = jest.fn().mockReturnValue(undefined);
  const getStorage = jest.fn().mockReturnValue(storage);

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, async () => {
    expect(() => ctx.test).toThrow(new Error('Cannot access session data because the `getSessionKey` returned undefined'));
  });
});

test('should throw assign error when key is undefined', async () => {
  const ctx = { bar: 'baz' } as any;
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn();
  const getSessionKey = jest.fn().mockReturnValue(undefined);
  const getStorage = jest.fn().mockReturnValue(storage);

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, async () => {
    expect(() => { ctx.test = {}; }).toThrow(new Error('Cannot assign session data because the `getSessionKey` returned undefined'));
  });
});

test('should return value from storage', async () => {
  const ctx = { bar: 'baz' } as any;
  const storage = {
    delete: jest.fn(),
    read: jest.fn().mockReturnValue({ lol: 'kek' }),
    write: jest.fn(),
  };

  const getInitial = jest.fn().mockReturnValue({ wow: 'yolo' });
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, async () => {
    expect(ctx.test).toStrictEqual({ lol: 'kek' });
  });

  expect(storage.read).toBeCalledWith('foo');
  expect(storage.write).toBeCalledWith('foo', { lol: 'kek' });
});

test('should return initial', async () => {
  const ctx = { bar: 'baz' } as any;
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn().mockReturnValue({ wow: 'yolo' });
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, async () => {
    expect(ctx.test).toStrictEqual({ wow: 'yolo' });
  });

  expect(storage.read).toBeCalledWith('foo');
  expect(storage.write).toBeCalledWith('foo', { wow: 'yolo' });
});

test('should write changed value to storage', async () => {
  const ctx = { bar: 'baz' } as any;
  const storage = {
    delete: jest.fn(),
    read: jest.fn().mockReturnValue({ lol: 'kek' }),
    write: jest.fn(),
  };

  const getInitial = jest.fn().mockReturnValue({ wow: 'yolo' });
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, async () => {
    ctx.test = { abc: 'def' };
  });

  expect(storage.read).toBeCalledWith('foo');
  expect(storage.write).toBeCalledWith('foo', { abc: 'def' });
});

test('should write deeply changed value to storage', async () => {
  const ctx = { bar: 'baz' } as any;
  const storage = {
    delete: jest.fn(),
    read: jest.fn().mockReturnValue({ lol: 'kek' }),
    write: jest.fn(),
  };

  const getInitial = jest.fn().mockReturnValue({ wow: 'yolo' });
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, async () => {
    ctx.test.abc = 'def';
  });

  expect(storage.read).toBeCalledWith('foo');
  expect(storage.write).toBeCalledWith('foo', { abc: 'def', lol: 'kek' });
});
