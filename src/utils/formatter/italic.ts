import { Escaped, MayBeEscaped } from './escaped';

export const italic = (text: MayBeEscaped) => {
  return new Escaped(`_${new Escaped(text)}_`, true);
};
