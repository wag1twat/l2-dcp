import Router from 'next/router';
import React, { FC } from 'react';
import { Days } from 'src/client/entities';
import { Layout } from 'src/client/layout';
import { DayEntity } from 'src/server/modules/days/entities/day.entity';
import { isClient } from 'src/shared/constants/env';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';

interface IndexProps {
  days: (typeof DayEntity)[];
}

const Index = ({ days = [] }: React.PropsWithChildren<IndexProps>) => {
  if (isClient) {
    console.log(Router.query);
  }
  return (
    <Layout>
      <Days days={days} />
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<{}>(async () => {
  return {};
});

export default Index;
