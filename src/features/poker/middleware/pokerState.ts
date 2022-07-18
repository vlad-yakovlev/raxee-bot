import { FileAdapter } from '@grammyjs/storage-file';

import { namedSession } from '../../../plugins/namedSession';
import { PokerState } from '../classes/PokerState';
import { PokerContext } from '../types';

export const pokerStateMiddleware = (dirName: string) => namedSession<PokerContext, 'pokerState'>({
  getInitial: (ctx) => new PokerState(ctx),

  getSessionKey: (ctx) => {
    const lobbyId = ctx.pokerRootState.lobby?.id;
    return lobbyId === undefined ? undefined : `poker_${lobbyId}`;
  },

  getStorage: (ctx) => new FileAdapter({
    deserializer: (input) => PokerState.fromRaw(ctx, JSON.parse(input)),
    dirName,
    serializer: (input) => JSON.stringify(input.toRaw()),
  }),

  name: 'pokerState',
});
