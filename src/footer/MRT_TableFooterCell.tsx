import React, { FC } from 'react';
import { styled, TableCell as MuiTableCell } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

interface Props {
  column: HeaderGroup;
}

export const MRT_TableFooterCell: FC<Props> = ({ column }) => {
  const { muiTableFooterCellProps, densePadding } = useMaterialReactTable();

  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps(column)
      : muiTableFooterCellProps;

  const tableCellProps = {
    ...mTableFooterCellProps,
    ...column.getFooterProps(),
    style: {
      padding: densePadding ? '0.5rem' : '1rem',
      transition: 'all 0.2s ease-in-out',
      ...column.getFooterProps().style,
      ...(mTableFooterCellProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      variant="head"
      {...tableCellProps}
    >
      {column.render('Footer')}
    </TableCell>
  );
};
