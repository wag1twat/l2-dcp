import { DateTime } from 'luxon';

export const normalizeDate = (date: string) =>
  DateTime.fromISO(date).toFormat('dd/MM/yyyy');
