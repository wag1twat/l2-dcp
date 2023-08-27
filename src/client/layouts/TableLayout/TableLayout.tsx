import { Flex, Box, CircularProgress } from '@chakra-ui/react';
import React from 'react';

export interface TableLayoutProps {
  Toolbar: React.ReactNode;
  isLoading?: boolean;
}

export const TableLayout = ({
  Toolbar,
  isLoading,
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
        position="relative"
      >
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          width="full"
          height="full"
          background="blue-brand-90"
          zIndex={1000}
          pointerEvents="auto"
          userSelect="none"
          display="flex"
          justifyContent="center"
          alignItems="center"
          hidden={!isLoading}
        >
          <CircularProgress isIndeterminate color="light-blue-brand-0" />
        </Box>
        {children}
      </Flex>
    </Flex>
  );
};
