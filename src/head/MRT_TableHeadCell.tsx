import React, { FC, MouseEvent } from 'react';
import {
  TableCell,
  TableSortLabel,
  Divider,
  Collapse,
  Tooltip,
  Box,
  IconButton,
  alpha,
  Theme,
} from '@mui/material';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';
import type { MRT_Header, MRT_TableInstance } from '..';
import { ColumnResizerProps } from '@tanstack/react-table';

interface Props {
  header: MRT_Header;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHeadCell: FC<Props> = ({ header, tableInstance }) => {
  const {
    getState,
    options: {
      enableColumnActions,
      enableColumnFilters,
      enableColumnResizing,
      icons: { FilterAltIcon, FilterAltOff },
      localization,
      muiTableHeadCellProps,
    },
    setShowFilters,
  } = tableInstance;

  const { isDensePadding, showFilters } = getState();

  const { column } = header;

  const mTableHeadCellProps =
    muiTableHeadCellProps instanceof Function
      ? muiTableHeadCellProps({ column, tableInstance })
      : muiTableHeadCellProps;

  const mcTableHeadCellProps =
    column.muiTableHeadCellProps instanceof Function
      ? column.muiTableHeadCellProps({ column, tableInstance })
      : column.muiTableHeadCellProps;

  const tableCellProps = {
    ...header.getHeaderProps(),
    ...mTableHeadCellProps,
    ...mcTableHeadCellProps,
  };

  const sortTooltip = !!column.getIsSorted()
    ? column.getIsSorted() === 'desc'
      ? localization.sortedByColumnDesc.replace('{column}', column.header)
      : localization.sortedByColumnAsc.replace('{column}', column.header)
    : localization.unsorted;

  const filterFn = getState()?.currentFilterFns?.[header.id];

  const filterTooltip = !!column.getColumnFilterValue()
    ? localization.filteringByColumn
        .replace('{column}', String(column.header))
        .replace(
          '{filterType}',
          filterFn instanceof Function
            ? ''
            : // @ts-ignore
              localization[
                `filter${filterFn.charAt(0).toUpperCase() + filterFn.slice(1)}`
              ],
        )
        .replace('{filterValue}', column.getColumnFilterValue() as string)
        .replace('" "', '')
    : localization.showHideFilters;

  const headerElement =
    column?.Header?.({
      header,
      tableInstance,
    }) ?? column.header;

  return (
    <TableCell
      align={column.columnDefType === 'group' ? 'center' : 'left'}
      {...tableCellProps}
      //@ts-ignore
      sx={(theme: Theme) => ({
        backgroundColor: theme.palette.background.default,
        backgroundImage: `linear-gradient(${alpha(
          theme.palette.common.white,
          0.05,
        )},${alpha(theme.palette.common.white, 0.05)})`,
        fontWeight: 'bold',
        height: '100%',
        maxWidth: `min(${column.getWidth()}px, ${column.maxWidth}px)`,
        minWidth: `max(${column.getWidth()}px, ${column.minWidth}px)`,
        p: isDensePadding
          ? column.columnDefType === 'display'
            ? '0 0.5rem'
            : '0.5rem'
          : column.columnDefType === 'display'
          ? '0.5rem 0.75rem'
          : '1rem',
        pt:
          column.columnDefType === 'display'
            ? 0
            : isDensePadding
            ? '0.75rem'
            : '1.25rem',
        pb: column.columnDefType === 'display' ? 0 : undefined,
        overflow: 'visible',
        transition: `all ${enableColumnResizing ? 0 : '0.2s'} ease-in-out`,
        verticalAlign: 'text-top',
        width: header.getWidth(),
        zIndex: column.getIsResizing() ? 2 : 1,
        //@ts-ignore
        ...tableCellProps?.sx,
      })}
    >
      {header.isPlaceholder ? null : column.columnDefType === 'display' ? (
        headerElement
      ) : (
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent:
              column.columnDefType === 'group' ? 'center' : 'space-between',
            width: '100%',
          }}
        >
          <Box
            onClick={() => column.toggleSorting()}
            sx={{
              alignItems: 'center',
              cursor:
                column.getCanSort() && column.columnDefType !== 'group'
                  ? 'pointer'
                  : undefined,
              display: 'flex',
              flexWrap: 'nowrap',
              whiteSpace: column.header.length < 24 ? 'nowrap' : 'normal',
            }}
          >
            {headerElement}
            {column.columnDefType === 'data' && column.getCanSort() && (
              <Tooltip arrow placement="top" title={sortTooltip}>
                <TableSortLabel
                  aria-label={sortTooltip}
                  active={!!column.getIsSorted()}
                  direction={
                    column.getIsSorted()
                      ? (column.getIsSorted() as 'asc' | 'desc')
                      : undefined
                  }
                />
              </Tooltip>
            )}
            {column.columnDefType === 'data' &&
              enableColumnFilters &&
              !!column.getCanColumnFilter() && (
                <Tooltip arrow placement="top" title={filterTooltip}>
                  <IconButton
                    disableRipple
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                      event.stopPropagation();
                      setShowFilters(!showFilters);
                    }}
                    size="small"
                    sx={{
                      m: 0,
                      opacity: !!column.getColumnFilterValue() ? 0.8 : 0,
                      p: '2px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        opacity: 0.8,
                      },
                    }}
                  >
                    {showFilters && !column.getColumnFilterValue() ? (
                      <FilterAltOff />
                    ) : (
                      <FilterAltIcon />
                    )}
                  </IconButton>
                </Tooltip>
              )}
          </Box>
          {(enableColumnActions || column.enableColumnActions) &&
            column.enableColumnActions !== false &&
            column.columnDefType !== 'group' && (
              <MRT_ToggleColumnActionMenuButton
                header={header}
                tableInstance={tableInstance}
              />
            )}
          {column.getCanResize() && (
            <Divider
              flexItem
              orientation="vertical"
              onDoubleClick={() => header.resetSize()}
              sx={(theme: Theme) => ({
                borderRadius: '2px',
                borderRightWidth: '2px',
                cursor: 'col-resize',
                height:
                  showFilters && column.columnDefType === 'data'
                    ? '4rem'
                    : '2rem',
                opacity: 0.8,
                position: 'absolute',
                right: '1px',
                touchAction: 'none',
                transition: 'all 0.2s ease-in-out',
                userSelect: 'none',
                zIndex: 2000,
                '&:active': {
                  backgroundColor: theme.palette.info.main,
                  opacity: 1,
                },
              })}
              {...(header.getResizerProps((props: ColumnResizerProps) => ({
                ...props,
                style: {
                  transform: column.getIsResizing()
                    ? `translateX(${getState().columnSizingInfo.deltaOffset}px)`
                    : '',
                },
              })) as any)}
            />
          )}
        </Box>
      )}
      {column.columnDefType === 'data' && column.getCanColumnFilter() && (
        <Collapse in={showFilters}>
          <MRT_FilterTextField header={header} tableInstance={tableInstance} />
        </Collapse>
      )}
    </TableCell>
  );
};
