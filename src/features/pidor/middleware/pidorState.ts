import { FileAdapter } from '@grammyjs/storage-file';

import { namedSession } from '../../../plugins/namedSession';
import { PidorContext } from '../types';

export const pidorStateMiddleware = (dirName: string) => namedSession<PidorContext, 'pidorState'>({
  getInitial: () => ({
    importedStats: {},
    stats: {},
    users: {},
  }),

  getSessionKey: (ctx) => (ctx.chat?.id === undefined ? undefined : `pidor_${ctx.chat.id}`),
  getStorage: () => new FileAdapter({ dirName }),
  name: 'pidorState',
});
