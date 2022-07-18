import { Context } from 'grammy';

import { ReplyWithMarkdownFlavour } from '../../plugins/replyWithMarkdown';

import { PokerRootState } from './classes/PokerRootState';
import { PokerState } from './classes/PokerState';

export type PokerContext =
  Context
  & ReplyWithMarkdownFlavour
  & { pokerRootState: PokerRootState }
  & { pokerState: PokerState };
