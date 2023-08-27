import { useRouter } from 'next/router';
import { DaysRenderResult } from 'src/server/modules/days/render/render-result';

export const useDaysPageSsrProps = () => {
  const router = useRouter();

  const query = router.query as unknown as DaysRenderResult;

  return {
    options: query.options,
    users: query.users,
    translations: query.translations,
  };
};
