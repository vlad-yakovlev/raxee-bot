import { FileAdapter } from '@grammyjs/storage-file';

import { PokerRootState } from '../classes/PokerRootState';
import { FILE_ADAPTER_DIRNAME } from '../constants/db';
import { namedSession } from '../plugins/namedSession';
import { CustomContext } from '../types/context';

export const pokerRootStateMiddleware = () => namedSession<CustomContext, 'pokerRootState'>({
  getSessionKey: () => 'poker_root',

  getStorage: (ctx) => new FileAdapter({
    deserializer: (input) => PokerRootState.fromRaw(ctx, JSON.parse(input)),
    dirName: FILE_ADAPTER_DIRNAME,
    serializer: (input) => JSON.stringify(input.toRaw()),
  }),

  initial: (ctx) => new PokerRootState(ctx),
  name: 'pokerRootState',
});
