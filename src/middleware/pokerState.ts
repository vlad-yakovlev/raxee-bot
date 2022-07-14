import { FileAdapter } from '@grammyjs/storage-file';

import { PokerState } from '../classes/PokerState';
import { namedSession } from '../plugins/namedSession';
import { CustomContext } from '../types/context';

export const pokerStateMiddleware = () => namedSession<CustomContext, 'pokerState'>({
  getSessionKey: (ctx) => {
    const lobbyId = ctx.pokerRootState.lobby?.id;
    return lobbyId === undefined ? undefined : `poker_${lobbyId}`;
  },

  getStorage: (ctx) => new FileAdapter({
    deserializer: (input) => PokerState.fromRaw(ctx, JSON.parse(input)),
    dirName: 'db',
    serializer: (input) => JSON.stringify(input.toRaw()),
  }),

  initial: (ctx) => new PokerState(ctx),
  name: 'pokerState',
});
