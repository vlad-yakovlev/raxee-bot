import * as R from 'remeda';

import { isHalloween } from './isHalloween';

const pidor = [
  ['пидор', 'пидоры'],
  ['пидора', 'пидоров'],
  ['пидору', 'пидорам'],
  ['пидора', 'пидоров'],
  ['пидором', 'пидорами'],
  ['пидоре', 'пидорах'],
];

const pumpkin = [
  ['тыковка', 'тыковки'],
  ['тыковки', 'тыковок'],
  ['тыковке', 'тыковкам'],
  ['тыковку', 'тыковки'],
  ['тыковкой', 'тыковками'],
  ['тыковке', 'тыковках'],
];

export const getTranslation = () => {
  if (isHalloween()) {
    return pumpkin;
  }

  return pidor;
};

interface GetPidorStringOptions {
  capitalize?: boolean
  uppercase?: boolean
}

export const getPidorString = (
  role: 1 | 2 | 3 | 4 | 5 | 6,
  count: 1 | 2,
  opts: GetPidorStringOptions = {},
) => {
  return R.pipe(
    getTranslation()[role - 1][count - 1],
    (text) => (opts.capitalize ? text[0].toUpperCase() + text.slice(1) : text),
    (text) => (opts.uppercase ? text.toUpperCase() : text),
  );
};
