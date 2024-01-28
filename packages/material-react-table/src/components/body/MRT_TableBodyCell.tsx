import {
  type MouseEvent,
  type MutableRefObject,
  type RefObject,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import { MRT_TableBodyCellValue } from './MRT_TableBodyCellValue';
import { useMRT_CellEventHandlers } from '../../hooks/useMRT_CellEventHandlers';
import {
  type MRT_Cell,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { getIsFirstColumn, getIsLastColumn } from '../../utils/column.utils';
import { getCommonMRTCellStyles, getMRTTheme } from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';

interface Props<TData extends MRT_RowData> extends TableCellProps {
  cell: MRT_Cell<TData>;
  numRows?: number;
  rowRef: RefObject<HTMLTableRowElement>;
  staticColumnIndex?: number;
  staticRowIndex: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyCell = <TData extends MRT_RowData>({
  cell,
  numRows,
  rowRef,
  staticColumnIndex,
  staticRowIndex,
  table,
  ...rest
}: Props<TData>) => {
  const theme = useTheme();
  const {
    getState,
    options: {
      columnResizeDirection,
      columnResizeMode,
      createDisplayMode,
      editDisplayMode,
      enableClickToCopy,
      enableColumnPinning,
      enableEditing,
      layoutMode,
      muiSkeletonProps,
      muiTableBodyCellProps,
    },
    refs: { editInputRefs },
    setEditingCell,
  } = table;
  const {
    columnSizingInfo,
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

  const args = { cell, column, row, table };
  const tableCellProps = {
    ...parseFromValuesOrFunc(muiTableBodyCellProps, args),
    ...parseFromValuesOrFunc(columnDef.muiTableBodyCellProps, args),
    ...rest,
  };

  const skeletonProps = parseFromValuesOrFunc(muiSkeletonProps, {
    cell,
    column,
    row,
    table,
  });

  const { draggingBorderColor } = getMRTTheme(table, theme);

  const cellRef = useRef<HTMLTableCellElement>(
    null,
  ) as MutableRefObject<HTMLTableCellElement>;

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
    const isLastRow = numRows && staticRowIndex === numRows - 1;
    const isResizingColumn = columnSizingInfo.isResizingColumn === column.id;
    const showResizeBorder =
      isResizingColumn && columnResizeMode === 'onChange';

    const borderStyle = showResizeBorder
      ? `2px solid ${draggingBorderColor} !important`
      : isDraggingColumn || isDraggingRow
        ? `1px dashed ${theme.palette.grey[500]} !important`
        : isHoveredColumn || isHoveredRow || isResizingColumn
          ? `2px dashed ${draggingBorderColor} !important`
          : undefined;

    if (showResizeBorder) {
      return columnResizeDirection === 'ltr'
        ? { borderRight: borderStyle }
        : { borderLeft: borderStyle };
    }

    return borderStyle
      ? {
          borderBottom:
            isDraggingRow || isHoveredRow || (isLastRow && !isResizingColumn)
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
  }, [
    columnSizingInfo.isResizingColumn,
    draggingColumn,
    draggingRow,
    hoveredColumn,
    hoveredRow,
    staticRowIndex,
  ]);

  const isColumnPinned =
    enableColumnPinning &&
    columnDef.columnDefType !== 'group' &&
    column.getIsPinned();

  const isEditable =
    !cell.getIsPlaceholder() &&
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

  const cellValueProps = {
    cell,
    table,
  };

  const {
    handleContextMenu,
    handleDragEnter,
    handleMouseEnter,
    handleMouseLeave,
    handleOnClick,
  } = useMRT_CellEventHandlers({ cell, cellRef, table, tableCellProps });

  return (
    <TableCell
      align={theme.direction === 'rtl' ? 'right' : 'left'}
      data-index={staticColumnIndex}
      data-pinned={!!isColumnPinned || undefined}
      {...tableCellProps}
      onClick={handleOnClick}
      onContextMenu={handleContextMenu}
      onDoubleClick={handleDoubleClick}
      onDragEnter={handleDragEnter}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={(node: HTMLTableCellElement) => {
        if (node) {
          cellRef.current = node;
          if (tableCellProps?.ref) {
            //@ts-ignore
            tableCellProps.ref.current = node;
          }
        }
      }}
      sx={(theme) => ({
        '&:hover': {
          outline:
            (editDisplayMode === 'cell' && isEditable) ||
            (editDisplayMode === 'table' && (isCreating || isEditing))
              ? `1px solid ${theme.palette.grey[500]}`
              : undefined,
          outlineOffset: '-1px',
          textOverflow: 'clip',
        },
        alignItems: layoutMode?.startsWith('grid') ? 'center' : undefined,
        cursor:
          isEditable && editDisplayMode === 'cell' ? 'pointer' : 'inherit',
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
        textOverflow: columnDefType !== 'display' ? 'ellipsis' : undefined,
        whiteSpace:
          row.getIsPinned() || density === 'compact' ? 'nowrap' : 'normal',
        ...getCommonMRTCellStyles({
          column,
          table,
          tableCellProps,
          theme,
        }),
        ...draggingBorders,
      })}
    >
      {tableCellProps.children ?? (
        <>
          {cell.getIsPlaceholder() ? (
            columnDef.PlaceholderCell?.({ cell, column, row, table }) ?? null
          ) : showSkeletons !== false && (isLoading || showSkeletons) ? (
            <Skeleton
              animation="wave"
              height={20}
              width={skeletonWidth}
              {...skeletonProps}
            />
          ) : columnDefType === 'display' &&
            (['mrt-row-expand', 'mrt-row-numbers', 'mrt-row-select'].includes(
              column.id,
            ) ||
              !row.getIsGrouped()) ? (
            columnDef.Cell?.({
              cell,
              column,
              renderedCellValue: cell.renderValue() as any,
              row,
              rowRef,
              staticRowIndex,
              table,
            })
          ) : isCreating || isEditing ? (
            <MRT_EditCellTextField cell={cell} table={table} />
          ) : (enableClickToCopy || columnDef.enableClickToCopy) &&
            columnDef.enableClickToCopy !== false ? (
            <MRT_CopyButton cell={cell} table={table}>
              <MRT_TableBodyCellValue {...cellValueProps} />
            </MRT_CopyButton>
          ) : (
            <MRT_TableBodyCellValue {...cellValueProps} />
          )}
          {cell.getIsGrouped() && !columnDef.GroupedCell && (
            <> ({row.subRows?.length})</>
          )}
        </>
      )}
    </TableCell>
  );
};

export const Memo_MRT_TableBodyCell = memo(
  MRT_TableBodyCell,
  (prev, next) => next.cell === prev.cell,
) as typeof MRT_TableBodyCell;
