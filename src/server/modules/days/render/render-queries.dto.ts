import { IntersectionType } from '@nestjs/mapped-types';
import { Lang } from 'src/shared/types/queries';
import { DateManager } from 'src/shared/utils/date-manager';
import { BaseQueryLang } from '../../queries/dto/base-queries.dto';
import { GetQueriesDto } from '../queries';

export class RenderQueriesDto extends IntersectionType(
  GetQueriesDto,
  BaseQueryLang,
) {
  constructor(queries: RenderQueriesDto) {
    super();
    Object.assign(this, queries);
  }
}

export type RenderQueriesType = RenderQueriesDto;

export const defaultQueries = (lang: Lang): RenderQueriesDto => {
  const now = DateManager.NOW();
  const from = now.startOf('month').toISODate()!;
  const to = now.endOf('month').toISODate()!;
  return {
    lang,
    from,
    to,
    orderBy: 'date',
    order: 'ASC',
  };
};
