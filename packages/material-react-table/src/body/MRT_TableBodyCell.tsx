import {
  type DragEvent,
  type MouseEvent,
  type RefObject,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { type VirtualItem } from '@tanstack/react-virtual';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import { MRT_TableBodyRowGrabHandle } from './MRT_TableBodyRowGrabHandle';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import {
  getCommonCellStyles,
  getIsFirstColumn,
  getIsLastColumn,
  parseFromValuesOrFunc,
} from '../column.utils';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import { type MRT_Cell, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  cell: MRT_Cell<TData>;
  measureElement?: (element: HTMLTableCellElement) => void;
  numRows: number;
  rowIndex: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
  virtualCell?: VirtualItem;
}

export const MRT_TableBodyCell = <TData extends Record<string, any>>({
  cell,
  measureElement,
  numRows,
  rowIndex,
  rowRef,
  table,
  virtualCell,
}: Props<TData>) => {
  const theme = useTheme();
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableEditing,
      enableGrouping,
      enableRowNumbers,
      layoutMode,
      muiSkeletonProps,
      muiTableBodyCellProps,
      rowNumberMode,
    },
    refs: { editInputRefs },
    setEditingCell,
    setHoveredColumn,
  } = table;
  const {
    creatingRow,
    density,
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    hoveredColumn,
    hoveredRow,
    isLoading,
    showSkeletons,
  } = getState();
  const { column, row } = cell;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const tableCellProps = {
    ...parseFromValuesOrFunc(muiTableBodyCellProps, {
      cell,
      column,
      row,
      table,
    }),
    ...parseFromValuesOrFunc(columnDef.muiTableBodyCellProps, {
      cell,
      column,
      row,
      table,
    }),
  };

  const skeletonProps = parseFromValuesOrFunc(muiSkeletonProps, {
    cell,
    column,
    row,
    table,
  });

  const [skeletonWidth, setSkeletonWidth] = useState(100);
  useEffect(() => {
    if ((!isLoading && !showSkeletons) || skeletonWidth !== 100) return;
    const size = column.getSize();
    setSkeletonWidth(
      columnDefType === 'display'
        ? size / 2
        : Math.round(Math.random() * (size - size / 3) + size / 3),
    );
  }, [isLoading, showSkeletons]);

  const draggingBorders = useMemo(() => {
    const isDraggingColumn = draggingColumn?.id === column.id;
    const isHoveredColumn = hoveredColumn?.id === column.id;
    const isDraggingRow = draggingRow?.id === row.id;
    const isHoveredRow = hoveredRow?.id === row.id;
    const isFirstColumn = getIsFirstColumn(column, table);
    const isLastColumn = getIsLastColumn(column, table);
    const isLastRow = rowIndex === numRows - 1;

    const borderStyle =
      isDraggingColumn || isDraggingRow
        ? `1px dashed ${theme.palette.text.secondary} !important`
        : isHoveredColumn || isHoveredRow
        ? `2px dashed ${theme.palette.primary.main} !important`
        : undefined;

    return borderStyle
      ? {
          borderBottom:
            isDraggingRow || isHoveredRow || isLastRow
              ? borderStyle
              : undefined,
          borderLeft:
            isDraggingColumn ||
            isHoveredColumn ||
            ((isDraggingRow || isHoveredRow) && isFirstColumn)
              ? borderStyle
              : undefined,
          borderRight:
            isDraggingColumn ||
            isHoveredColumn ||
            ((isDraggingRow || isHoveredRow) && isLastColumn)
              ? borderStyle
              : undefined,
          borderTop: isDraggingRow || isHoveredRow ? borderStyle : undefined,
        }
      : undefined;
  }, [draggingColumn, draggingRow, hoveredColumn, hoveredRow, rowIndex]);

  const isEditable =
    parseFromValuesOrFunc(enableEditing, row) &&
    parseFromValuesOrFunc(columnDef.enableEditing, row) !== false;

  const isEditing =
    isEditable &&
    !['custom', 'modal'].includes(editDisplayMode as string) &&
    (editDisplayMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id) &&
    !row.getIsGrouped();

  const isCreating =
    isEditable && createDisplayMode === 'row' && creatingRow?.id === row.id;

  const handleDoubleClick = (event: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDoubleClick?.(event);
    if (isEditable && editDisplayMode === 'cell') {
      setEditingCell(cell);
      queueMicrotask(() => {
        const textField = editInputRefs.current[column.id];
        if (textField) {
          textField.focus();
          textField.select?.();
        }
      });
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDragEnter?.(e);
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn) {
      setHoveredColumn(
        columnDef.enableColumnOrdering !== false ? column : null,
      );
    }
  };

  return (
    <TableCell
      data-index={virtualCell?.index}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          measureElement?.(node);
        }
      }}
      {...tableCellProps}
      onDoubleClick={handleDoubleClick}
      onDragEnter={handleDragEnter}
      sx={(theme) => ({
        '&:hover': {
          outline: ['cell', 'table'].includes(editDisplayMode ?? '')
            ? `1px solid ${theme.palette.text.secondary}`
            : undefined,
          outlineOffset: '-1px',
          textOverflow: 'clip',
        },
        alignItems: layoutMode?.startsWith('grid') ? 'center' : undefined,
        cursor:
          isEditable && editDisplayMode === 'cell' ? 'pointer' : 'inherit',
        justifyContent:
          layoutMode?.startsWith('grid') ? tableCellProps.align : undefined,
        overflow: 'hidden',
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
        pl:
          column.id === 'mrt-row-expand'
            ? `${
                row.depth +
                (density === 'compact'
                  ? 0.5
                  : density === 'comfortable'
                  ? 0.75
                  : 1.25)
              }rem`
            : undefined,
        textOverflow: columnDefType !== 'display' ? 'ellipsis' : undefined,
        whiteSpace:
          row.getIsPinned() || density === 'compact' ? 'nowrap' : 'normal',
        zIndex:
          draggingColumn?.id === column.id ? 2 : column.getIsPinned() ? 1 : 0,
        ...getCommonCellStyles({
          column,
          table,
          tableCellProps,
          theme,
        }),
        ...draggingBorders,
      })}
    >
      <>
        {cell.getIsPlaceholder() ? (
          columnDef.PlaceholderCell?.({ cell, column, row, table }) ?? null
        ) : (isLoading || showSkeletons) && cell.getValue() === null ? (
          <Skeleton
            animation="wave"
            height={20}
            width={skeletonWidth}
            {...skeletonProps}
          />
        ) : enableRowNumbers &&
          rowNumberMode === 'static' &&
          column.id === 'mrt-row-numbers' ? (
          rowIndex + 1
        ) : column.id === 'mrt-row-drag' ? (
          <MRT_TableBodyRowGrabHandle row={row} rowRef={rowRef} table={table} />
        ) : columnDefType === 'display' &&
          (column.id === 'mrt-row-select' ||
            column.id === 'mrt-row-expand' ||
            !row.getIsGrouped()) ? (
          columnDef.Cell?.({
            cell,
            column,
            renderedCellValue: cell.renderValue() as any,
            row,
            table,
          })
        ) : isCreating || isEditing ? (
          <MRT_EditCellTextField cell={cell} table={table} />
        ) : (enableClickToCopy || columnDef.enableClickToCopy) &&
          columnDef.enableClickToCopy !== false ? (
          <MRT_CopyButton cell={cell} table={table}>
            <MRT_TableBodyCellValue cell={cell} table={table} />
          </MRT_CopyButton>
        ) : (
          <MRT_TableBodyCellValue cell={cell} table={table} />
        )}
        {cell.getIsGrouped() && !columnDef.GroupedCell && (
          <> ({row.subRows?.length})</>
        )}
      </>
    </TableCell>
  );
};

export const Memo_MRT_TableBodyCell = memo(
  MRT_TableBodyCell,
  (prev, next) => next.cell === prev.cell,
) as typeof MRT_TableBodyCell;
