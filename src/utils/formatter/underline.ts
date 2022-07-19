import { Escaped, MayBeEscaped } from './escaped';

export const underline = (text: MayBeEscaped) => {
  if (!text) {
    return new Escaped();
  }

  return new Escaped(`__${new Escaped(text)}__`, true);
};
