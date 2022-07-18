import { asyncPause } from './asyncPause';

jest.spyOn(global, 'setTimeout');

test('should pause and return promise', async () => {
  jest.useFakeTimers();

  const cb = jest.fn();
  const promise = asyncPause(1234).then(cb);

  expect(cb).not.toBeCalled();

  jest.runAllTimers();
  await promise;
  expect(cb).toBeCalledWith(undefined);
});
