import { TableColumnHeaderProps, Th } from '@chakra-ui/react';
export const StickyTh = (props: TableColumnHeaderProps) => (
  <Th position="sticky" top={0} p={2} background="inherit" {...props} />
);
