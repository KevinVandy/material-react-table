import React, { FC } from 'react';
import { styled, TableCell as MuiTableCell } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) =>
    prop !== 'densePadding' && prop !== 'enableColumnResizing',
})<{ densePadding?: boolean; enableColumnResizing?: boolean }>(
  ({ densePadding, enableColumnResizing }) => ({
    fontWeight: 'bold',
    verticalAlign: 'text-top',
    padding: densePadding ? '0.5rem' : '1rem',
    transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
  }),
);

interface Props {
  column: HeaderGroup;
}

export const MRT_TableFooterCell: FC<Props> = ({ column }) => {
  const { muiTableFooterCellProps, densePadding, enableColumnResizing } =
    useMaterialReactTable();

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
      ...(mTableFooterCellProps?.style ?? {}),
      ...(mcTableFooterCellProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      densePadding={densePadding}
      enableColumnResizing={enableColumnResizing}
      variant="head"
      {...tableCellProps}
    >
      {column.render('Footer')}
    </TableCell>
  );
};
