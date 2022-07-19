import { getUserName } from './getUserName';

test('should accept undefined', () => {
  expect(getUserName(undefined)).toBe('');
});

test('should return username when presented', () => {
  expect(getUserName({ first_name: 'bar', id: 12345, is_bot: false, username: 'foo' })).toBe('foo');
});

test('should return firstName + lastName when no username presented', () => {
  expect(getUserName({ first_name: 'bar', id: 12345, is_bot: false, last_name: 'baz' })).toBe('bar baz');
  expect(getUserName({ first_name: 'bar', id: 12345, is_bot: false })).toBe('bar');
});
