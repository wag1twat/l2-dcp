import React from 'react';
import { Days } from 'src/client/entities';
import { Layout } from 'src/client/layouts';
import { ClientDayEntity } from 'src/server/modules/days/entities/day.entity';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { TranslationsProvider } from 'src/client/entities/Days/providers';
import { PageBaseProps, PagesEnum } from 'src/shared/constants/pages';
import { useStorageSetLastPagePath } from 'src/client/hooks';
import { ClientOptionEntity } from 'src/server/modules/options/entities/option.entity';
import { ClientUserEntity } from 'src/server/modules/users/entities/user.entity';
import dynamic from 'next/dynamic';

interface DaysPageProps extends PageBaseProps<'DaysPage'> {
  ssrDays: ClientDayEntity[];
  ssrOptions: ClientOptionEntity[];
  ssrUsers: ClientUserEntity[];
}
interface SsrProps extends PageBaseProps<'DaysPage'> {
  days: ClientDayEntity[];
  options: ClientOptionEntity[];
  users: ClientUserEntity[];
}

const DaysPage = ({
  ssrDays,
  ssrOptions,
  ssrUsers,
  translations,
}: React.PropsWithChildren<DaysPageProps>) => {
  useStorageSetLastPagePath(PagesEnum.DaysPage);
  return (
    <TranslationsProvider translations={translations}>
      <Layout page={PagesEnum.DaysPage}>
        <Days ssrDays={ssrDays} />
      </Layout>
    </TranslationsProvider>
  );
};

export const getServerSideProps = buildServerSideProps<DaysPageProps, SsrProps>(
  async (ctx) => {
    return {
      ssrDays: ctx.query.days,
      ssrOptions: ctx.query.options,
      ssrUsers: ctx.query.users,
      translations: ctx.query.translations,
    };
  },
);

export default DaysPage;
