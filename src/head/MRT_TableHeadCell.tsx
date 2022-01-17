import React, { FC } from 'react';
import {
  TableCell as MuiTableCell,
  TableSortLabel,
  styled,
} from '@mui/material';
import { HeaderGroup } from 'react-table';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

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
      {!isParentHeader ? (
        <TableSortLabel
          active={column.isSorted}
          direction={
            column.isSortedDesc && column.isSortedDesc ? 'desc' : 'asc'
          }
        >
          {column.render('Header')}
        </TableSortLabel>
      ) : (
        column.render('Header')
      )}
    </TableCell>
  );
};
