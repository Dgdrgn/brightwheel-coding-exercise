import { formatISODateToUSDate } from '../utils';

it('formatISODateToUSDate', () => {
  expect(formatISODateToUSDate(null)).toEqual(null);
  expect(formatISODateToUSDate("")).toEqual(null);
  expect(formatISODateToUSDate(undefined)).toEqual(null);

  expect(formatISODateToUSDate("2019-01-01")).toEqual("01/01/2019");
  expect(formatISODateToUSDate("2019-12-31")).toEqual("12/31/2019");
  expect(formatISODateToUSDate("2019-11-01T12:00:00.000Z")).toEqual("11/01/2019");
});
