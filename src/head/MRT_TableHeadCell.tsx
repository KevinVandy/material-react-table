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

export const commonTableHeadCellStyles = ({
  isDensePadding,
  enableColumnResizing,
  widths,
  isDisplayColumn,
}: {
  isDensePadding: boolean;
  isDisplayColumn?: boolean;
  enableColumnResizing?: boolean;
  widths?: {
    maxWidth?: CSSProperties['maxWidth'];
    minWidth?: CSSProperties['minWidth'];
    width?: CSSProperties['width'];
  };
}) => ({
  fontWeight: 'bold',
  height: '100%',
  p: isDensePadding
    ? isDisplayColumn
      ? '0'
      : '0.5rem'
    : isDisplayColumn
    ? '0.5rem'
    : '1rem',
  pt: isDensePadding ? '0.75rem' : '1.25rem',
  transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
  verticalAlign: 'text-top',
  ...widths,
});

interface Props {
  header: MRT_Header;
}

export const MRT_TableHeadCell: FC<Props> = ({ header }) => {
  const {
    enableColumnActions,
    enableColumnFilters,
    enableColumnResizing,
    enableSorting,
    icons: { FilterAltIcon, FilterAltOff },
    localization,
    muiTableHeadCellProps,
    setShowFilters,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { isDensePadding, showFilters } = getState();

  const isParentHeader = !!header.column.columns?.length;

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

  // const filterType = getState()?.currentFilterTypes?.[header.id];

  const filterTooltip = '';
  // !!header.column.getColumnFilterValue()
  //   ? localization.filteringByColumn
  //       .replace('{column}', String(header.column.header))
  //       .replace(
  //         '{filterType}',
  //         filterType instanceof Function
  //           ? ''
  //           : // @ts-ignore
  //             localization[
  //               `filter${
  //                 filterType.charAt(0).toUpperCase() + filterType.slice(1)
  //               }`
  //             ],
  //       )
  //       .replace(
  //         '{filterValue}',
  //         header.column.getColumnFilterValue() as string,
  //       )
  //       .replace('" "', '')
  //   : localization.showHideFilters;

  const headerElement =
    header.column?.Header?.({
      header,
      tableInstance,
    }) ?? header.column.header;

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      {...tableCellProps}
      sx={{
        ...commonTableHeadCellStyles({
          isDensePadding,
          isDisplayColumn: header.column.isDisplayColumn,
          enableColumnResizing,
          widths: {
            maxWidth: header.column.maxWidth,
            minWidth: header.column.minWidth,
            width: header.column.width,
          },
        }),
        //@ts-ignore
        ...tableCellProps?.sx,
      }}
    >
      {header.column.isDisplayColumn ? (
        headerElement
      ) : (
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
              cursor: enableSorting ? 'pointer' : undefined,
              display: 'flex',
              flexWrap: 'nowrap',
              whiteSpace:
                header.column.header.length < 15 ? 'nowrap' : 'normal',
            }}
            title={undefined}
          >
            {headerElement}
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
            {!isParentHeader &&
              enableColumnFilters &&
              !!header.column.getCanColumnFilter() && (
                <Tooltip arrow placement="top" title={filterTooltip}>
                  <IconButton
                    disableRipple
                    onClick={(event) => {
                      event.stopPropagation();
                      setShowFilters(!showFilters);
                    }}
                    size="small"
                    sx={{
                      m: 0,
                      opacity: !!header.column.getColumnFilterValue() ? 0.8 : 0,
                      p: '2px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        opacity: 0.8,
                      },
                    }}
                  >
                    {showFilters && !header.column.getColumnFilterValue() ? (
                      <FilterAltOff fontSize="small" />
                    ) : (
                      <FilterAltIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              )}
          </Box>
          <Box
            sx={{ alignItems: 'center', display: 'flex', flexWrap: 'nowrap' }}
          >
            {(enableColumnActions || header.column.enableColumnActions) &&
              !isParentHeader && (
                <MRT_ToggleColumnActionMenuButton header={header} />
              )}
            {enableColumnResizing && !isParentHeader && (
              <Divider
                flexItem
                orientation="vertical"
                onDoubleClick={() => header.resetSize()}
                sx={{
                  borderRightWidth: '2px',
                  borderRadius: '2px',
                  maxHeight: '2rem',
                }}
              />
            )}
          </Box>
        </Box>
      )}
      {!header.column.isDisplayColumn &&
        enableColumnFilters &&
        header.column.getCanColumnFilter() && (
          <Collapse in={showFilters}>
            <MRT_FilterTextField header={header} />
          </Collapse>
        )}
    </TableCell>
  );
};
