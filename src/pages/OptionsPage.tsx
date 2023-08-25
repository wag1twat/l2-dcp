import React from 'react';
import { Options } from 'src/client/entities/Options';
import { Layout } from 'src/client/layouts';
import { I18nTranslations } from 'src/i18n/i18n.generated';
import { OptionEntity } from 'src/server/modules/options/entities/option.entity';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { TranslationsProvider } from 'src/client/entities/Options/providers';

interface OptionPageProps {
  options: OptionEntity[];
  translations: I18nTranslations['client']['options'];
}

const OptionPage = ({
  translations,
  options,
}: React.PropsWithChildren<OptionPageProps>) => {
  return (
    <TranslationsProvider translations={translations}>
      <Layout translationHook="options">
        <Options options={options} />
      </Layout>
    </TranslationsProvider>
  );
};

export const getServerSideProps = buildServerSideProps<
  OptionPageProps,
  OptionPageProps
>(async (ctx) => {
  return {
    options: ctx.query.options,
    translations: ctx.query.translations,
  };
});

export default OptionPage;
