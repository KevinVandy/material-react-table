import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';

interface Props {
  column: MRT_HeaderGroup;
}

export const MRT_TableFooterCell: FC<Props> = ({ column }) => {
  const { muiTableFooterCellProps, densePadding, enableColumnResizing } =
    useMRT();

  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps(column)
      : muiTableFooterCellProps;

  const mcTableFooterCellProps =
    column.muiTableFooterCellProps instanceof Function
      ? column.muiTableFooterCellProps(column)
      : column.muiTableFooterCellProps;

  const tableCellProps = {
    ...mTableFooterCellProps,
    ...mcTableFooterCellProps,
    ...column.getFooterProps(),
    style: {
      ...column.getFooterProps().style,
      ...mTableFooterCellProps?.style,
      ...mcTableFooterCellProps?.style,
    },
  };

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      variant="head"
      {...tableCellProps}
      sx={{
        fontWeight: 'bold',
        verticalAlign: 'text-top',
        p: densePadding ? '0.5rem' : '1rem',
        transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
        ...tableCellProps?.sx,
      }}
    >
      {column.render('Footer')}
    </TableCell>
  );
};
