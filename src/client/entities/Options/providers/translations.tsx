import React, { createContext, useContext } from 'react';
import { I18nTranslations } from 'src/i18n/i18n.generated';
import { PagesEnum } from 'src/shared/constants/pages';

type Ctx = I18nTranslations['client'][PagesEnum.OptionsPage];

const ctx = createContext<Ctx>({} as Ctx);

export const useTranslations = () => useContext(ctx);

type TranslationsProviderProps = {
  translations: I18nTranslations['client'][PagesEnum.OptionsPage];
};

export const TranslationsProvider = ({
  translations,
  ...props
}: React.PropsWithChildren<TranslationsProviderProps>) => {
  return <ctx.Provider value={translations} {...props} />;
};
