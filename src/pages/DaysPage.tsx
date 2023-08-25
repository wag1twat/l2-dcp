import React from 'react';
import { Days } from 'src/client/entities';
import { Layout } from 'src/client/layouts';
import { I18nTranslations } from 'src/i18n/i18n.generated';
import { DayEntity } from 'src/server/modules/days/entities/day.entity';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { TranslationsProvider } from 'src/client/entities/Days/providers';

interface DaysPageProps {
  days: DayEntity[];
  translations: I18nTranslations['client']['days'];
}

const DaysPage = ({
  days,
  translations,
}: React.PropsWithChildren<DaysPageProps>) => {
  return (
    <TranslationsProvider translations={translations}>
      <Layout translationHook="days">
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
