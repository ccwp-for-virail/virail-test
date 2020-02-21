import {getUpcomingDays} from "./date";

it('should generate 7 days', () => {
  const result = getUpcomingDays(new Date());
  expect(result.length).toBe(7);
});
