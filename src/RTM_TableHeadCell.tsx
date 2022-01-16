import React, { FC } from 'react';
import {
  styled,
  TableCell as MuiTableCell,
  TableSortLabel,
} from '@mui/material';
import { HeaderGroup } from 'react-table';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

interface Props {
  column: HeaderGroup;
}

export const RTM_TableHeadCell: FC<Props> = ({ column }) => {
  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
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
