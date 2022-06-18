import React, { FC, MouseEvent, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { alpha, darken, lighten, Skeleton, TableCell } from '@mui/material';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';
import { reorderColumn } from '../utils';
import type { MRT_Cell, MRT_Column, MRT_TableInstance } from '..';

interface Props {
  cell: MRT_Cell;
  enableHover?: boolean;
  rowIndex: number;
  instance: MRT_TableInstance;
}

export const MRT_TableBodyCell: FC<Props> = ({
  cell,
  enableHover,
  rowIndex,
  instance,
}) => {
  const {
    getState,
    options: {
      editingMode,
      enableClickToCopy,
      enableColumnOrdering,
      enableEditing,
      enableRowNumbers,
      muiTableBodyCellProps,
      muiTableBodyCellSkeletonProps,
      onCellClick,
      rowNumberMode,
      tableId,
    },
    setColumnOrder,
    setCurrentEditingCell,
  } = instance;

  const {
    columnOrder,
    currentEditingCell,
    currentEditingRow,
    density,
    isLoading,
    showSkeletons,
  } = getState();

  const { column, row } = cell;

  const { columnDef, columnDefType } = column;

  const [, dropRef] = useDrop({
    accept: 'column',
    drop: (movingColumn: MRT_Column) =>
      reorderColumn(movingColumn, column, columnOrder, setColumnOrder),
  });

  const mTableCellBodyProps =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps({ cell, instance })
      : muiTableBodyCellProps;

  const mcTableCellBodyProps =
    columnDef.muiTableBodyCellProps instanceof Function
      ? columnDef.muiTableBodyCellProps({ cell, instance })
      : columnDef.muiTableBodyCellProps;

  const tableCellProps = {
    ...mTableCellBodyProps,
    ...mcTableCellBodyProps,
  };

  const skeletonWidth = useMemo(
    () =>
      columnDefType === 'display'
        ? column.getSize() / 2
        : Math.random() * (column.getSize() - column.getSize() / 3) +
          column.getSize() / 3,
    [columnDefType, column.getSize()],
  );

  const isEditable =
    (enableEditing || columnDef.enableEditing) &&
    columnDef.enableEditing !== false;

  const isEditing =
    isEditable &&
    (editingMode === 'table' ||
      currentEditingRow?.id === row.id ||
      currentEditingCell?.id === cell.id);

  const handleDoubleClick = (_event: MouseEvent<HTMLTableCellElement>) => {
    if (
      (enableEditing || columnDef.enableEditing) &&
      columnDef.enableEditing !== false &&
      editingMode === 'cell'
    ) {
      setCurrentEditingCell(cell);
      setTimeout(() => {
        const textField = document.getElementById(
          `mrt-${tableId}-edit-cell-text-field-${cell.id}`,
        ) as HTMLInputElement;
        if (textField) {
          textField.focus();
          textField.select();
        }
      }, 200);
    }
  };

  const getIsLastLeftPinnedColumn = () => {
    return (
      column.getIsPinned() === 'left' &&
      instance.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
    );
  };

  const getIsFirstRightPinnedColumn = () => {
    return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
  };

  const getTotalRight = () => {
    return (
      (instance.getRightLeafHeaders().length - 1 - column.getPinnedIndex()) *
      150
    );
  };

  return (
    <TableCell
      onClick={(event: MouseEvent<HTMLTableCellElement>) =>
        onCellClick?.({ event, cell, instance })
      }
      onDoubleClick={handleDoubleClick}
      {...tableCellProps}
      ref={
        columnDefType === 'data' && enableColumnOrdering ? dropRef : undefined
      }
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
          column.id === 'mrt-expand'
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
        zIndex: column.getIsPinned() ? 1 : undefined,
        '&:hover': {
          backgroundColor:
            enableHover && enableEditing && editingMode !== 'row'
              ? theme.palette.mode === 'dark'
                ? `${lighten(
                    theme.palette.background.default,
                    0.13,
                  )} !important`
                : `${darken(theme.palette.background.default, 0.07)} !important`
              : undefined,
        },
        ...(tableCellProps?.sx as any),
        maxWidth: `min(${column.getSize()}px, fit-content)`,
        minWidth: `max(${column.getSize()}px, ${columnDef.minSize ?? 30}px)`,
        width: column.getSize(),
      })}
    >
      <>
        {isLoading || showSkeletons ? (
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
        ) : columnDefType === 'display' ? (
          columnDef.Cell?.({ cell, instance })
        ) : cell.getIsPlaceholder() ||
          (row.getIsGrouped() &&
            column.id !==
              row.groupingColumnId) ? null : cell.getIsAggregated() ? (
          columnDef.AggregatedCell?.({ cell, instance }) ??
          cell.renderAggregatedCell()
        ) : isEditing ? (
          <MRT_EditCellTextField cell={cell} instance={instance} />
        ) : (enableClickToCopy || columnDef.enableClickToCopy) &&
          columnDef.enableClickToCopy !== false ? (
          <>
            <MRT_CopyButton cell={cell} instance={instance}>
              <>{columnDef?.Cell?.({ cell, instance }) ?? cell.renderCell()}</>
            </MRT_CopyButton>
            {row.getIsGrouped() && <> ({row.subRows?.length})</>}
          </>
        ) : (
          <>
            {columnDef?.Cell?.({ cell, instance }) ?? cell.renderCell()}
            {row.getIsGrouped() && <> ({row.subRows?.length ?? ''})</>}
          </>
        )}
      </>
    </TableCell>
  );
};
