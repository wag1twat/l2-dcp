import React from 'react';
import { Options } from 'src/client/entities/Options';
import { Layout } from 'src/client/layouts';
import { OptionEntity } from 'src/server/modules/options/entities/option.entity';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { TranslationsProvider } from 'src/client/entities/Options/providers';
import { PageBaseProps, PagesEnum } from 'src/shared/constants/pages';
import { useStorageSetLastPagePath } from 'src/client/hooks';

interface OptionPageProps extends PageBaseProps<'OptionsPage'> {
  options: OptionEntity[];
}

const OptionPage = ({
  translations,
  options,
}: React.PropsWithChildren<OptionPageProps>) => {
  useStorageSetLastPagePath(PagesEnum.OptionsPage);
  return (
    <TranslationsProvider translations={translations}>
      <Layout page={PagesEnum.OptionsPage}>
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
