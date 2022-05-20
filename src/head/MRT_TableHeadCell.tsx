import React, { FC, MouseEvent } from 'react';
import {
  Box,
  Collapse,
  Divider,
  IconButton,
  TableCell,
  TableSortLabel,
  Theme,
  Tooltip,
  alpha,
  lighten,
} from '@mui/material';
import { MRT_FilterTextField } from '../inputs/MRT_FilterTextField';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';
import type { MRT_Header, MRT_TableInstance } from '..';
import MRT_FilterRangeFields from '../inputs/MRT_FilterRangeFields';
import { MRT_FILTER_OPTION } from '../enums';

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

  const { currentFilterFns, isDensePadding, showFilters } = getState();

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
    ...mTableHeadCellProps,
    ...mcTableHeadCellProps,
  };

  const sortTooltip = !!column.getIsSorted()
    ? column.getIsSorted() === 'desc'
      ? localization.sortedByColumnDesc.replace('{column}', column.header)
      : localization.sortedByColumnAsc.replace('{column}', column.header)
    : localization.unsorted;

  const filterFn = getState()?.currentFilterFns?.[header.id];

  const filterTooltip = !!column.getFilterValue()
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
        .replace(
          '{filterValue}',
          `"${
            Array.isArray(column.getFilterValue())
              ? (column.getFilterValue() as [string, string]).join(
                  `" ${localization.and} "`,
                )
              : (column.getFilterValue() as string)
          }"`,
        )
        .replace('" "', '')
    : localization.showHideFilters;

  const headerElement =
    column?.Header?.({
      header,
      tableInstance,
    }) ?? column.header;

  const getIsLastLeftPinnedColumn = () => {
    return (
      column.getIsPinned() === 'left' &&
      tableInstance.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
    );
  };

  const getIsFirstRightPinnedColumn = () => {
    return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
  };

  const getTotalRight = () => {
    return (
      (tableInstance.getRightLeafHeaders().length -
        1 -
        column.getPinnedIndex()) *
      150
    );
  };

  return (
    <TableCell
      align={column.columnDefType === 'group' ? 'center' : 'left'}
      colSpan={header.colSpan}
      {...tableCellProps}
      sx={(theme: Theme) => ({
        backgroundColor:
          column.getIsPinned() && column.columnDefType !== 'group'
            ? alpha(lighten(theme.palette.background.default, 0.04), 0.95)
            : 'inherit',
        backgroundImage: 'inherit',
        boxShadow: getIsLastLeftPinnedColumn()
          ? `4px 0 4px -2px ${alpha(theme.palette.common.black, 0.1)}`
          : getIsFirstRightPinnedColumn()
          ? `-4px 0 4px -2px ${alpha(theme.palette.common.black, 0.1)}`
          : undefined,
        fontWeight: 'bold',
        height: '100%',
        left:
          column.getIsPinned() === 'left'
            ? `${column.getStart('left')}px`
            : undefined,
        maxWidth: `min(${column.getSize()}px, fit-content)`,
        minWidth: `max(${column.getSize()}px, ${column.minSize}px)`,
        overflow: 'visible',
        p: isDensePadding
          ? column.columnDefType === 'display'
            ? '0 0.5rem'
            : '0.5rem'
          : column.columnDefType === 'display'
          ? '0.5rem 0.75rem'
          : '1rem',
        pb: column.columnDefType === 'display' ? 0 : undefined,
        position:
          column.getIsPinned() && column.columnDefType !== 'group'
            ? 'sticky'
            : undefined,
        pt:
          column.columnDefType === 'display'
            ? 0
            : isDensePadding
            ? '0.75rem'
            : '1.25rem',
        right:
          column.getIsPinned() === 'right' ? `${getTotalRight()}px` : undefined,
        transition: `all ${enableColumnResizing ? 0 : '0.2s'} ease-in-out`,
        verticalAlign: 'text-top',
        width: header.getSize(),
        zIndex: column.getIsResizing()
          ? 3
          : column.getIsPinned() && column.columnDefType !== 'group'
          ? 2
          : 1,
        ...(tableCellProps?.sx as any),
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
              !!column.getCanFilter() && (
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
                      opacity: !!column.getFilterValue() ? 0.8 : 0,
                      p: '2px',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        opacity: 0.8,
                      },
                    }}
                  >
                    {showFilters && !column.getFilterValue() ? (
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
              onDoubleClick={() => column.resetSize()}
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
              {...{
                onMouseDown: header.getResizeHandler,
                onTouchStart: header.getResizeHandler,
              }}
              style={{
                transform: column.getIsResizing()
                  ? `translateX(${getState().columnSizingInfo.deltaOffset}px)`
                  : 'none',
              }}
            />
          )}
        </Box>
      )}
      {column.columnDefType === 'data' && column.getCanFilter() && (
        <Collapse in={showFilters} mountOnEnter unmountOnExit>
          {currentFilterFns[column.id] === MRT_FILTER_OPTION.BETWEEN ? (
            <MRT_FilterRangeFields
              header={header}
              tableInstance={tableInstance}
            />
          ) : (
            <MRT_FilterTextField
              header={header}
              tableInstance={tableInstance}
            />
          )}
        </Collapse>
      )}
    </TableCell>
  );
};
