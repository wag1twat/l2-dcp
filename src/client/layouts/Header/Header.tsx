import { VStack, HStack, Button, Flex } from '@chakra-ui/react';
import Router from 'next/router';
import React from 'react';
import {
  TranslationHook,
  useTranslationHook,
} from 'src/client/utils/useTranslationHook';
import { pathWithLang } from 'src/client/utils/pathWithLang';
import { isClient } from 'src/shared/constants/env';

interface HeaderProps {
  translationHook: TranslationHook;
}

export const Header = ({
  translationHook,
  children,
}: React.PropsWithChildren<HeaderProps>) => {
  const translations = useTranslationHook(translationHook);

  if (!translations) {
    return null;
  }

  return (
    <VStack width="full" background="brand" p={4}>
      <Flex width="full" alignItems="center" justifyContent="space-between">
        <HStack>
          <Button
            size="sm"
            onClick={() => Router.push(pathWithLang('/options'))}
          >
            {translations.header.buttons.options}
          </Button>
          <Button size="sm" onClick={() => Router.push(pathWithLang('/days'))}>
            {translations.header.buttons.days}
          </Button>
        </HStack>
        <Button size="sm">{translations.header.buttons.auth}</Button>
      </Flex>
      {children}
    </VStack>
  );
};
