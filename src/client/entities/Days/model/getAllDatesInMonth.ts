import { DateTime } from 'luxon';

export function getAllDatesInMonth(year: number, month: number) {
  let startDate = new Date(year, month - 1, 1);
  let endDate = new Date(year, month, 1);

  let dates = [];
  while (startDate < endDate) {
    const date = DateTime.fromJSDate(startDate).startOf('day').toISO();
    if (date) {
      dates.push(date);
    }
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
}
