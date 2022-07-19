import { Escaped, MayBeEscaped } from './escaped';

export const link = (name: MayBeEscaped, url: MayBeEscaped) => {
  if (!name && !url) {
    return new Escaped();
  }

  if (!name) {
    return new Escaped(url);
  }

  if (!url) {
    return new Escaped(name);
  }

  return new Escaped(`[${new Escaped(name)}](${new Escaped(url)})`, true);
};
