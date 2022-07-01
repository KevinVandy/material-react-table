import React, { FC } from 'react';
import { darken, lighten, TableRow } from '@mui/material';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  rowIndex: number;
  instance: MRT_TableInstance;
}

export const MRT_TableBodyRow: FC<Props> = ({ row, rowIndex, instance }) => {
  const {
    getIsSomeColumnsPinned,
    options: { muiTableBodyRowProps, renderDetailPanel },
  } = instance;

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, instance })
      : muiTableBodyRowProps;

  return (
    <>
      <TableRow
        hover
        selected={row.getIsSelected()}
        {...tableRowProps}
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.06),
          transition: 'all 0.2s ease-in-out',
          '&:hover td': {
            backgroundColor:
              tableRowProps?.hover !== false && getIsSomeColumnsPinned()
                ? theme.palette.mode === 'dark'
                  ? `${lighten(theme.palette.background.default, 0.12)}`
                  : `${darken(theme.palette.background.default, 0.05)}`
                : undefined,
          },
          ...(tableRowProps?.sx as any),
        })}
      >
        {row.getVisibleCells().map((cell) => (
          <MRT_TableBodyCell
            cell={cell}
            key={cell.id}
            enableHover={tableRowProps?.hover !== false}
            rowIndex={rowIndex}
            instance={instance}
          />
        ))}
      </TableRow>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel row={row} instance={instance} />
      )}
    </>
  );
};
