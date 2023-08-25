import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import React from 'react';
import { StickyTh, TableLayout } from 'src/client/layouts';
import { OptionEntity } from 'src/server/modules/options/entities/option.entity';
import { useTranslations } from './providers';

interface OptionsProps {
  options: OptionEntity[];
}

export const Options = ({ options }: OptionsProps) => {
  const translations = useTranslations();

  return (
    <TableLayout Toolbar={<div>xxx</div>}>
      <Table
        variant="simple"
        size="sm"
        __css={{
          'th, td': {
            color: 'whiteAlpha.900',
          },
        }}
      >
        <Thead background="brand">
          <Tr background="inherit">
            <StickyTh>{translations.tables.options.id}</StickyTh>
            <StickyTh>{translations.tables.options.name}</StickyTh>
            <StickyTh>{translations.tables.options.cost_in_points}</StickyTh>
            <StickyTh>{translations.tables.options.cost_in_adenas}</StickyTh>
          </Tr>
        </Thead>
        <Tbody>
          {options.map((option) => (
            <Tr key={option.id}>
              <Td>{option.id}</Td>
              <Td>{option.name}</Td>
              <Td>{option.cost_in_points}</Td>
              <Td>{option.cost_in_adenas}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableLayout>
  );
};
