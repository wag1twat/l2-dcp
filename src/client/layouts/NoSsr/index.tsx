import React from 'react';
import { useIsClient } from 'src/client/hooks/useIsClient';

export const NoSsr = ({ children }: React.PropsWithChildren) => {
  const isClient = useIsClient();

  return isClient ? <React.Fragment>{children}</React.Fragment> : null;
};
