import React, { FC } from 'react';
import {
  TableCell as MuiTableCell,
  TableSortLabel,
  styled,
  Divider as MuiDivider,
  Collapse,
} from '@mui/material';
import { HeaderGroup } from 'react-table';
import { useMRT } from '../useMRT';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';

export const MRT_StyledTableHeadCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) =>
    prop !== 'densePadding' && prop !== 'enableColumnResizing',
})<{ densePadding?: boolean; enableColumnResizing?: boolean }>(
  ({ densePadding, enableColumnResizing }) => ({
    fontWeight: 'bold',
    height: '100%',
    padding: densePadding ? '0.5rem' : '1rem',
    transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
    verticalAlign: 'text-top',
  }),
);

const TableCellWrapper = styled('div')({
  alignContent: 'space-between',
  display: 'grid',
  height: '100%',
});

const TableCellTopContents = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const CellFlexItem = styled('span')({
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'nowrap',
});

const Divider = styled(MuiDivider)({
  borderRightWidth: '2px',
  borderRadius: '2px',
  maxHeight: '2rem',
});

interface Props {
  column: HeaderGroup;
}

export const MRT_TableHeadCell: FC<Props> = ({ column }) => {
  const {
    densePadding,
    disableColumnActions,
    disableFilters,
    enableColumnResizing,
    localization,
    muiTableHeadCellProps,
    showFilters,
    tableInstance,
  } = useMRT();

  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  const mTableHeadCellProps =
    muiTableHeadCellProps instanceof Function
      ? muiTableHeadCellProps(column)
      : muiTableHeadCellProps;

  const mcTableHeadCellProps =
    column.muiTableHeadCellProps instanceof Function
      ? column.muiTableHeadCellProps(column)
      : column.muiTableHeadCellProps;

  const tableCellProps = {
    ...mTableHeadCellProps,
    ...mcTableHeadCellProps,
    ...column.getHeaderProps(),
    style: {
      ...column.getHeaderProps().style,
      ...(mTableHeadCellProps?.style ?? {}),
      ...(mcTableHeadCellProps?.style ?? {}),
    },
  };

  return (
    <MRT_StyledTableHeadCell
      align={isParentHeader ? 'center' : 'left'}
      densePadding={densePadding}
      enableColumnResizing={enableColumnResizing}
      {...tableCellProps}
    >
      <TableCellWrapper>
        <TableCellTopContents
          style={{ justifyContent: isParentHeader ? 'center' : undefined }}
        >
          <CellFlexItem {...column.getSortByToggleProps()}>
            {column.render('Header')}
            {!isParentHeader && column.canSort && (
              <TableSortLabel
                aria-label={
                  column.isSorted
                    ? column.sortDescFirst
                      ? localization?.columnActionMenuItemClearSort
                      : localization?.columnActionMenuItemSortDesc
                    : localization?.columnActionMenuItemSortAsc
                }
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
              />
            )}
          </CellFlexItem>
          <CellFlexItem>
            {!disableColumnActions && !isParentHeader && (
              <MRT_ToggleColumnActionMenuButton column={column} />
            )}
            {enableColumnResizing && !isParentHeader && (
              <Divider
                flexItem
                orientation="vertical"
                onDoubleClick={() => tableInstance.resetResizing()}
                {...column.getResizerProps()}
              />
            )}
          </CellFlexItem>
        </TableCellTopContents>
        {!disableFilters && column.canFilter && (
          <Collapse in={showFilters}>
            <MRT_FilterTextField column={column} />
          </Collapse>
        )}
      </TableCellWrapper>
    </MRT_StyledTableHeadCell>
  );
};
