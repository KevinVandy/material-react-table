import React, { FC } from 'react';
import { TableCell, TableSortLabel } from '@mui/material';
import { HeaderGroup } from 'react-table';

interface Props {
  column: HeaderGroup;
}

export const MRT_TableHeadCell: FC<Props> = ({ column }) => {
  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      style={{ fontWeight: 'bold !important' }}
      variant="head"
      {...column.getHeaderProps(column.getSortByToggleProps())}
    >
      <TableSortLabel
        active={column.isSorted}
        direction={column.isSortedDesc && column.isSortedDesc ? 'desc' : 'asc'}
      >
        {column.render('Header')}
      </TableSortLabel>
    </TableCell>
  );
};
