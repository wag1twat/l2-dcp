import { Flex } from '@chakra-ui/react';
import React from 'react';
import { TranslationHook } from '../utils/useTranslationHook';
import { Header } from './Header';
import { Main } from './Main';

interface LayoutProps {
  translationHook: TranslationHook;
}

export const Layout = ({
  translationHook,
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  return (
    <Flex flexDirection="column" width="full" height="full">
      <Flex width="full" flexGrow={0}>
        <Header translationHook={translationHook} />
      </Flex>
      <Flex
        flexGrow={1}
        overflow="hidden"
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
