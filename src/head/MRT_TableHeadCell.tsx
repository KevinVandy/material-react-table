import React, { FC, ReactNode, Ref } from 'react';
import { Box, TableCell, Theme, alpha, lighten } from '@mui/material';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import { MRT_TableHeadCellColumnActionsButton } from './MRT_TableHeadCellColumnActionsButton';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  dragRef?: Ref<HTMLButtonElement>;
  dropRef?: Ref<HTMLDivElement>;
  header: MRT_Header;
  table: MRT_TableInstance;
  isDragging?: boolean;
  previewRef?: Ref<HTMLTableCellElement>;
}

export const MRT_TableHeadCell: FC<Props> = ({
  dragRef,
  dropRef,
  header,
  table,
  isDragging,
  previewRef,
}) => {
  const {
    getState,
    options: {
      enableColumnActions,
      enableColumnOrdering,
      enableColumnResizing,
      enableGrouping,
      enableMultiSort,
      muiTableHeadCellProps,
    },
  } = table;
  const { density, showFilters } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const mTableHeadCellProps =
    muiTableHeadCellProps instanceof Function
      ? muiTableHeadCellProps({ column, table })
      : muiTableHeadCellProps;

  const mcTableHeadCellProps =
    columnDef.muiTableHeadCellProps instanceof Function
      ? columnDef.muiTableHeadCellProps({ column, table })
      : columnDef.muiTableHeadCellProps;

  const tableCellProps = {
    ...mTableHeadCellProps,
    ...mcTableHeadCellProps,
  };

  const headerElement = ((columnDef?.Header instanceof Function
    ? columnDef?.Header?.({
        header,
        table,
      })
    : columnDef?.Header) ?? columnDef.header) as ReactNode;

  const getIsLastLeftPinnedColumn = () => {
    return (
      column.getIsPinned() === 'left' &&
      table.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
    );
  };

  const getIsFirstRightPinnedColumn = () => {
    return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
  };

  const getTotalRight = () => {
    return (
      (table.getRightLeafHeaders().length - 1 - column.getPinnedIndex()) * 150
    );
  };

  return (
    <TableCell
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={header.colSpan}
      {...tableCellProps}
      ref={
        columnDefType === 'data' && enableColumnOrdering ? dropRef : undefined
      }
      sx={(theme: Theme) => ({
        backgroundColor:
          column.getIsPinned() && columnDefType !== 'group'
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
        overflow: 'visible',
        p:
          density === 'compact'
            ? columnDefType === 'display'
              ? '0 0.5rem'
              : '0.5rem'
            : density === 'comfortable'
            ? columnDefType === 'display'
              ? '0.5rem 0.75rem'
              : '1rem'
            : columnDefType === 'display'
            ? '1rem 1.25rem'
            : '1.5rem',
        pb: columnDefType === 'display' ? 0 : undefined,
        position:
          column.getIsPinned() && columnDefType !== 'group'
            ? 'sticky'
            : undefined,
        pt:
          columnDefType !== 'data'
            ? 0
            : density === 'compact'
            ? '0.25'
            : density === 'comfortable'
            ? '.75rem'
            : '1.25rem',
        right:
          column.getIsPinned() === 'right' ? `${getTotalRight()}px` : undefined,
        transition: `all ${enableColumnResizing ? 0 : '0.2s'} ease-in-out`,
        userSelect: enableMultiSort ? 'none' : undefined,
        verticalAlign:
          columnDefType === 'display' && showFilters ? 'center' : 'text-top',
        zIndex: column.getIsResizing()
          ? 3
          : column.getIsPinned() && columnDefType !== 'group'
          ? 2
          : 1,
        ...(tableCellProps?.sx as any),
        maxWidth: `min(${column.getSize()}px, fit-content)`,
        minWidth: `max(${column.getSize()}px, ${columnDef.minSize ?? 30}px)`,
        width: header.getSize(),
      })}
    >
      {header.isPlaceholder ? null : columnDefType === 'display' ? (
        headerElement
      ) : (
        <Box
          ref={previewRef}
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent:
              columnDefType === 'group' ? 'center' : 'space-between',
            opacity: isDragging ? 0.5 : 1,
            position: 'relative',
            width: '100%',
          }}
        >
          <Box
            onClick={column.getToggleSortingHandler()}
            sx={{
              alignItems: 'center',
              cursor:
                column.getCanSort() && columnDefType !== 'group'
                  ? 'pointer'
                  : undefined,
              display: 'flex',
              flexWrap: 'nowrap',
              whiteSpace:
                (columnDef.header?.length ?? 0) < 24 ? 'nowrap' : 'normal',
            }}
          >
            {headerElement}
            {columnDefType === 'data' && column.getCanSort() && (
              <MRT_TableHeadCellSortLabel header={header} table={table} />
            )}
            {columnDefType === 'data' && column.getCanFilter() && (
              <MRT_TableHeadCellFilterLabel header={header} table={table} />
            )}
          </Box>
          <Box sx={{ whiteSpace: 'nowrap' }}>
            {columnDefType === 'data' &&
              ((enableColumnOrdering &&
                columnDef.enableColumnOrdering !== false) ||
                (enableGrouping && columnDef.enableGrouping !== false)) && (
                <MRT_GrabHandleButton
                  ref={dragRef as Ref<HTMLButtonElement>}
                  table={table}
                />
              )}
            {(enableColumnActions || columnDef.enableColumnActions) &&
              columnDef.enableColumnActions !== false &&
              columnDefType !== 'group' && (
                <MRT_TableHeadCellColumnActionsButton
                  header={header}
                  table={table}
                />
              )}
          </Box>
          {column.getCanResize() && (
            <MRT_TableHeadCellResizeHandle header={header} table={table} />
          )}
        </Box>
      )}
      {columnDefType === 'data' && column.getCanFilter() && (
        <MRT_TableHeadCellFilterContainer header={header} table={table} />
      )}
    </TableCell>
  );
};
