import React, { FC } from 'react';
import {
  TableCell as MuiTableCell,
  TableSortLabel,
  styled,
} from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_FilterTextfield } from '../inputs/MRT_FilterTextField';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

const TableCellContents = styled('div')({
  display: 'grid',
});
interface Props {
  column: HeaderGroup;
}

export const MRT_TableHeadCell: FC<Props> = ({ column }) => {
  const { enableFiltering } = useMaterialReactTable();

  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      variant="head"
      {...column.getHeaderProps(column.getSortByToggleProps())}
    >
      <TableCellContents>
        {!isParentHeader && column.canSort ? (
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
        {enableFiltering && column.canFilter && (
          <MRT_FilterTextfield column={column} />
        )}
      </TableCellContents>
    </TableCell>
  );
};
