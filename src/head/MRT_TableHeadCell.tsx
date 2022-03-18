import React, { CSSProperties, FC } from 'react';
import {
  TableCell,
  TableSortLabel,
  Divider,
  Collapse,
  Tooltip,
  Box,
  IconButton,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';
import type { MRT_HeaderGroup } from '..';

export const commonTableHeadCellStyles = (
  densePadding: boolean,
  enableColumnResizing?: boolean,
  widths?: {
    maxWidth?: CSSProperties['maxWidth'];
    minWidth?: CSSProperties['minWidth'];
    width?: CSSProperties['width'];
  },
) => ({
  fontWeight: 'bold',
  height: '100%',
  p: densePadding ? '0.5rem' : '1rem',
  pt: densePadding ? '0.75rem' : '1.25rem',
  transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
  verticalAlign: 'text-top',
  ...widths,
});

interface Props {
  column: MRT_HeaderGroup;
}

export const MRT_TableHeadCell: FC<Props> = ({ column }) => {
  const {
    disableColumnActions,
    disableFilters,
    enableColumnResizing,
    icons: { FilterAltIcon, FilterAltOff },
    localization,
    muiTableHeadCellProps,
    setShowFilters,
    tableInstance,
  } = useMRT();

  const isParentHeader = !!column?.columns?.length;

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
      ? localization.clearSort
      : localization.sortByColumnDesc?.replace(
          '{column}',
          column.Header as string,
        )
    : localization.sortByColumnAsc?.replace(
        '{column}',
        column.Header as string,
      );

  const filterType = tableInstance.state.currentFilterTypes[column.id];

  const filterTooltip = !!column.filterValue
    ? localization.filteringByColumn
        .replace('{column}', String(column.Header))
        .replace(
          '{filterType}',
          filterType instanceof Function
            ? ''
            : // @ts-ignore
              localization[
                `filter${
                  filterType.charAt(0).toUpperCase() + filterType.slice(1)
                }`
              ],
        )
        .replace('{filterValue}', column.filterValue)
    : localization.showHideFilters;

  const columnHeader = column.render('Header') as string;

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      {...tableCellProps}
      sx={{
        ...commonTableHeadCellStyles(
          tableInstance.state.densePadding,
          enableColumnResizing,
          {
            maxWidth: column.maxWidth,
            minWidth: column.minWidth,
            width: column.width,
          },
        ),
        ...tableCellProps?.sx,
      }}
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
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'nowrap',
            whiteSpace: columnHeader.length < 15 ? 'nowrap' : 'normal',
          }}
          title={undefined}
        >
          {column.render('Header')}
          {!isParentHeader && column.canSort && (
            <Tooltip arrow placement="top" title={sortTooltip}>
              <TableSortLabel
                aria-label={sortTooltip}
                active={column.isSorted}
                direction={column.isSortedDesc ? 'desc' : 'asc'}
              />
            </Tooltip>
          )}
          {!isParentHeader && !!column.canFilter && (
            <Tooltip arrow placement="top" title={filterTooltip}>
              <IconButton
                disableRipple
                onClick={(event) => {
                  event.stopPropagation();
                  setShowFilters(!tableInstance.state.showFilters);
                }}
                size="small"
                sx={{
                  m: 0,
                  opacity: !!column.filterValue ? 0.8 : 0,
                  p: '2px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    opacity: 0.8,
                  },
                }}
              >
                {tableInstance.state.showFilters && !column.filterValue ? (
                  <FilterAltOff fontSize="small" />
                ) : (
                  <FilterAltIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap' }}>
          {!disableColumnActions &&
            !column.disableColumnActions &&
            !isParentHeader && (
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
        <Collapse in={tableInstance.state.showFilters}>
          <MRT_FilterTextField column={column} />
        </Collapse>
      )}
    </TableCell>
  );
};
