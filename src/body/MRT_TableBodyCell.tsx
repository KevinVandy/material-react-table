import React, {
  DragEvent,
  FC,
  MouseEvent,
  RefObject,
  useEffect,
  useState,
} from 'react';
import {
  alpha,
  darken,
  lighten,
  Skeleton,
  TableCell,
  useTheme,
} from '@mui/material';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import type { MRT_Cell, MRT_TableInstance } from '..';
import { MRT_TableBodyRowGrabHandle } from './MRT_TableBodyRowGrabHandle';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';

interface Props {
  cell: MRT_Cell;
  enableHover?: boolean;
  rowIndex: number;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance;
}

export const MRT_TableBodyCell: FC<Props> = ({
  cell,
  enableHover,
  rowIndex,
  rowRef,
  table,
}) => {
  const theme = useTheme();
  const {
    getState,
    options: {
      editingMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableEditing,
      enableGrouping,
      enablePagination,
      enableRowNumbers,
      muiTableBodyCellProps,
      muiTableBodyCellSkeletonProps,
      rowNumberMode,
    },
    refs: { editInputRefs },
    setEditingCell,
    setHoveredColumn,
  } = table;
  const {
    draggingColumn,
    editingCell,
    editingRow,
    hoveredColumn,
    density,
    isLoading,
    showSkeletons,
  } = getState();
  const { column, row } = cell;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const mTableCellBodyProps =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps({ cell, column, row, table })
      : muiTableBodyCellProps;

  const mcTableCellBodyProps =
    columnDef.muiTableBodyCellProps instanceof Function
      ? columnDef.muiTableBodyCellProps({ cell, table })
      : columnDef.muiTableBodyCellProps;

  const tableCellProps = {
    ...mTableCellBodyProps,
    ...mcTableCellBodyProps,
  };

  const isEditable =
    (enableEditing || columnDef.enableEditing) &&
    columnDef.enableEditing !== false;

  const isEditing =
    isEditable &&
    editingMode !== 'modal' &&
    (editingMode === 'table' ||
      editingRow?.id === row.id ||
      editingCell?.id === cell.id);

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
    [isLoading, showSkeletons],
  );

  const handleDoubleClick = (event: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDoubleClick?.(event);
    if (
      (enableEditing || columnDef.enableEditing) &&
      columnDef.enableEditing !== false &&
      editingMode === 'cell'
    ) {
      setEditingCell(cell);
      queueMicrotask(() => {
        const textField = editInputRefs.current[column.id];
        if (textField) {
          textField.focus();
          textField.select();
        }
      });
    }
  };

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
        borderBottom:
          row.index ===
          (enablePagination
            ? table.getRowModel()
            : table.getPrePaginationRowModel()
          ).rows.length -
            1
            ? draggingBorder
            : undefined,
      }
    : undefined;

  return (
    <TableCell
      {...tableCellProps}
      onDragEnter={handleDragEnter}
      onDoubleClick={handleDoubleClick}
      sx={(theme) => ({
        backgroundColor: column.getIsPinned()
          ? alpha(lighten(theme.palette.background.default, 0.04), 0.95)
          : undefined,
        boxShadow: getIsLastLeftPinnedColumn()
          ? `4px 0 4px -2px ${alpha(theme.palette.common.black, 0.1)}`
          : getIsFirstRightPinnedColumn()
          ? `-4px 0 4px -2px ${alpha(theme.palette.common.black, 0.1)}`
          : undefined,
        cursor: isEditable && editingMode === 'cell' ? 'pointer' : 'text',
        left:
          column.getIsPinned() === 'left'
            ? `${column.getStart('left')}px`
            : undefined,
        opacity:
          draggingColumn?.id === column.id || hoveredColumn?.id === column.id
            ? 0.5
            : 1,
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
        position: column.getIsPinned() ? 'sticky' : 'relative',
        right:
          column.getIsPinned() === 'right' ? `${getTotalRight()}px` : undefined,
        textOverflow: columnDefType !== 'display' ? 'ellipsis' : undefined,
        transition: 'all 0.2s ease-in-out',
        whiteSpace: density === 'compact' ? 'nowrap' : 'normal',
        zIndex:
          draggingColumn?.id === column.id
            ? 2
            : column.getIsPinned()
            ? 1
            : undefined,
        '&:hover': {
          backgroundColor:
            enableHover &&
            enableEditing &&
            columnDef.enableEditing !== false &&
            ['table', 'cell'].includes(editingMode ?? '')
              ? theme.palette.mode === 'dark'
                ? `${lighten(theme.palette.background.default, 0.2)} !important`
                : `${darken(theme.palette.background.default, 0.1)} !important`
              : undefined,
        },
        ...(tableCellProps?.sx instanceof Function
          ? tableCellProps.sx(theme)
          : (tableCellProps?.sx as any)),
        ...draggingBorders,
        maxWidth: `min(${column.getSize()}px, fit-content)`,
        minWidth: `max(${column.getSize()}px, ${columnDef.minSize ?? 30}px)`,
        width: column.getSize(),
      })}
    >
      <>
        {cell.getIsPlaceholder() ? null : isLoading || showSkeletons ? (
          <Skeleton
            animation="wave"
            height={20}
            width={skeletonWidth}
            {...muiTableBodyCellSkeletonProps}
          />
        ) : enableRowNumbers &&
          rowNumberMode === 'static' &&
          column.id === 'mrt-row-numbers' ? (
          rowIndex + 1
        ) : column.id === 'mrt-row-drag' ? (
          <MRT_TableBodyRowGrabHandle
            cell={cell}
            rowRef={rowRef}
            table={table}
          />
        ) : columnDefType === 'display' &&
          (column.id === 'mrt-row-select' ||
            column.id === 'mrt-row-expand' ||
            !row.getIsGrouped()) ? (
          columnDef.Cell?.({ cell, column, row, table })
        ) : isEditing ? (
          <MRT_EditCellTextField cell={cell} table={table} />
        ) : (enableClickToCopy || columnDef.enableClickToCopy) &&
          columnDef.enableClickToCopy !== false ? (
          <MRT_CopyButton cell={cell} table={table}>
            <MRT_TableBodyCellValue cell={cell} table={table} />
          </MRT_CopyButton>
        ) : (
          <MRT_TableBodyCellValue cell={cell} table={table} />
        )}
      </>
      {cell.getIsGrouped() && !columnDef.GroupedCell && (
        <> ({row.subRows?.length})</>
      )}
    </TableCell>
  );
};
