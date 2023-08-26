import { Flex } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { useAdenasValue } from 'src/client/hooks';
import { ReactTable } from 'src/client/layouts';
import { OptionEntity } from 'src/server/modules/options/entities/option.entity';
import { useTranslations } from './providers';

interface OptionsProps {
  options: OptionEntity[];
}

const columnHelper = createColumnHelper<OptionEntity>();

export const Options = ({ options }: OptionsProps) => {
  const translations = useTranslations();

  const adenasValue = useAdenasValue(translations.shared.adenas.postfixes);

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: () => <span>{translations.tables.options.id}</span>,
      }),
      columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
        header: () => <span>{translations.tables.options.name}</span>,
      }),
      columnHelper.accessor('cost_in_points', {
        cell: (info) => info.renderValue(),
        header: () => <span>{translations.tables.options.cost_in_points}</span>,
      }),
      columnHelper.accessor('cost_in_adenas', {
        cell: (info) => adenasValue(info.renderValue() || 0),
        header: () => <span>{translations.tables.options.cost_in_adenas}</span>,
      }),
    ],
    [translations],
  );

  return <ReactTable Toolbar={null} data={options} columns={columns} />;
};
