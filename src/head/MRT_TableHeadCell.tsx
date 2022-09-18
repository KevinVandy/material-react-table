import React, { DragEvent, FC, ReactNode } from 'react';
import { Box, TableCell, Theme, useTheme } from '@mui/material';
import { MRT_TableHeadCellColumnActionsButton } from './MRT_TableHeadCellColumnActionsButton';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_TableHeadCellGrabHandle } from './MRT_TableHeadCellGrabHandle';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import { getCommonCellStyles } from '../column.utils';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCell: FC<Props> = ({ header, table }) => {
  const theme = useTheme();
  const {
    getState,
    options: {
      enableColumnActions,
      enableColumnDragging,
      enableColumnOrdering,
      enableGrouping,
      enableMultiSort,
      muiTableHeadCellProps,
    },
    setHoveredColumn,
  } = table;
  const {
    density,
    draggingColumn,
    grouping,
    hoveredColumn,
    showColumnFilters,
  } = getState();
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

  const handleDragEnter = (_e: DragEvent) => {
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn && columnDefType !== 'group') {
      setHoveredColumn(
        columnDef.enableColumnOrdering !== false ? column : null,
      );
    }
  };

  const draggingBorder =
    draggingColumn?.id === column.id
      ? `1px dashed ${theme.palette.text.secondary}`
      : hoveredColumn?.id === column.id
      ? `2px dashed ${theme.palette.primary.main}`
      : undefined;

  const draggingBorders = draggingBorder
    ? {
        borderLeft: draggingBorder,
        borderRight: draggingBorder,
        borderTop: draggingBorder,
      }
    : undefined;

  const headerElement = ((columnDef?.Header instanceof Function
    ? columnDef?.Header?.({
        column,
        header,
        table,
      })
    : columnDef?.Header) ?? columnDef.header) as ReactNode;

  const tableHeadCellRef = React.useRef<HTMLTableCellElement>(null);

  return (
    <TableCell
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={header.colSpan}
      onDragEnter={handleDragEnter}
      ref={tableHeadCellRef}
      {...tableCellProps}
      sx={(theme: Theme) => ({
        fontWeight: 'bold',
        overflow: 'visible',
        p:
          density === 'compact'
            ? '0.5rem'
            : density === 'comfortable'
            ? columnDefType === 'display'
              ? '0.75rem'
              : '1rem'
            : columnDefType === 'display'
            ? '1rem 1.25rem'
            : '1.5rem',
        pb:
          columnDefType === 'display'
            ? 0
            : showColumnFilters || density === 'compact'
            ? '0.4rem'
            : '0.6rem',
        pt:
          columnDefType === 'group' || density === 'compact'
            ? '0.25rem'
            : density === 'comfortable'
            ? '.75rem'
            : '1.25rem',
        userSelect: enableMultiSort && column.getCanSort() ? 'none' : undefined,
        verticalAlign: 'top',
        zIndex:
          column.getIsResizing() || draggingColumn?.id === column.id
            ? 3
            : column.getIsPinned() && columnDefType !== 'group'
            ? 2
            : 1,
        ...getCommonCellStyles({
          column,
          header,
          table,
          tableCellProps,
          theme,
        }),
        ...draggingBorders,
      })}
    >
      {header.isPlaceholder ? null : (
        <Box
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection:
              tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
            justifyContent:
              tableCellProps?.align === 'right'
                ? 'flex-start'
                : columnDefType === 'group' ||
                  tableCellProps?.align === 'center'
                ? 'center'
                : 'space-between',
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
              flexDirection:
                tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
              flexWrap: 'nowrap',
              m: tableCellProps?.align === 'center' ? 'auto' : undefined,
              pl:
                tableCellProps?.align === 'center' && column.getCanSort()
                  ? '1rem'
                  : undefined,
              whiteSpace:
                (columnDef.header?.length ?? 0) < 24 ? 'nowrap' : 'normal',
            }}
          >
            {headerElement}
            {column.getCanSort() && (
              <MRT_TableHeadCellSortLabel
                header={header}
                table={table}
                tableCellProps={tableCellProps}
              />
            )}
            {column.getCanFilter() && (
              <MRT_TableHeadCellFilterLabel header={header} table={table} />
            )}
          </Box>
          {columnDefType !== 'group' && (
            <Box sx={{ whiteSpace: 'nowrap' }}>
              {enableColumnDragging !== false &&
                columnDef.enableColumnDragging !== false &&
                (enableColumnDragging ||
                  (enableColumnOrdering &&
                    columnDef.enableColumnOrdering !== false) ||
                  (enableGrouping &&
                    columnDef.enableGrouping !== false &&
                    !grouping.includes(column.id))) && (
                  <MRT_TableHeadCellGrabHandle
                    column={column}
                    table={table}
                    tableHeadCellRef={tableHeadCellRef}
                  />
                )}
              {(enableColumnActions || columnDef.enableColumnActions) &&
                columnDef.enableColumnActions !== false && (
                  <MRT_TableHeadCellColumnActionsButton
                    header={header}
                    table={table}
                  />
                )}
            </Box>
          )}
          {column.getCanResize() && (
            <MRT_TableHeadCellResizeHandle header={header} table={table} />
          )}
        </Box>
      )}
      {column.getCanFilter() && (
        <MRT_TableHeadCellFilterContainer header={header} table={table} />
      )}
    </TableCell>
  );
};
