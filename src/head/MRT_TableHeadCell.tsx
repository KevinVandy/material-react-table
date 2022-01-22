import React, { FC } from 'react';
import {
  TableCell as MuiTableCell,
  TableSortLabel,
  styled,
  Divider,
  Collapse,
} from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_FilterTextfield } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
});

const TableCellContents = styled('div')({
  display: 'grid',
});

const TableCellText = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

interface Props {
  column: HeaderGroup;
  index: number;
}

export const MRT_TableHeadCell: FC<Props> = ({ column, index }) => {
  const {
    OverrideTableHeadCellComponent,
    enableColumnActions,
    enableColumnResizing,
    enableFiltering,
    showFiltersInColumnHead,
    tableInstance,
  } = useMaterialReactTable();

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
      <TableCellContents>
        <TableCellText
          style={{ justifyContent: isParentHeader ? 'center' : undefined }}
        >
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
            {enableColumnActions && !isParentHeader && (
              <MRT_ToggleColumnActionMenuButton column={column} />
            )}
            {enableColumnResizing && !isLastColumn && (
              <Divider
                flexItem
                orientation="vertical"
                style={{ borderRightWidth: '2px', borderRadius: '2px' }}
                onDoubleClick={() => tableInstance.resetResizing()}
                {...column.getResizerProps()}
              />
            )}
          </span>
        </TableCellText>
        {enableFiltering && column.canFilter && (
          <Collapse in={showFiltersInColumnHead}>
            <MRT_FilterTextfield column={column} />
          </Collapse>
        )}
      </TableCellContents>
    </TableCell>
  );
};
