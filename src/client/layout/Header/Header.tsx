import { VStack, Button, Flex } from '@chakra-ui/react';
import React from 'react';

export const Header = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <VStack width="full" background="brand" p={4}>
      <Flex width="full" alignItems="center" justifyContent="space-between">
        <Button size="sm">Options</Button>
        <Button size="sm">Auth</Button>
      </Flex>
      {children}
    </VStack>
  );
};
