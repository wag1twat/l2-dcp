import { VStack, HStack, Button, Flex } from '@chakra-ui/react';
import Router from 'next/router';
import React from 'react';
import {
  useStorageGetLastPagePath,
  useTranslationPage,
} from 'src/client/hooks';
import { Page } from 'src/shared/constants/pages';

interface HeaderProps {
  page: Page;
}

export const Header = ({
  page,
  children,
}: React.PropsWithChildren<HeaderProps>) => {
  const translations = useTranslationPage(page);

  const lastDaysPath = useStorageGetLastPagePath('DaysPage');
  const lastOptionsPath = useStorageGetLastPagePath('OptionsPage');

  if (!translations) {
    return null;
  }

  return (
    <VStack width="full" background="brand" p={4}>
      <Flex width="full" alignItems="center" justifyContent="space-between">
        <HStack>
          <Button size="sm" onClick={() => Router.push(lastOptionsPath())}>
            {translations.header.buttons.options}
          </Button>
          <Button size="sm" onClick={() => Router.push(lastDaysPath())}>
            {translations.header.buttons.days}
          </Button>
        </HStack>
        <Button size="sm">{translations.header.buttons.auth}</Button>
      </Flex>
      {children}
    </VStack>
  );
};
