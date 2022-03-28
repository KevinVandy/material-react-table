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
import type { MRT_Header } from '..';

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
  header: MRT_Header;
}

export const MRT_TableHeadCell: FC<Props> = ({ header }) => {
  console.log({ header });
  const {
    disableColumnActions,
    enableColumnFilters,
    enableColumnResizing,
    icons: { FilterAltIcon, FilterAltOff },
    localization,
    muiTableHeadCellProps,
    setShowFilters,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const isParentHeader = !!header.column.columns.length;

  const mTableHeadCellProps =
    muiTableHeadCellProps instanceof Function
      ? muiTableHeadCellProps(header.column)
      : muiTableHeadCellProps;

  const mcTableHeadCellProps =
    header.column.muiTableHeadCellProps instanceof Function
      ? header.column.muiTableHeadCellProps(header.column)
      : header.column.muiTableHeadCellProps;

  const tableCellProps = {
    ...header.getHeaderProps(),
    ...mTableHeadCellProps,
    ...mcTableHeadCellProps,
  };

  const sortTooltip = !!header.column.getIsSorted()
    ? header.column.getIsSorted() === 'desc'
      ? localization.clearSort
      : localization.sortByColumnDesc.replace(
          '{column}',
          header.column.header as string,
        )
    : localization.sortByColumnAsc.replace(
        '{column}',
        header.column.header as string,
      );

  const filterType = getState()?.currentFilterTypes?.[header.id];

  const filterTooltip = !!header.column.getColumnFilterValue()
    ? localization.filteringByColumn
        .replace('{column}', String(header.column.header))
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
        .replace(
          '{filterValue}',
          header.column.getColumnFilterValue() as string,
        )
        .replace('" "', '')
    : localization.showHideFilters;

  const columnHeader = header.column.header as string;

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      {...tableCellProps}
      sx={{
        ...commonTableHeadCellStyles(
          getState().densePadding,
          enableColumnResizing,
          {
            maxWidth: header.column.maxWidth,
            minWidth: header.column.minWidth,
            width: header.column.width,
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
          {...header.column.getToggleSortingProps()}
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'nowrap',
            whiteSpace: columnHeader.length < 15 ? 'nowrap' : 'normal',
          }}
          title={undefined}
        >
          {columnHeader}
          {!isParentHeader && header.column.getCanSort() && (
            <Tooltip arrow placement="top" title={sortTooltip}>
              <TableSortLabel
                aria-label={sortTooltip}
                active={!!header.column.getIsSorted()}
                direction={
                  header.column.getIsSorted()
                    ? (header.column.getIsSorted() as 'asc' | 'desc')
                    : undefined
                }
              />
            </Tooltip>
          )}
          {!isParentHeader && !!header.column.getCanColumnFilter() && (
            <Tooltip arrow placement="top" title={filterTooltip}>
              <IconButton
                disableRipple
                onClick={(event) => {
                  event.stopPropagation();
                  setShowFilters(!getState().showFilters);
                }}
                size="small"
                sx={{
                  m: 0,
                  opacity: !!header.column.getColumnFilterValue()
                    ? 0.8
                    : 0,
                  p: '2px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    opacity: 0.8,
                  },
                }}
              >
                {getState().showFilters &&
                !header.column.getColumnFilterValue() ? (
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
            !header.column.disableColumnActions &&
            !isParentHeader && (
              <MRT_ToggleColumnActionMenuButton header={header} />
            )}
          {enableColumnResizing && !isParentHeader && (
            <Divider
              flexItem
              orientation="vertical"
              onDoubleClick={() =>
                tableInstance.resetColumnSize(header.id)
              }
              {...header.column.getResizerProps()}
              sx={{
                borderRightWidth: '2px',
                borderRadius: '2px',
                maxHeight: '2rem',
              }}
            />
          )}
        </Box>
      </Box>
      {enableColumnFilters && header.column.getCanColumnFilter() && (
        <Collapse in={getState().showFilters}>
          <MRT_FilterTextField header={header} />
        </Collapse>
      )}
    </TableCell>
  );
};
