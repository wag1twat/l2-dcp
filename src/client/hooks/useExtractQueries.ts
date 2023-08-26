import { Many, pick, PropertyPath } from 'lodash';
import queryString from 'query-string';

// TODO: Refactor / Deprecate
export const useExtractQueries = <T>() => {
  return function (...props: Many<PropertyPath>[]) {
    return pick<T>(
      queryString.parse(globalThis.location.search) as unknown as T,
      ...props,
    );
  };
};
