import { Context } from 'grammy';

import { namedSession } from './namedSession';

test('should call next', async () => {
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn();
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  const ctx = { bar: 'baz' } as any;
  const next = jest.fn();

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
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn();
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  const ctx = { bar: 'baz' } as any;
  const next = jest.fn();

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(getInitial).toBeCalledWith(ctx);
  expect(getSessionKey).toBeCalledWith(ctx);
  expect(getStorage).toBeCalledWith(ctx);
  expect(next).toBeCalled();
});

test('should throw access error when key is undefined', async () => {
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn();
  const getSessionKey = jest.fn().mockReturnValue(undefined);
  const getStorage = jest.fn().mockReturnValue(storage);

  const ctx = { bar: 'baz' } as any;
  const next = jest.fn().mockImplementation(async () => {
    expect(() => ctx.test).toThrow(new Error('Cannot access session data because the `getSessionKey` returned undefined'));
  });

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(getInitial).not.toBeCalled();
  expect(getStorage).not.toBeCalled();
  expect(next).toBeCalled();
});

test('should throw assign error when key is undefined', async () => {
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn();
  const getSessionKey = jest.fn().mockReturnValue(undefined);
  const getStorage = jest.fn().mockReturnValue(storage);

  const ctx = { bar: 'baz' } as any;
  const next = jest.fn().mockImplementation(async () => {
    expect(() => { ctx.test = {}; }).toThrow(new Error('Cannot assign session data because the `getSessionKey` returned undefined'));
  });

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(getInitial).not.toBeCalled();
  expect(getStorage).not.toBeCalled();
  expect(next).toBeCalled();
});

test('should return value from storage', async () => {
  const storage = {
    delete: jest.fn(),
    read: jest.fn().mockReturnValue({ lol: 'kek' }),
    write: jest.fn(),
  };

  const getInitial = jest.fn().mockReturnValue({ wow: 'yolo' });
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  const ctx = { bar: 'baz' } as any;
  const next = jest.fn().mockImplementation(async () => {
    expect(ctx.test).toStrictEqual({ lol: 'kek' });
  });

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(getInitial).not.toBeCalled();
  expect(storage.read).toBeCalledWith('foo');
  expect(storage.write).toBeCalledWith('foo', { lol: 'kek' });
  expect(next).toBeCalled();
});

test('should return initial', async () => {
  const storage = {
    delete: jest.fn(),
    read: jest.fn(),
    write: jest.fn(),
  };

  const getInitial = jest.fn().mockReturnValue({ wow: 'yolo' });
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  const ctx = { bar: 'baz' } as any;
  const next = jest.fn().mockImplementation(async () => {
    expect(ctx.test).toStrictEqual({ wow: 'yolo' });
  });

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(storage.read).toBeCalledWith('foo');
  expect(storage.write).toBeCalledWith('foo', { wow: 'yolo' });
  expect(next).toBeCalled();
});

test('should write changed value to storage', async () => {
  const storage = {
    delete: jest.fn(),
    read: jest.fn().mockReturnValue({ lol: 'kek' }),
    write: jest.fn(),
  };

  const getInitial = jest.fn().mockReturnValue({ wow: 'yolo' });
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  const ctx = { bar: 'baz' } as any;
  const next = jest.fn().mockImplementation(async () => {
    ctx.test = { abc: 'def' };
  });

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(storage.read).toBeCalledWith('foo');
  expect(storage.write).toBeCalledWith('foo', { abc: 'def' });
  expect(next).toBeCalled();
});

test('should write deeply changed value to storage', async () => {
  const storage = {
    delete: jest.fn(),
    read: jest.fn().mockReturnValue({ lol: 'kek' }),
    write: jest.fn(),
  };

  const getInitial = jest.fn().mockReturnValue({ wow: 'yolo' });
  const getSessionKey = jest.fn().mockReturnValue('foo');
  const getStorage = jest.fn().mockReturnValue(storage);

  const ctx = { bar: 'baz' } as any;
  const next = jest.fn().mockImplementation(async () => {
    ctx.test.abc = 'def';
  });

  await namedSession<Context & { test: any }, 'test'>({
    getInitial,
    getSessionKey,
    getStorage,
    name: 'test',
  })(ctx, next);

  expect(storage.read).toBeCalledWith('foo');
  expect(storage.write).toBeCalledWith('foo', { abc: 'def', lol: 'kek' });
  expect(next).toBeCalled();
});
