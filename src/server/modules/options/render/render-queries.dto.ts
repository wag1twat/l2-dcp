import { Lang } from 'src/shared/types/queries';
import { BaseQueryLang } from '../../queries/dto/base-queries.dto';

export class RenderQueriesDto extends BaseQueryLang {
  constructor(queries: RenderQueriesDto) {
    super();
    Object.assign(this, queries);
  }
}

export type RenderQueriesType = RenderQueriesDto;

export const defaultQueries = (lang: Lang): RenderQueriesDto => {
  return {
    lang,
  };
};
