import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Header } from '..';

interface Props {
  footer: MRT_Header;
}

export const MRT_TableFooterCell: FC<Props> = ({ footer }) => {
  const {
    muiTableFooterCellProps,
    enableColumnResizing,
    tableInstance: { getState },
  } = useMRT();

  const isParentHeader = !!footer.column.columns?.length;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps(footer.column)
      : muiTableFooterCellProps;

  const mcTableFooterCellProps =
    footer.column.muiTableFooterCellProps instanceof Function
      ? footer.column.muiTableFooterCellProps(footer.column)
      : footer.column.muiTableFooterCellProps;

  const tableCellProps = {
    ...footer.getFooterProps(),
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
      {footer.column.header}
    </TableCell>
  );
};
