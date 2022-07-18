import { buildMessageStatsVariant } from './buildMessageStatsVariant';

test('should return same value', () => {
  const statsVariant = {
    row: () => '',
    title: () => '',
    total: () => '',
  };

  expect(buildMessageStatsVariant(statsVariant)).toBe(statsVariant);
});
