import React, { FC } from 'react';
import { Collapse, TableCell, TableRow } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  table: MRT_TableInstance;
}

export const MRT_TableDetailPanel: FC<Props> = ({ row, table }) => {
  const {
    getVisibleLeafColumns,
    options: {
      muiTableBodyRowProps,
      muiTableDetailPanelProps,
      renderDetailPanel,
    },
  } = table;

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, table })
      : muiTableBodyRowProps;

  const tableCellProps =
    muiTableDetailPanelProps instanceof Function
      ? muiTableDetailPanelProps({ row, table })
      : muiTableDetailPanelProps;

  return (
    <TableRow {...tableRowProps}>
      <TableCell
        colSpan={getVisibleLeafColumns().length}
        {...tableCellProps}
        sx={(theme) => ({
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          pb: row.getIsExpanded() ? '1rem' : 0,
          pt: row.getIsExpanded() ? '1rem' : 0,
          transition: 'all 150ms ease-in-out',
          width: `${table.getTotalSize()}px`,
          ...(tableCellProps?.sx instanceof Function
            ? tableCellProps.sx(theme)
            : (tableCellProps?.sx as any)),
        })}
      >
        {renderDetailPanel && (
          <Collapse in={row.getIsExpanded()}>
            {renderDetailPanel({ row, table })}
          </Collapse>
        )}
      </TableCell>
    </TableRow>
  );
};
