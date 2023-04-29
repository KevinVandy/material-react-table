import React, {
  DragEvent,
  memo,
  MouseEvent,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import { TRT_EditCellTextField } from '../inputs/TRT_EditCellTextField';
import { TRT_CopyButton } from '../buttons/TRT_CopyButton';
import { TRT_TableBodyRowGrabHandle } from './TRT_TableBodyRowGrabHandle';
import { TRT_TableBodyCellValue } from './TRT_TableBodyCellValue';
import {
  getCommonCellStyles,
  getIsFirstColumn,
  getIsLastColumn,
} from '../column.utils';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { TRT_Cell, TRT_TableInstance } from '../TailwindCSSReactTable.d';

interface Props {
  cell: TRT_Cell;
  measureElement?: (element: HTMLTableCellElement) => void;
  numRows: number;
  rowIndex: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: TRT_TableInstance;
  virtualCell?: VirtualItem;
}

export const TRT_TableBodyCell = ({
  cell,
  measureElement,
  numRows,
  rowIndex,
  rowRef,
  table,
  virtualCell,
}: Props) => {
  const theme = useTheme();
  const {
    getState,
    options: {
      editingMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableEditing,
      enableGrouping,
      enableRowNumbers,
      layoutMode,
      tableBodyCellProps,
      tableBodyCellSkeletonProps,
      rowNumberMode,
    },
    refs: { editInputRefs },
    setEditingCell,
    setHoveredColumn,
  } = table;
  const {
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    hoveredColumn,
    hoveredRow,
    density,
    isLoading,
    showSkeletons,
  } = getState();
  const { column, row } = cell;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const mTableCellBodyProps =
    tableBodyCellProps instanceof Function
      ? tableBodyCellProps({ cell, column, row, table })
      : tableBodyCellProps;

  const mcTableCellBodyProps =
    columnDef.tableBodyCellProps instanceof Function
      ? columnDef.tableBodyCellProps({ cell, column, row, table })
      : columnDef.tableBodyCellProps;

  const tableCellProps = {
    ...mTableCellBodyProps,
    ...mcTableCellBodyProps,
  };

  const skeletonProps =
    tableBodyCellSkeletonProps instanceof Function
      ? tableBodyCellSkeletonProps({ cell, column, row, table })
      : tableBodyCellSkeletonProps;

  const [skeletonWidth, setSkeletonWidth] = useState(0);
  useEffect(
    () =>
      setSkeletonWidth(
        isLoading || showSkeletons
          ? columnDefType === 'display'
            ? column.getSize() / 2
            : Math.round(
                Math.random() * (column.getSize() - column.getSize() / 3) +
                  column.getSize() / 3,
              )
          : 100,
      ),
    [],
  );

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
          borderBottom:
            isDraggingRow || isHoveredRow || isLastRow
              ? borderStyle
              : undefined,
          borderTop: isDraggingRow || isHoveredRow ? borderStyle : undefined,
        }
      : undefined;
  }, [draggingColumn, draggingRow, hoveredColumn, hoveredRow, rowIndex]);

  const isEditable =
    (enableEditing instanceof Function ? enableEditing(row) : enableEditing) &&
    (columnDef.enableEditing instanceof Function
      ? columnDef.enableEditing(row)
      : columnDef.enableEditing) !== false;

  const isEditing =
    isEditable &&
    editingMode !== 'modal' &&
    (editingMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id) &&
    !row.getIsGrouped();

  const handleDoubleClick = (event: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDoubleClick?.(event);
    if (isEditable && editingMode === 'cell') {
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
      onDragEnter={handleDragEnter}
      onDoubleClick={handleDoubleClick}
      sx={(theme) => ({
        alignItems: layoutMode === 'grid' ? 'center' : undefined,
        cursor: isEditable && editingMode === 'cell' ? 'pointer' : 'inherit',
        justifyContent:
          layoutMode === 'grid' ? tableCellProps.align : undefined,
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
        whiteSpace: density === 'compact' ? 'nowrap' : 'normal',
        zIndex:
          draggingColumn?.id === column.id ? 2 : column.getIsPinned() ? 1 : 0,
        '&:hover': {
          outline: ['table', 'cell'].includes(editingMode ?? '')
            ? `1px solid ${theme.palette.text.secondary}`
            : undefined,
          outlineOffset: '-1px',
          textOverflow: 'clip',
        },
        ...getCommonCellStyles({
          column,
          table,
          theme,
          tableCellProps,
        }),
        ...draggingBorders,
      })}
    >
      <>
        {cell.getIsPlaceholder() ? (
          columnDef.PlaceholderCell?.({ cell, column, row, table }) ?? null
        ) : isLoading || showSkeletons ? (
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
          <TRT_TableBodyRowGrabHandle
            cell={cell}
            rowRef={rowRef}
            table={table}
          />
        ) : columnDefType === 'display' &&
          (column.id === 'mrt-row-select' ||
            column.id === 'mrt-row-expand' ||
            !row.getIsGrouped()) ? (
          columnDef.Cell?.({
            cell,
            renderedCellValue: cell.renderValue() as any,
            column,
            row,
            table,
          })
        ) : isEditing ? (
          <TRT_EditCellTextField cell={cell} table={table} />
        ) : (enableClickToCopy || columnDef.enableClickToCopy) &&
          columnDef.enableClickToCopy !== false ? (
          <TRT_CopyButton cell={cell} table={table}>
            <TRT_TableBodyCellValue cell={cell} table={table} />
          </TRT_CopyButton>
        ) : (
          <TRT_TableBodyCellValue cell={cell} table={table} />
        )}
        {cell.getIsGrouped() && !columnDef.GroupedCell && (
          <> ({row.subRows?.length})</>
        )}
      </>
    </TableCell>
  );
};

export const Memo_TRT_TableBodyCell = memo(
  TRT_TableBodyCell,
  (prev, next) => next.cell === prev.cell,
);
