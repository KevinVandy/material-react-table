import React, { FC } from 'react';
import {
  TableCell,
  TableSortLabel,
  Divider,
  Collapse,
  Tooltip,
  Box,
  IconButton,
  alpha,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';
import type { MRT_Header } from '..';
import { ColumnResizerProps } from '@tanstack/react-table';

interface Props {
  header: MRT_Header;
}

export const MRT_TableHeadCell: FC<Props> = ({ header }) => {
  const {
    enableColumnActions,
    enableColumnFilters,
    enableColumnResizing,
    icons: { FilterAltIcon, FilterAltOff },
    localization,
    muiTableHeadCellProps,
    setShowFilters,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { isDensePadding, showFilters } = getState();
  const { columnDefType } = header.column;

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
      align={columnDefType === 'group' ? 'center' : 'left'}
      {...tableCellProps}
      //@ts-ignore
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.background.default,
        backgroundImage: `linear-gradient(${alpha(
          theme.palette.common.white,
          0.05,
        )},${alpha(theme.palette.common.white, 0.05)})`,
        boxShadow: `3px 0 6px ${alpha(theme.palette.common.black, 0.1)}`,
        fontWeight: 'bold',
        height: '100%',
        minWidth: `max(${header.getWidth()}, 100px)`,
        p: isDensePadding
          ? columnDefType === 'display'
            ? '0 0.5rem'
            : '0.5rem'
          : columnDefType === 'display'
          ? '0.5rem 0.75rem'
          : '1rem',
        pt:
          columnDefType === 'display'
            ? 0
            : isDensePadding
            ? '0.75rem'
            : '1.25rem',
        pb: columnDefType === 'display' ? 0 : undefined,
        transition: `all ${enableColumnResizing ? 0 : '0.2s'} ease-in-out`,
        verticalAlign: 'text-top',
        width: header.getWidth(),
        //@ts-ignore
        ...tableCellProps?.sx,
      })}
    >
      {header.isPlaceholder ? null : columnDefType === 'display' ? (
        headerElement
      ) : (
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent:
              columnDefType === 'group' ? 'center' : 'space-between',
            width: '100%',
          }}
        >
          <Box
            {...header.column.getToggleSortingProps()}
            sx={{
              alignItems: 'center',
              cursor:
                header.column.getCanSort() && columnDefType !== 'group'
                  ? 'pointer'
                  : undefined,
              display: 'flex',
              flexWrap: 'nowrap',
              whiteSpace:
                header.column.header.length < 15 ? 'nowrap' : 'normal',
            }}
            title={undefined}
          >
            {headerElement}
            {columnDefType !== 'group' && header.column.getCanSort() && (
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
            {columnDefType !== 'group' &&
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
              header.column.enableColumnActions !== false &&
              columnDefType !== 'group' && (
                <MRT_ToggleColumnActionMenuButton header={header} />
              )}
            {enableColumnResizing && columnDefType !== 'group' && (
              <Divider
                flexItem
                orientation="vertical"
                onDoubleClick={() => header.resetSize()}
                sx={(theme) => ({
                  borderRightWidth: '2px',
                  borderRadius: '2px',
                  maxHeight: '2rem',
                  cursor: 'col-resize',
                  userSelect: 'none',
                  touchAction: 'none',
                  '&:active': {
                    backgroundColor: theme.palette.secondary.dark,
                    opacity: 1,
                  },
                })}
                {...(header.getResizerProps((props: ColumnResizerProps) => ({
                  ...props,
                  style: {
                    transform: header.column.getIsResizing()
                      ? `translateX(${
                          getState().columnSizingInfo.deltaOffset
                        }px)`
                      : '',
                  },
                })) as any)}
              />
            )}
          </Box>
        </Box>
      )}
      {columnDefType === 'data' &&
        enableColumnFilters &&
        header.column.getCanColumnFilter() && (
          <Collapse in={showFilters}>
            <MRT_FilterTextField header={header} />
          </Collapse>
        )}
    </TableCell>
  );
};
