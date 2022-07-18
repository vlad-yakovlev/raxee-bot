import { Escaped, MayBeEscaped } from './escaped';

export const link = (name: MayBeEscaped, url: MayBeEscaped) => {
  return new Escaped(`[${new Escaped(name)}](${new Escaped(url)})`, true);
};
