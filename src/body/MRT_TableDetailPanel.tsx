import React, { FC } from 'react';
import { Collapse, TableCell, TableRow } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  instance: MRT_TableInstance;
}

export const MRT_TableDetailPanel: FC<Props> = ({ row, instance }) => {
  const {
    getVisibleLeafColumns,
    options: {
      muiTableBodyRowProps,
      muiTableDetailPanelProps,
      renderDetailPanel,
    },
  } = instance;

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, instance })
      : muiTableBodyRowProps;

  const tableCellProps =
    muiTableDetailPanelProps instanceof Function
      ? muiTableDetailPanelProps({ row, instance })
      : muiTableDetailPanelProps;

  return (
    <TableRow {...tableRowProps}>
      <TableCell
        colSpan={getVisibleLeafColumns().length}
        {...tableCellProps}
        sx={{
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          pb: row.getIsExpanded() ? '1rem' : 0,
          pt: row.getIsExpanded() ? '1rem' : 0,
          transition: 'all 0.2s ease-in-out',
          width: `${instance.getTotalSize()}px`,
          ...tableCellProps?.sx,
        }}
      >
        {renderDetailPanel && (
          <Collapse in={row.getIsExpanded()}>
            {renderDetailPanel({ row, instance })}
          </Collapse>
        )}
      </TableCell>
    </TableRow>
  );
};
