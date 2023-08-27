import { Flex } from '@chakra-ui/react';
import React from 'react';
import { Page } from 'src/shared/constants/pages';
import { Header } from './Header';
import { Main } from './Main';

interface LayoutProps {
  page: Page;
}

export const Layout = ({
  page,
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <Flex flexDirection="column" width="full" height="full">
      <Flex width="full" flexGrow={0}>
        <Header page={page} />
      </Flex>
      <Flex
        flexGrow={1}
        overflow="hidden"
        background="blue-brand-90"
        borderRadius={4}
        px={4}
        m={4}
      >
        <Main>{children}</Main>
      </Flex>
    </Flex>
  );
};
