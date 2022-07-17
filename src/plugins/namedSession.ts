import { Context, MiddlewareFn, StorageAdapter } from 'grammy';

type MaybePromise<T> = Promise<T> | T;

interface NamedSessionOptions<C extends Context, K extends keyof C> {
  getInitial: (ctx: C) => MaybePromise<C[K]>
  getSessionKey: (ctx: C) => MaybePromise<string | undefined>
  getStorage: (ctx: C) => MaybePromise<StorageAdapter<C[K]>>
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
      const storage = await options.getStorage(ctx);
      ctx[options.name] = (await storage.read(key)) ?? (await options.getInitial(ctx));
      await next();
      await storage.write(key, ctx[options.name]);
    }
  };
};
