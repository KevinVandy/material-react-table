import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_HeaderGroup } from '..';

interface Props {
  column: MRT_HeaderGroup;
}

export const MRT_TableFooterCell: FC<Props> = ({ column }) => {
  const {
    muiTableFooterCellProps,
    enableColumnResizing,
    tableInstance: { getState },
  } = useMRT();

  const isParentHeader = !!column?.columns?.length;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps(column)
      : muiTableFooterCellProps;

  const mcTableFooterCellProps =
    column.muiTableFooterCellProps instanceof Function
      ? column.muiTableFooterCellProps(column)
      : column.muiTableFooterCellProps;

  const tableCellProps = {
    ...column.getFooterGroupProps(),
    ...mTableFooterCellProps,
    ...mcTableFooterCellProps,
  };

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      variant="head"
      {...tableCellProps}
      sx={{
        fontWeight: 'bold',
        verticalAlign: 'text-top',
        p: getState().densePadding ? '0.5rem' : '1rem',
        transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
        ...tableCellProps?.sx,
      }}
    >
      {column.header}
    </TableCell>
  );
};
