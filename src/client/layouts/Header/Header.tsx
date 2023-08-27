import { VStack, HStack, Button, Flex } from '@chakra-ui/react';
import Router from 'next/router';
import React from 'react';
import { SelectLang } from 'src/client/features';
import { useTranslationPage } from 'src/client/hooks';
import { Page, PagesEnum, pagesPathname } from 'src/shared/constants/pages';

interface HeaderProps {
  page: Page;
}

export const Header = ({
  page,
  children,
}: React.PropsWithChildren<HeaderProps>) => {
  const translations = useTranslationPage(page);

  if (!translations) {
    return null;
  }

  return (
    <VStack width="full" background="blue-brand-0" p={4}>
      <Flex width="full" alignItems="center" justifyContent="space-between">
        <HStack>
          <Button
            size="sm"
            onClick={() => Router.push(pagesPathname(PagesEnum.OptionsPage))}
          >
            {translations.header.buttons.options}
          </Button>
          <Button
            size="sm"
            onClick={() => Router.push(pagesPathname(PagesEnum.DaysPage))}
          >
            {translations.header.buttons.days}
          </Button>
        </HStack>
        <HStack>
          <SelectLang langs={translations.shared.langs} />
          <Button size="sm">{translations.header.buttons.auth}</Button>
        </HStack>
      </Flex>
      {children}
    </VStack>
  );
};
