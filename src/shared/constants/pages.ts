import { I18nTranslations } from 'src/i18n/i18n.generated';

export enum PagesEnum {
  'OptionsPage' = 'OptionsPage',
  'DaysPage' = 'DaysPage',
}
export enum PagesPathname {
  'OptionsPage' = 'options',
  'DaysPage' = 'days',
}

export type Page = keyof typeof PagesEnum;

export type PageBaseProps<T extends Page> = {
  translations: I18nTranslations['client'][T];
};

export const pagesPathname = (page: Page) => {
  switch (page) {
    case PagesEnum.DaysPage:
      return `/${PagesPathname.DaysPage}` as const;
    case PagesEnum.OptionsPage:
      return `/${PagesPathname.OptionsPage}` as const;
    default:
      return '/';
  }
};
