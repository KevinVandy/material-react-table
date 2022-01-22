import React, { FC } from 'react';
import {
  TableCell as MuiTableCell,
  TableSortLabel,
  styled,
  Divider,
} from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_FilterTextfield } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleHeadMenuButton } from '../buttons/MRT_ToggleTableHeadMenuButton';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

const TableCellContents = styled('div')({
  display: 'grid',
});

const TableCellText = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Props {
  column: HeaderGroup;
  index: number;
}

export const MRT_TableHeadCell: FC<Props> = ({ column, index }) => {
  const { enableFiltering, tableInstance, OverrideTableHeadCellComponent } =
    useMaterialReactTable();

  if (OverrideTableHeadCellComponent) {
    return <>{OverrideTableHeadCellComponent(column, tableInstance)}</>;
  }

  const isParentHeader = (column?.columns?.length ?? 0) > 0;
  const isLastColumn =
    (!isParentHeader && index === tableInstance.visibleColumns.length - 1) ||
    (isParentHeader && index === column.headers.length - 1);

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      {...column.getHeaderProps()}
    >
      <TableCellContents {...column.getResizerProps()}>
        <TableCellText>
          <span {...column.getSortByToggleProps()}>
            {column.render('Header')}
            {!isParentHeader && column.canSort && (
              <TableSortLabel
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
              />
            )}
          </span>
          <span style={{ display: 'flex' }}>
            {!isParentHeader && <MRT_ToggleHeadMenuButton column={column} />}
            {!isLastColumn && (
              <Divider
                flexItem
                orientation="vertical"
                style={{ borderRightWidth: '2px', borderRadius: '2px' }}
                onDoubleClick={() => tableInstance.resetResizing()}
              />
            )}
          </span>
        </TableCellText>
        {enableFiltering && column.canFilter && (
          <MRT_FilterTextfield column={column} />
        )}
      </TableCellContents>
    </TableCell>
  );
};
