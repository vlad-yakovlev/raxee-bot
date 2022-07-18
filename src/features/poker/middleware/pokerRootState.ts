import { FileAdapter } from '@grammyjs/storage-file';

import { namedSession } from '../../../plugins/namedSession';
import { PokerRootState } from '../classes/PokerRootState';
import { PokerContext } from '../types';

export const pokerRootStateMiddleware = (dirName: string) => namedSession<PokerContext, 'pokerRootState'>({
  getInitial: (ctx) => new PokerRootState(ctx),
  getSessionKey: () => 'poker_root',

  getStorage: (ctx) => new FileAdapter({
    deserializer: (input) => PokerRootState.fromRaw(ctx, JSON.parse(input)),
    dirName,
    serializer: (input) => JSON.stringify(input.toRaw()),
  }),

  name: 'pokerRootState',
});
