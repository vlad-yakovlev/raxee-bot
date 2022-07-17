import { FileAdapter } from '@grammyjs/storage-file';

import { PokerState } from '../classes/PokerState';
import { FILE_ADAPTER_DIRNAME } from '../constants/db';
import { namedSession } from '../plugins/namedSession';
import { CustomContext } from '../types/context';

export const pokerStateMiddleware = () => namedSession<CustomContext, 'pokerState'>({
  getInitial: (ctx) => new PokerState(ctx),

  getSessionKey: (ctx) => {
    const lobbyId = ctx.pokerRootState.lobby?.id;
    return lobbyId === undefined ? undefined : `poker_${lobbyId}`;
  },

  getStorage: (ctx) => new FileAdapter({
    deserializer: (input) => PokerState.fromRaw(ctx, JSON.parse(input)),
    dirName: FILE_ADAPTER_DIRNAME,
    serializer: (input) => JSON.stringify(input.toRaw()),
  }),

  name: 'pokerState',
});
