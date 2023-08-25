import React from 'react';
import { Days } from 'src/client/entities';
import { Layout } from 'src/client/layouts';
import { DayEntity } from 'src/server/modules/days/entities/day.entity';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { TranslationsProvider } from 'src/client/entities/Days/providers';
import { PageBaseProps, PagesEnum } from 'src/shared/constants/pages';
import { useStorageSetLastPagePath } from 'src/client/hooks';

interface DaysPageProps extends PageBaseProps<'DaysPage'> {
  days: DayEntity[];
}

const DaysPage = ({
  days,
  translations,
}: React.PropsWithChildren<DaysPageProps>) => {
  useStorageSetLastPagePath(PagesEnum.DaysPage);
  return (
    <TranslationsProvider translations={translations}>
      <Layout page={PagesEnum.DaysPage}>
        <Days days={days} />
      </Layout>
    </TranslationsProvider>
  );
};

export const getServerSideProps = buildServerSideProps<
  DaysPageProps,
  DaysPageProps
>(async (ctx) => {
  return {
    days: ctx.query.days,
    translations: ctx.query.translations,
  };
});

export default DaysPage;
