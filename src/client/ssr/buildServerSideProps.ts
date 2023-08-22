import { ParsedUrlQuery } from 'querystring';
import { WebConfig } from '../../shared/types/config';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from '../../shared/types/next';

type StaticProps = {
  features: WebConfig['features'];
};

type StaticQuery = {
  webConfig: WebConfig;
};

const buildServerSideProps = <P, Q extends ParsedUrlQuery = ParsedUrlQuery>(
  getServerSideProps: (ctx: GetServerSidePropsContext<Q>) => Promise<P>,
): GetServerSideProps<Partial<StaticProps> & P, Partial<StaticQuery> & Q> => {
  return async (ctx) => {
    const { features } = ctx.query.webConfig || {};

    const props = await getServerSideProps(ctx);

    return {
      props: {
        ...props,
        features,
      },
    };
  };
};

export { buildServerSideProps };
