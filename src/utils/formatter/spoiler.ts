import { Escaped, MayBeEscaped } from './escaped';

export const spoiler = (text: MayBeEscaped) => {
  return new Escaped(`||${new Escaped(text)}||`, true);
};
