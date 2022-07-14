import { FileAdapter } from '@grammyjs/storage-file';

import { FILE_ADAPTER_DIRNAME } from '../constants/db';
import { namedSession } from '../plugins/namedSession';
import { CustomContext } from '../types/context';

export const pidorMiddleware = () => namedSession<CustomContext, 'pidorState'>({
  getSessionKey: (ctx) => (ctx.chat?.id === undefined ? undefined : `pidor_${ctx.chat.id}`),

  initial: () => ({
    stats: {},
    users: {},
  }),

  name: 'pidorState',

  storage: new FileAdapter({
    dirName: FILE_ADAPTER_DIRNAME,
  }),
});
