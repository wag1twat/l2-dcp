import { GetServerSidePropsContext } from 'src/shared/types/next';
import { AppData } from 'src/shared/types/app-data';
import { filterUnserializable } from './filterUnserializable';
import { StaticQuery } from './buildServerSideProps';

const extractAppData = (
  ctx: GetServerSidePropsContext<Partial<StaticQuery>>,
) => {
  const { features } = ctx.query.webConfig || {};

  return filterUnserializable({ features }) as Partial<AppData>;
};

export { extractAppData };
