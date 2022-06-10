import React, { FC, MouseEvent } from 'react';
import { Collapse, TableCell, TableRow } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableDetailPanel: FC<Props> = ({ row, tableInstance }) => {
  const {
    getVisibleLeafColumns,
    options: {
      muiTableBodyRowProps,
      muiTableDetailPanelProps,
      onMrtDetailPanelClick,
      renderDetailPanel,
    },
  } = tableInstance;

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, tableInstance })
      : muiTableBodyRowProps;

  const tableCellProps =
    muiTableDetailPanelProps instanceof Function
      ? muiTableDetailPanelProps({ row, tableInstance })
      : muiTableDetailPanelProps;

  return (
    <TableRow {...tableRowProps}>
      <TableCell
        colSpan={getVisibleLeafColumns().length}
        onClick={(event: MouseEvent<HTMLTableCellElement>) =>
          onMrtDetailPanelClick?.({ event, row, tableInstance })
        }
        {...tableCellProps}
        sx={{
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          pb: row.getIsExpanded() ? '1rem' : 0,
          pt: row.getIsExpanded() ? '1rem' : 0,
          transition: 'all 0.2s ease-in-out',
          width: `${tableInstance.getTotalSize()}px`,
          ...tableCellProps?.sx,
        }}
      >
        <Collapse in={row.getIsExpanded()}>
          {renderDetailPanel?.({ row, tableInstance })}
        </Collapse>
      </TableCell>
    </TableRow>
  );
};
