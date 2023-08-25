import { Page } from 'src/shared/constants/pages';
import { useTranslations as useDaysTranslations } from '../entities/Days/providers';
import { useTranslations as useOptionsTranslations } from '../entities/Options/providers';

export const useTranslationPage = (page: Page) => {
  switch (page) {
    case 'OptionsPage':
      return useOptionsTranslations();
    case 'DaysPage':
      return useDaysTranslations();
    default:
      break;
  }
};
