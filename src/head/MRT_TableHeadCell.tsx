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

const TableCellText = styled('div')(({ theme }) => ({
  borderRight: `solid 2px ${theme.palette.divider}`,
  width: '100%',
}));

interface Props {
  column: HeaderGroup;
}

export const MRT_TableHeadCell: FC<Props> = ({ column }) => {
  const { enableFiltering, tableInstance, OverrideTableHeadCellComponent } =
    useMaterialReactTable();

  if (OverrideTableHeadCellComponent) {
    return <>{OverrideTableHeadCellComponent(column, tableInstance)}</>;
  }

  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      {...column.getHeaderProps(column.getSortByToggleProps())}
    >
      <TableCellContents>
        {!isParentHeader && column.canSort ? (
          <TableCellText>
            <TableSortLabel
              active={column.isSorted}
              direction={column.isSortedDesc ? 'desc' : 'asc'}
            >
              {column.render('Header')}
            </TableSortLabel>
          </TableCellText>
        ) : (
          <TableCellText>{column.render('Header')}</TableCellText>
        )}
        {enableFiltering && column.canFilter && (
          <MRT_FilterTextfield column={column} />
        )}
      </TableCellContents>
    </TableCell>
  );
};
