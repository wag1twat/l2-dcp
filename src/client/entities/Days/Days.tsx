import DatePicker, { RangeValue } from 'src/client/shared/DatePicker';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { useAdenasValue, useUrlSearchParams } from 'src/client/hooks';
import { useDays } from 'src/client/hooks/api';
import { NoSsr, ReactTable } from 'src/client/layouts';
import { ClientDayEntity } from 'src/server/modules/days/entities/day.entity';
import { DateManager } from 'src/shared/utils/date-manager';
import { useTranslations } from './providers';
import { DateTime } from 'luxon';
import Router from 'next/router';
import { useIsClient } from 'src/client/hooks/useIsClient';
import queryString from 'query-string';
import { pagesPathname } from 'src/shared/constants/pages';
import { GetQueriesType } from 'src/server/modules/days/queries';
import { omit } from 'lodash';

interface DaysProps {
  ssrDays: ClientDayEntity[];
}

const columnHelper = createColumnHelper<ClientDayEntity>();
const { RangePicker } = DatePicker;

export const Days = ({ ssrDays }: React.PropsWithChildren<DaysProps>) => {
  const isClient = useIsClient();

  const { searchParams } = useUrlSearchParams();

  // TODO: Refactor
  const queries = React.useMemo(
    () => ({
      from: searchParams.get('from'),
      to: searchParams.get('to'),
      orderBy: searchParams.get('orderBy'),
      order: searchParams.get('order'),
      lang: searchParams.get('lang'),
    }),
    [searchParams],
  );

  console.log(queries);

  const daysQuery = useDays(
    { initialData: ssrDays },
    omit(queries, 'lang') as GetQueriesType,
  );

  const translations = useTranslations();

  const adenasValue = useAdenasValue(translations.shared.adenas.postfixes);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => <span>{translations.tables.days.id}</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('date', {
        header: () => <span>{translations.tables.days.date}</span>,
        cell: (info) => DateManager.CLIENT_DATE(info.getValue()),
      }),
      columnHelper.accessor('points', {
        header: () => <span>{translations.tables.days.points}</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('adenas', {
        header: () => <span>{translations.tables.days.adenas}</span>,
        cell: (info) => adenasValue(info.getValue() || 0),
      }),
    ],
    [translations.tables],
  );

  // TODO: Refactor
  const handleChangeDateRange = React.useCallback((range: RangeValue) => {
    const nextQueries = new Map([
      ['from', range?.[0]?.toISODate() as string],
      ['to', range?.[1]?.toISODate() as string],
      ['orderBy', queries.orderBy || ''],
      ['order', queries.order || ''],
      ['lang', queries.lang || ''],
    ]);

    const params = new URLSearchParams(Object.fromEntries(nextQueries));

    Router.replace(
      `${pagesPathname('DaysPage')}?${params.toString()}`,
      undefined,
      { shallow: true },
    );
  }, []);
  return (
    <NoSsr>
      <ReactTable
        Toolbar={
          isClient && (
            <RangePicker
              value={[
                DateTime.fromISO(Router.query.from as string),
                DateTime.fromISO(Router.query.to as string),
              ]}
              onChange={handleChangeDateRange}
            />
          )
        }
        data={daysQuery.data || []}
        columns={columns}
      />
    </NoSsr>
  );
};

export default Days;
