import Router from 'next/router';
import { isClient } from 'src/shared/constants/env';
import { Lang } from 'src/shared/types/queries';
import { useStorage } from './useStorage';

export const useLang = () => {
  return useStorage<Lang>(
    'lang',
    (isClient ? Router.query.lang || 'ru' : 'ru') as Lang,
  );
};
