import { DateTime, Info, Interval } from 'luxon';
export class DateManager {
  static IS_DATE_AFTER = (dateCompare: string, dateComparator: string) =>
    DateTime.fromISO(dateCompare).ordinal >
    DateTime.fromISO(dateComparator).ordinal;

  static IS_DATE_BEFORE = (dateCompare: string, dateComparator: string) =>
    DateTime.fromISO(dateCompare).ordinal <
    DateTime.fromISO(dateComparator).ordinal;

  static IS_DATE = (date: string) => DateTime.fromISO(date).isValid;

  static NOW = () => DateTime.now();

  static ISO_DATE = (date: string) =>
    DateTime.fromISO(date).startOf('day').toISODate()!;

  static CLIENT_DATE = (date: string) =>
    DateTime.fromISO(date).toFormat('dd/MM/yyyy');

  static MONTHS = () => {
    return Info.months(undefined, { locale: 'ru' }).map(
      (month) => month.charAt(0).toUpperCase() + month.slice(1),
    );
  };

  static YEARS = () => {
    let startOf = 2023;
    const endOf = 2099;
    const years = [];

    while (startOf++ < endOf) {
      years.push(startOf);
    }

    return years;
  };

  static ALL_DAYS_IN_MONTH = (month: number, year: number) => {
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
  };

  static ALL_DAYS_IN_RANGE = (from: string, to: string) => {
    return Interval.fromDateTimes(
      DateTime.fromISO(from).startOf('day'),
      DateTime.fromISO(to).endOf('day'),
    )
      .splitBy({ day: 1 })
      .map((d) => d.start?.toISODate());
  };
}
