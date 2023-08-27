import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import React from 'react';
import { TableLayout, TableLayoutProps } from './TableLayout';
import { TableParts } from './TableParts';

interface ReactTableProps<T> extends TableLayoutProps {
  columns: ColumnDef<T, any>[];
  data: T[];
  isLoading?: boolean;
}

export function ReactTable<T>({
  Toolbar,
  columns,
  data,
  isLoading = false,
}: ReactTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <TableLayout Toolbar={Toolbar} isLoading={isLoading}>
      <TableParts.Table width="full">
        <TableParts.Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableParts.Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableParts.Th key={header.id}>
                  <div
                    {...{
                      className: header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : '',
                      onClick: header.column.getToggleSortingHandler(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
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
