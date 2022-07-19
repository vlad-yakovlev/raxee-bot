import { Escaped, MayBeEscaped } from './escaped';

export const italic = (text: MayBeEscaped) => {
  if (!text) {
    return new Escaped();
  }

  return new Escaped(`_${new Escaped(text)}_`, true);
};
