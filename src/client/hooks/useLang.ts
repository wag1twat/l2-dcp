import { Lang } from 'src/shared/types/queries';
import { useStorage } from './useStorage';

export const useLang = () => {
  return useStorage<Lang>('lang', 'ru');
};
