import { Context } from 'grammy';
import { User } from 'grammy/out/platform.node';

import { ReplyWithMarkdownFlavour } from '../../plugins/replyWithMarkdown';

export interface PidorState {
  importedStats: Record<string, string>
  stats: Record<string, number>
  users: Record<number, User>
}

export type PidorContext =
  Context
  & ReplyWithMarkdownFlavour
  & { pidorState: PidorState };
