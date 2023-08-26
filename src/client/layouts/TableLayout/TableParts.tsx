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
} from '@chakra-ui/react';

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
}
