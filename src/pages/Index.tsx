import React from 'react';
import { Days } from 'src/client/entities';
import { Layout } from 'src/client/layout';
import { DayEntity } from 'src/server/modules/days/entities/day.entity';
import { buildServerSideProps } from '../client/ssr/buildServerSideProps';

interface IndexProps {
  days: DayEntity[];
}

const Index = (props: React.PropsWithChildren<IndexProps>) => {
  return (
    <Layout>
      <Days days={props.days} />
    </Layout>
  );
};

export const getServerSideProps = buildServerSideProps<IndexProps, IndexProps>(
  async (ctx) => {
    return {
      days: ctx.query.days,
    };
  },
);

export default Index;
