import React, { FC, RefObject } from 'react';
import { useVirtual } from 'react-virtual';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  instance: MRT_TableInstance;
  tableContainerRef: RefObject<HTMLDivElement>;
}

export const MRT_TableBody: FC<Props> = ({ instance, tableContainerRef }) => {
  const {
    getPaginationRowModel,
    getPrePaginationRowModel,
    getState,
    options: {
      enablePagination,
      enableRowVirtualization,
      muiTableBodyProps,
      virtualizerProps,
    },
  } = instance;

  const { isDensePadding } = getState();

  const tableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps({ instance })
      : muiTableBodyProps;

  const rows = enablePagination
    ? getPaginationRowModel().rows
    : getPrePaginationRowModel().rows;

  const rowVirtualizer = enableRowVirtualization
    ? useVirtual({
        overscan: isDensePadding ? 15 : 5,
        size: rows.length,
        parentRef: tableContainerRef,
        ...virtualizerProps,
      })
    : ({} as any);

  const { virtualItems: virtualRows } = rowVirtualizer;
  const paddingTop = virtualRows?.length > 0 ? virtualRows[0].start : 0;
  const paddingBottom =
    virtualRows?.length > 0
      ? rowVirtualizer.totalSize - virtualRows[virtualRows.length - 1].end
      : 0;

  return (
    <TableBody {...tableBodyProps}>
      {enableRowVirtualization && paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {/* @ts-ignore */}
      {(enableRowVirtualization ? virtualRows : rows).map(
        (rowOrVirtualRow: any, rowIndex: number) => {
          const row = enableRowVirtualization
            ? (rows[rowOrVirtualRow.index] as MRT_Row)
            : (rowOrVirtualRow as MRT_Row);
          return (
            <MRT_TableBodyRow
              key={row.id}
              row={row}
              rowIndex={
                enableRowVirtualization ? rowOrVirtualRow.index : rowIndex
              }
              instance={instance}
            />
          );
        },
      )}
      {enableRowVirtualization && paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </TableBody>
  );
};
