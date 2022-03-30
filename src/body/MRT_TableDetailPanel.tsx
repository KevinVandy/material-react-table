import React, { FC, MouseEvent } from 'react';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';

interface Props {
  row: MRT_Row;
}

export const MRT_TableDetailPanel: FC<Props> = ({ row }) => {
  const {
    muiTableBodyRowProps,
    muiTableDetailPanelProps,
    onDetailPanelClick,
    renderDetailPanel,
    tableInstance: { getVisibleFlatColumns },
  } = useMRT();

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps(row)
      : muiTableBodyRowProps;

  const tableCellProps =
    muiTableDetailPanelProps instanceof Function
      ? muiTableDetailPanelProps(row)
      : muiTableDetailPanelProps;

  return (
    <TableRow {...tableRowProps}>
      <TableCell
        colSpan={getVisibleFlatColumns().length + 10}
        onClick={(event: MouseEvent<HTMLTableCellElement>) =>
          onDetailPanelClick?.(event, row)
        }
        {...tableCellProps}
        sx={{
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          pb: row.getIsExpanded() ? '1rem' : 0,
          pt: row.getIsExpanded() ? '1rem' : 0,
          transition: 'all 0.2s ease-in-out',
          ...tableCellProps?.sx,
        }}
      >
        <Collapse in={row.getIsExpanded()}>{renderDetailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};
