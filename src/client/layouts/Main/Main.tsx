import { Box } from '@chakra-ui/react';
import React from 'react';

export const Main = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Box width="full" position="relative">
      {children}
    </Box>
  );
};
