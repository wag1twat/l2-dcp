import {
  TableColumnHeaderProps,
  Thead,
  Th,
  TableHeadProps,
  Tr,
  TableRowProps,
  Td,
  TableCellProps,
  TableProps,
  Table,
  TableBodyProps,
  Tbody,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import { Order } from 'src/shared/types/queries';

export class TableParts {
  static Table = (props: TableProps) => (
    <Table
      variant="simple"
      size="sm"
      __css={{
        'th, td': {
          color: 'whiteAlpha.900',
        },
      }}
      height="fit-content"
      {...props}
    />
  );

  static Thead = (props: TableHeadProps) => (
    <Thead background="hsla(244, 13%, 21%, 1);" {...props} />
  );

  static Tbody = (props: TableBodyProps) => <Tbody {...props} />;

  static Tr = (props: TableRowProps) => <Tr background="inherit" {...props} />;

  static Th = (props: TableColumnHeaderProps) => (
    <Th position="sticky" top={0} p={2} background="inherit" {...props} />
  );
  static Td = (props: TableCellProps) => <Td p={2} {...props} />;

  static SortTrigger<TOrderBy extends string>(
    props: React.PropsWithChildren<{
      order: Order;
      orderBy: TOrderBy;
      currentOrderBy: TOrderBy;
      onChange(orderBy: TOrderBy, order: Order): void;
    }>,
  ) {
    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        const nextOrder = props.order === 'ASC' ? 'DESC' : 'ASC';
        props.onChange(props.orderBy, nextOrder);
      },
      [],
    );
    return (
      <Box onClick={handleClick}>
        {props.children}
        {props.orderBy === props.currentOrderBy &&
          props.order === 'ASC' &&
          ' 🔼'}
        {props.orderBy === props.currentOrderBy &&
          props.order === 'DESC' &&
          ' 🔽'}
      </Box>
    );
  }
}
