import { FileAdapter } from '@grammyjs/storage-file';

import { FILE_ADAPTER_DIRNAME } from '../constants/db';
import { namedSession } from '../plugins/namedSession';
import { CustomContext } from '../types/context';

export const pidorStateMiddleware = () => namedSession<CustomContext, 'pidorState'>({
  getInitial: () => ({
    importedStats: {},
    stats: {},
    users: {},
  }),

  getSessionKey: (ctx) => (ctx.chat?.id === undefined ? undefined : `pidor_${ctx.chat.id}`),
  getStorage: () => new FileAdapter({ dirName: FILE_ADAPTER_DIRNAME }),
  name: 'pidorState',
});
