import { getStatsItems } from './getStatsItems';

test('should count stats', () => {
  const items = {
    '2022-07-01': 1,
    '2022-07-02': 2,
    '2022-07-03': 1,
    '2022-07-04': 1,
    '2022-07-05': 2,
    '2022-07-06': 1,
    '2022-07-07': 1,
    '2022-07-08': 3,
    '2022-07-09': 3,
    '2022-07-10': 2,
  };

  const users = {
    1: { first_name: '', id: 1, is_bot: false },
    2: { first_name: '', id: 2, is_bot: false },
    3: { first_name: '', id: 3, is_bot: false },
  };

  expect(getStatsItems(items, users)).toMatchSnapshot();
});
