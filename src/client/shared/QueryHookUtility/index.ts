import { DateTime } from 'luxon';
import queryString from 'query-string';
import { isClient } from 'src/shared/constants/env';
import { isFunc } from 'src/shared/utils/guards';

export class QueryHookUtility<T> {
  queryHash: string;
  defaultQueries: T | ((now: DateTime) => T);
  constructor(queryHash: string, defaultQueries: T | ((now: DateTime) => T)) {
    this.queryHash = queryHash;
    this.defaultQueries = defaultQueries;
  }

  injectDefaultQueriesStorage(queries: string) {
    localStorage.setItem(this.queryHash, queries);
  }

  getDefaultQueries(): T {
    let queries: T;
    if (isFunc(this.defaultQueries)) {
      queries = this.defaultQueries(DateTime.now());
    } else {
      queries = this.defaultQueries;
    }

    if (!isClient) {
      return queries;
    }
    const exist = globalThis.localStorage.getItem(this.queryHash);

    if (!exist) {
      this.injectDefaultQueriesStorage(queryString.stringify(queries));
      return this.getDefaultQueries();
    }

    return queryString.parse(exist) as unknown as T;
  }
}
