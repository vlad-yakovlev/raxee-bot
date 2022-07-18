import { getPidorString } from './getPidorString';

jest.mock('./isHalloween');

const { isHalloween } = jest.requireMock('./isHalloween');

beforeEach(() => {
  isHalloween.mockClear();
});

describe('pumpkin', () => {
  beforeEach(() => {
    isHalloween.mockReturnValue(true);
  });

  test('no options', () => {
    expect(getPidorString(3, 1)).toBe('тыковке');
  });

  test('capitalize', () => {
    expect(getPidorString(3, 1, { capitalize: true })).toBe('Тыковке');
  });

  test('uppercase', () => {
    expect(getPidorString(3, 1, { uppercase: true })).toBe('ТЫКОВКЕ');
  });
});

describe('pidor', () => {
  beforeEach(() => {
    isHalloween.mockReturnValue(false);
  });

  test('no options', () => {
    expect(getPidorString(3, 1)).toBe('пидору');
  });

  test('capitalize', () => {
    expect(getPidorString(3, 1, { capitalize: true })).toBe('Пидору');
  });

  test('uppercase', () => {
    expect(getPidorString(3, 1, { uppercase: true })).toBe('ПИДОРУ');
  });
});
