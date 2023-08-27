import React from 'react';
import { Days } from 'src/client/entities';
import { Layout } from 'src/client/layouts';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { TranslationsProvider } from 'src/client/entities/Days/providers';
import { PageBaseProps, PagesEnum } from 'src/shared/constants/pages';
import { DaysRenderResult } from 'src/server/modules/days/render/render-result';

interface DaysPageProps extends PageBaseProps<'DaysPage'> {}

const DaysPage = ({ translations }: React.PropsWithChildren<DaysPageProps>) => {
  // useStorageSetLastPagePath(PagesEnum.DaysPage);
  return (
    <TranslationsProvider translations={translations}>
      <Layout page={PagesEnum.DaysPage}>
        <Days />
      </Layout>
    </TranslationsProvider>
  );
};

export const getServerSideProps = buildServerSideProps<
  DaysPageProps,
  DaysRenderResult
>(async (ctx) => {
  return {
    translations: ctx.query.translations,
  };
});

export default DaysPage;
