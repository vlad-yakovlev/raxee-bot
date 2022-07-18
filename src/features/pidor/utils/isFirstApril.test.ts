import { isFirstApril } from './isFirstApril';

afterEach(() => {
  jest.useRealTimers();
});

test('should return true on April 1', () => {
  jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-04-01'));

  expect(isFirstApril()).toBe(true);
});

test('should return false on any other day', () => {
  jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-01'));

  expect(isFirstApril()).toBe(false);
});
