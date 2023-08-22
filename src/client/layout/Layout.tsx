import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Header } from './Header';
import { Main } from './Main';

export const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Flex flexDirection="column" width="full" height="full">
      <Flex width="full" flexGrow={0}>
        <Header />
      </Flex>
      <Flex
        flexGrow={1}
        overflow="auto"
        background="brand-a"
        borderRadius={4}
        px={4}
        m={4}
      >
        <Main>{children}</Main>
      </Flex>
    </Flex>
  );
};
