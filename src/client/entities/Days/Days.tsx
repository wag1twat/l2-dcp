import { RangePicker } from 'src/client/shared/RangePicker';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { useAdenasValue } from 'src/client/hooks';
import { useDays, useDaysUtility } from 'src/client/hooks/api';
import { NoSsr, ReactTable, TableParts } from 'src/client/layouts';
import { ClientDayEntity } from 'src/server/modules/days/entities/day.entity';
import { DateManager } from 'src/shared/utils/date-manager';
import { useIsClient } from 'src/client/hooks/useIsClient';
import { useDaysPageSsrProps } from './model';
import { GetDaysQueriesType } from 'src/server/modules/days/queries';

interface DaysProps {}

const columnHelper = createColumnHelper<ClientDayEntity>();

export const Days = (props: React.PropsWithChildren<DaysProps>) => {
  const isClient = useIsClient();

  const { translations } = useDaysPageSsrProps();

  const queryUtility = useDaysUtility();

  const [queries, setQueries] = React.useState<GetDaysQueriesType>(() =>
    queryUtility.getDefaultQueries(),
  );

  const { query } = useDays({}, queries);

  const adenasValue = useAdenasValue(translations.shared.adenas.postfixes);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('id', {
        header: () => <span>{translations.tables.days.id}</span>,
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor('date', {
        header: () => (
          <TableParts.SortTrigger
            order={queries.order}
            orderBy="date"
            currentOrderBy={queries.orderBy}
            onChange={(orderBy, order) =>
              setQueries((previous) => ({ ...previous, order, orderBy }))
            }
          >
            <span>{translations.tables.days.date}</span>
          </TableParts.SortTrigger>
        ),
        cell: (info) => DateManager.CLIENT_DATE(info.getValue()),
        enableSorting: false,
      }),
      columnHelper.accessor('points', {
        header: () => (
          <TableParts.SortTrigger
            order={queries.order}
            orderBy="points"
            currentOrderBy={queries.orderBy}
            onChange={(orderBy, order) =>
              setQueries((previous) => ({ ...previous, order, orderBy }))
            }
          >
            <span>{translations.tables.days.points}</span>
          </TableParts.SortTrigger>
        ),
        cell: (info) => info.getValue(),
        enableSorting: false,
      }),
      columnHelper.accessor('adenas', {
        header: () => (
          <TableParts.SortTrigger
            order={queries.order}
            orderBy="adenas"
            currentOrderBy={queries.orderBy}
            onChange={(orderBy, order) =>
              setQueries((previous) => ({ ...previous, order, orderBy }))
            }
          >
            <span>{translations.tables.days.adenas}</span>
          </TableParts.SortTrigger>
        ),
        cell: (info) => adenasValue(info.getValue() || 0),
        enableSorting: false,
      }),
    ],
    [queries, translations.tables],
  );

  // TODO: Refactor
  const handleChangeDateRange = React.useCallback((range: [string, string]) => {
    setQueries((previos) => ({
      ...previos,
      from: range[0],
      to: range[1],
    }));
  }, []);

  return (
    <NoSsr>
      <ReactTable
        Toolbar={
          isClient && (
            <RangePicker
              value={[queries.from, queries.to]}
              onChange={handleChangeDateRange}
            />
          )
        }
        data={query.data || []}
        columns={columns}
        isLoading={query.isLoading}
      />
    </NoSsr>
  );
};

export default Days;
