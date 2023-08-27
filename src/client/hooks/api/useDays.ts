import axiosInstance from 'src/shared/utils/axiosInstance';
import queryString from 'query-string';
import { QueryOptions, useQuery } from 'react-query';
import { ClientDayEntity } from 'src/server/modules/days/entities/day.entity';
import { GetDaysQueriesType } from 'src/server/modules/days/queries';
import { QueryHookUtility } from 'src/client/shared/QueryHookUtility';
import React from 'react';

export const useDaysUtility = () => {
  return new QueryHookUtility<GetDaysQueriesType>('useDays', (now) => ({
    from: now.startOf('month').toISODate()!,
    to: now.endOf('month').toISODate()!,
    orderBy: 'date',
    order: 'ASC',
  }));
};

export const useDays = (
  options: QueryOptions<ClientDayEntity[]> = {},
  queries: GetDaysQueriesType,
) => {
  const utility = useDaysUtility();

  const queriesString = queryString.stringify(queries);

  const placeholder = React.useRef<ClientDayEntity[]>([]);

  const query = useQuery([utility.queryHash], {
    queryFn: async () => {
      return axiosInstance
        .get<{ data: ClientDayEntity[] }>(`/api/days?${queriesString}`)
        .then((result) => result.data.data);
    },
    queryHash: queriesString,
    initialData: options.initialData,
    enabled: true,
    onSettled() {
      utility.injectDefaultQueriesStorage(queriesString);
    },
    onSuccess(data) {
      placeholder.current = data;
    },
    placeholderData: placeholder.current,
  });

  return { utility, query };
};
