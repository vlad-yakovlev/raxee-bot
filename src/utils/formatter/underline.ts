import { Escaped, MayBeEscaped } from './escaped';

export const underline = (text: MayBeEscaped) => {
  return new Escaped(`__${new Escaped(text)}__`, true);
};
