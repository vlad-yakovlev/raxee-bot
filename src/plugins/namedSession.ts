import { Context, MiddlewareFn, StorageAdapter } from 'grammy';

type MaybePromise<T> = Promise<T> | T;

interface NamedSessionOptions<C extends Context, K extends keyof C> {
  getSessionKey: (ctx: C) => MaybePromise<string | undefined>
  getStorage: (ctx: C) => StorageAdapter<C[K]>
  initial: (ctx: C) => C[K]
  name: K
}

export const namedSession = <C extends Context, K extends keyof C>(options: NamedSessionOptions<C, K>): MiddlewareFn<C> => {
  return async (ctx, next) => {
    const key = await options.getSessionKey(ctx);

    if (key === undefined) {
      Object.defineProperty(ctx, options.name, {
        enumerable: true,
        get() {
          throw new Error('Cannot access session data because the `getSessionKey` returned undefined');
        },
        set() {
          throw new Error('Cannot assign session data because the `getSessionKey` returned undefined');
        },
      });

      await next();
    } else {
      const storage = options.getStorage(ctx);
      ctx[options.name] = (await storage.read(key)) ?? options.initial(ctx);
      await next();
      await storage.write(key, ctx[options.name]);
    }
  };
};
