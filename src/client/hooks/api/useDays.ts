import axiosInstance from 'dist/shared/utils/axiosInstance';
import { QueryOptions, useQuery } from 'react-query';
import querystring from 'query-string';
import { ClientDayEntity } from 'src/server/modules/days/entities/day.entity';
import { GetQueriesType } from 'src/server/modules/days/queries';

export const useDays = (
  options: QueryOptions<ClientDayEntity[]> = {},
  queries: GetQueriesType,
) => {
  return useQuery(['days', queries], {
    queryFn: async () => {
      return axiosInstance
        .get<{ data: ClientDayEntity[] }>(
          `/api/days?${querystring.stringify(queries)}`,
        )
        .then((result) => result.data.data);
    },
    initialData: options.initialData,
    enabled: false,
  });
};
