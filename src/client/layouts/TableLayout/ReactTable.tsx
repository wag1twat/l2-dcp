import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import React from 'react';
import { TableLayout, TableLayoutProps } from './TableLayout';
import { TableParts } from './TableParts';

interface ReactTableProps<T> extends TableLayoutProps {
  columns: ColumnDef<T, any>[];
  data: T[];
}

export function ReactTable<T>({ Toolbar, columns, data }: ReactTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <TableLayout Toolbar={Toolbar}>
      <TableParts.Table>
        <TableParts.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableParts.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableParts.Th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableParts.Th>
              ))}
            </TableParts.Tr>
          ))}
        </TableParts.Thead>
        <TableParts.Tbody>
          {table.getRowModel().rows.map((row) => (
            <TableParts.Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableParts.Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableParts.Td>
              ))}
            </TableParts.Tr>
          ))}
        </TableParts.Tbody>
      </TableParts.Table>
    </TableLayout>
  );
}
