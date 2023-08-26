import React from 'react';
import { useIsClient } from './useIsClient';

export const useUrlSearchParams = () => {
  const isClient = useIsClient();

  const searchParams = React.useMemo(
    () =>
      isClient
        ? new URLSearchParams(globalThis.location.search)
        : new URLSearchParams(''),
    [isClient],
  );

  return { searchParams };
};
