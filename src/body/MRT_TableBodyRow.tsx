import React, { FC, MouseEvent } from 'react';
import { darken, lighten, TableRow } from '@mui/material';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableBodyRow: FC<Props> = ({ row, tableInstance }) => {
  const {
    options: { muiTableBodyRowProps, onRowClick, renderDetailPanel },
  } = tableInstance;

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, tableInstance })
      : muiTableBodyRowProps;

  return (
    <>
      <TableRow
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.({ event, row, tableInstance })
        }
        selected={row.getIsSelected()}
        {...tableRowProps}
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.06),
          transition: 'all 0.2s ease-in-out',
          '&:hover td': {
            backgroundColor: tableRowProps?.hover
              ? theme.palette.mode === 'dark'
                ? lighten(theme.palette.background.default, 0.04)
                : darken(theme.palette.background.default, 0.04)
              : undefined,
          },
          //@ts-ignore
          ...(tableRowProps?.sx as any),
        })}
      >
        {row.getVisibleCells().map((cell) => (
          <MRT_TableBodyCell
            cell={cell}
            key={cell.id}
            tableInstance={tableInstance}
          />
        ))}
      </TableRow>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel row={row} tableInstance={tableInstance} />
      )}
    </>
  );
};
