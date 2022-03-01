import React, { FC } from 'react';
import {
  TableCell,
  TableSortLabel,
  Divider,
  Collapse,
  Tooltip,
  Box,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';
import { MRT_HeaderGroup } from '..';

export const commonTableHeadCellStyles = (
  densePadding: boolean,
  enableColumnResizing?: boolean,
) => ({
  fontWeight: 'bold',
  height: '100%',
  p: densePadding ? '0.5rem' : '1rem',
  pt: densePadding ? '0.75rem' : '1.25rem',
  transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
  verticalAlign: 'text-top',
});

interface Props {
  column: MRT_HeaderGroup;
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
      ...mTableHeadCellProps?.style,
      ...mcTableHeadCellProps?.style,
    },
  };

  const sortTooltip = column.isSorted
    ? column.isSortedDesc
      ? localization.columnActionMenuItemClearSort
      : localization.columnActionMenuItemSortDesc?.replace(
          '{column}',
          column.Header as string,
        )
    : localization.columnActionMenuItemSortAsc?.replace(
        '{column}',
        column.Header as string,
      );

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      {...tableCellProps}
      sx={{
        ...commonTableHeadCellStyles(densePadding, enableColumnResizing),
        ...tableCellProps?.sx,
      }}
    >
      <Box
        sx={{ alignContent: 'space-between', display: 'grid', height: '100%' }}
      >
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent: isParentHeader ? 'center' : 'space-between',
            width: '100%',
          }}
        >
          <Box
            {...column.getSortByToggleProps()}
            sx={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap' }}
            title={undefined}
          >
            {column.render('Header')}
            {!isParentHeader && column.canSort && (
              <Tooltip arrow title={sortTooltip}>
                <TableSortLabel
                  aria-label={sortTooltip}
                  active={column.isSorted}
                  direction={column.isSortedDesc ? 'desc' : 'asc'}
                />
              </Tooltip>
            )}
          </Box>
          <Box
            sx={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap' }}
          >
            {!disableColumnActions && !isParentHeader && (
              <MRT_ToggleColumnActionMenuButton column={column} />
            )}
            {enableColumnResizing && !isParentHeader && (
              <Divider
                flexItem
                orientation="vertical"
                onDoubleClick={() => tableInstance.resetResizing()}
                {...column.getResizerProps()}
                sx={{
                  borderRightWidth: '2px',
                  borderRadius: '2px',
                  maxHeight: '2rem',
                }}
              />
            )}
          </Box>
        </Box>
        {!disableFilters && column.canFilter && (
          <Collapse in={showFilters}>
            <MRT_FilterTextField column={column} />
          </Collapse>
        )}
      </Box>
    </TableCell>
  );
};
