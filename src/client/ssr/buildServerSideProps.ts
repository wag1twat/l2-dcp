import { ParsedUrlQuery } from 'querystring';
import { AppData } from 'src/shared/types/app-data';
import { WebConfig } from '../../shared/types/config';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from '../../shared/types/next';
import { extractAppData } from './extractAppData';
import { filterUnserializable } from './filterUnserializable';

type StaticProps = {
  appData: Partial<AppData>;
};

export type StaticQuery = {
  webConfig: WebConfig;
};

const buildServerSideProps = <P, Q = ParsedUrlQuery>(
  getServerSideProps: (ctx: GetServerSidePropsContext<Q>) => Promise<P>,
): GetServerSideProps<Partial<StaticProps> & P, Partial<StaticQuery> & Q> => {
  return async (ctx) => {
    return {
      props: {
        ...(await getServerSideProps(ctx)),
        appData: extractAppData(ctx),
      },
    };
  };
};

export { buildServerSideProps };
