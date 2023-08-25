import { Flex, Box } from '@chakra-ui/react';
import React from 'react';

interface TableLayoutProps {
  Toolbar: React.ReactNode;
}

export const TableLayout = ({
  Toolbar,
  children,
}: React.PropsWithChildren<TableLayoutProps>) => {
  if (!Toolbar) {
    return (
      <Flex
        flexGrow={1}
        overflow="auto"
        background="transparent"
        borderRadius={4}
        px={2}
        pb={2}
        width="full"
        height="full"
        justifyContent="center"
      >
        {children}
      </Flex>
    );
  }
  return (
    <Flex flexDirection="column" width="full" height="full">
      <Flex p={2} width="full" flexGrow={0} color="whiteAlpha.900">
        {Toolbar}
      </Flex>
      <Flex
        flexGrow={1}
        overflow="auto"
        background="transparent"
        borderRadius={4}
        px={2}
        pb={2}
        justifyContent="center"
      >
        {children}
      </Flex>
    </Flex>
  );
};
