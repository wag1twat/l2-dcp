import { DateTime } from 'luxon';

export const ISOtoStartOfDay = (date: string) =>
  DateTime.fromISO(date).startOf('day').toISO()!;
