import { getDayString } from './getDayString';

jest.mock('./isFirstApril');

const { isFirstApril } = jest.requireMock('./isFirstApril');

beforeEach(() => {
  isFirstApril.mockClear();
});

test('should return hour on April 1', () => {
  isFirstApril.mockReturnValue(true);
  expect(getDayString()).toBe('часа');
});

test('should return day on any other day', () => {
  isFirstApril.mockReturnValue(false);
  expect(getDayString()).toBe('дня');
});
