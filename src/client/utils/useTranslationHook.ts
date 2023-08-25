import { useTranslations as useDaysTranslations } from '../entities/Days/providers';
import { useTranslations as useOptionsTranslations } from '../entities/Options/providers';

export type TranslationHook = 'options' | 'days';

export const useTranslationHook = (hook: TranslationHook) => {
  switch (hook) {
    case 'options':
      return useOptionsTranslations();
    case 'days':
      return useDaysTranslations();
    default:
      break;
  }
};
