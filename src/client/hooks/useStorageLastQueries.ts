import React from 'react';
import { Page, pagesPathname } from 'src/shared/constants/pages';
import { isClient } from 'src/shared/constants/env';
import querystring from 'querystring';
import { omit } from 'lodash';
import { Lang } from 'src/shared/types/queries';

const langKey = 'lang';

export const useStorageSetLastPagePath = (pageKey: Page) => {
  if (isClient) {
    React.useEffect(() => {
      const search = globalThis.window.location.search;
      const parsed = querystring.parse(
        search.startsWith('?') ? search.slice(1) : search,
      );
      const item = omit(parsed, 'lang');
      globalThis.localStorage.setItem(pageKey, querystring.stringify(item));
      globalThis.localStorage.setItem(langKey, parsed.lang as Lang);
    }, [pageKey, globalThis.window.location.search]);
  }
};

export const useStorageGetLastPagePath = (pageKey: Page) => {
  if (isClient) {
    return () => {
      const item = globalThis.localStorage.getItem(pageKey);
      const lang = globalThis.localStorage.getItem(langKey) || undefined;

      if (item !== null) {
        const parsed = querystring.parse(item);
        const lang = globalThis.localStorage.getItem(langKey) || undefined;
        parsed.lang = lang;

        return `${pagesPathname(pageKey)}?${querystring.stringify(parsed)}`;
      }

      return `${pagesPathname(pageKey)}?${querystring.stringify({ lang })}`;
    };
  }
  return () => pagesPathname(pageKey);
};
