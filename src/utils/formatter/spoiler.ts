import { Escaped, MayBeEscaped } from './escaped';

export const spoiler = (text: MayBeEscaped) => {
  if (!text) {
    return new Escaped();
  }

  return new Escaped(`||${new Escaped(text)}||`, true);
};
