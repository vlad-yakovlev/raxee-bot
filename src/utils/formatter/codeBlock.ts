import { Escaped, MayBeEscaped } from './escaped';

export const codeBlock = (code: MayBeEscaped, language = '') => {
  if (!code) {
    return new Escaped();
  }

  return new Escaped(`\`\`\`${new Escaped(language)}\n${new Escaped(code)}\n\`\`\``, true);
};
