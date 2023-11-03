import { type DragEvent, useMemo } from 'react';
import Box from '@mui/material/Box';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import { type Theme } from '@mui/material/styles';
import { MRT_TableHeadCellColumnActionsButton } from './MRT_TableHeadCellColumnActionsButton';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_TableHeadCellGrabHandle } from './MRT_TableHeadCellGrabHandle';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import { parseFromValuesOrFunc } from '../column.utils';
import { getCommonMRTCellStyles, getMRTTheme } from '../style.utils';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TableCellProps {
  header: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCell = <TData extends MRT_RowData>({
  header,
  table,
  ...rest
}: Props<TData>) => {
  const theme = useTheme();
  const {
    getState,
    options: {
      columnFilterDisplayMode,
      columnResizeMode,
      enableColumnActions,
      enableColumnDragging,
      enableColumnOrdering,
      enableGrouping,
      enableMultiSort,
      layoutMode,
      muiTableHeadCellProps,
    },
    refs: { tableHeadCellRefs },
    setHoveredColumn,
  } = table;
  const {
    columnSizingInfo,
    density,
    draggingColumn,
    grouping,
    hoveredColumn,
    showColumnFilters,
  } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const tableCellProps = {
    ...parseFromValuesOrFunc(muiTableHeadCellProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiTableHeadCellProps, {
      column,
      table,
    }),
    ...rest,
  };

  const { draggingBorderColor } = getMRTTheme(table, theme);

  const showColumnActions =
    (enableColumnActions || columnDef.enableColumnActions) &&
    columnDef.enableColumnActions !== false;

  const showDragHandle =
    enableColumnDragging !== false &&
    columnDef.enableColumnDragging !== false &&
    (enableColumnDragging ||
      (enableColumnOrdering && columnDef.enableColumnOrdering !== false) ||
      (enableGrouping &&
        columnDef.enableGrouping !== false &&
        !grouping.includes(column.id)));

  const headerPL = useMemo(() => {
    let pl = 0;
    if (column.getCanSort()) pl += 1;
    if (showColumnActions) pl += 1.75;
    if (showDragHandle) pl += 1.5;
    return pl;
  }, [showColumnActions, showDragHandle]);

  const draggingBorders = useMemo(() => {
    const showResizeBorder =
      columnSizingInfo.isResizingColumn === column.id &&
      columnResizeMode === 'onChange' &&
      !header.subHeaders.length;

    const borderStyle = showResizeBorder
      ? `2px solid ${draggingBorderColor} !important`
      : draggingColumn?.id === column.id
      ? `1px dashed ${theme.palette.grey[500]}`
      : hoveredColumn?.id === column.id
      ? `2px dashed ${draggingBorderColor}`
      : undefined;

    if (showResizeBorder) {
      return { borderRight: borderStyle };
    }
    const draggingBorders = borderStyle
      ? {
          borderLeft: borderStyle,
          borderRight: borderStyle,
          borderTop: borderStyle,
        }
      : undefined;

    return draggingBorders;
  }, [draggingColumn, hoveredColumn, columnSizingInfo.isResizingColumn]);

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

  const headerElement =
    parseFromValuesOrFunc(columnDef.Header, {
      column,
      header,
      table,
    }) ?? columnDef.header;

  return (
    <TableCell
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={header.colSpan}
      onDragEnter={handleDragEnter}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          tableHeadCellRefs.current[column.id] = node;
        }
      }}
      {...tableCellProps}
      sx={(theme: Theme) => ({
        '& :hover': {
          '.MuiButtonBase-root': {
            opacity: 1,
          },
        },
        flexDirection: layoutMode?.startsWith('grid') ? 'column' : undefined,
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
        ...getCommonMRTCellStyles({
          column,
          header,
          table,
          tableCellProps,
          theme,
        }),
        ...draggingBorders,
      })}
    >
      {header.isPlaceholder
        ? null
        : tableCellProps.children ?? (
            <Box
              className="Mui-TableHeadCell-Content"
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection:
                  tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
                justifyContent:
                  columnDefType === 'group' ||
                  tableCellProps?.align === 'center'
                    ? 'center'
                    : column.getCanResize()
                    ? 'space-between'
                    : 'flex-start',
                position: 'relative',
                width: '100%',
              }}
            >
              <Box
                className="Mui-TableHeadCell-Content-Labels"
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
                  overflow: columnDefType === 'data' ? 'hidden' : undefined,
                  pl:
                    tableCellProps?.align === 'center'
                      ? `${headerPL}rem`
                      : undefined,
                }}
              >
                <Box
                  className="Mui-TableHeadCell-Content-Wrapper"
                  sx={{
                    '&:hover': {
                      textOverflow: 'clip',
                    },
                    minWidth: `${Math.min(columnDef.header?.length ?? 0, 4)}ch`,
                    overflow: columnDefType === 'data' ? 'hidden' : undefined,
                    textOverflow: 'ellipsis',
                    whiteSpace:
                      (columnDef.header?.length ?? 0) < 20
                        ? 'nowrap'
                        : 'normal',
                  }}
                  title={
                    columnDefType === 'data' ? columnDef.header : undefined
                  }
                >
                  {headerElement}
                </Box>
                {column.getCanFilter() && (
                  <MRT_TableHeadCellFilterLabel header={header} table={table} />
                )}
                {column.getCanSort() && (
                  <MRT_TableHeadCellSortLabel header={header} table={table} />
                )}
              </Box>
              {columnDefType !== 'group' && (
                <Box
                  className="Mui-TableHeadCell-Content-Actions"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  {showDragHandle && (
                    <MRT_TableHeadCellGrabHandle
                      column={column}
                      table={table}
                      tableHeadCellRef={{
                        current: tableHeadCellRefs.current[column.id],
                      }}
                    />
                  )}
                  {showColumnActions && (
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
      {columnFilterDisplayMode === 'subheader' && column.getCanFilter() && (
        <MRT_TableHeadCellFilterContainer header={header} table={table} />
      )}
    </TableCell>
  );
};
