import { DateManager } from 'src/shared/utils/date-manager';
import { GetDaysQueriesType } from '../queries';

export const daysPageFirstRenderQueries = (): GetDaysQueriesType => {
  const now = DateManager.NOW();
  const from = now.startOf('month').toISODate()!;
  const to = now.endOf('month').toISODate()!;
  return {
    from,
    to,
    orderBy: 'date',
    order: 'ASC',
  };
};
