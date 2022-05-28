import React, { FC, MouseEvent, useMemo } from 'react';
import { alpha, darken, lighten, Skeleton, TableCell } from '@mui/material';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import type { MRT_Cell, MRT_TableInstance } from '..';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';

interface Props {
  cell: MRT_Cell;
  enableHover?: boolean;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableBodyCell: FC<Props> = ({
  cell,
  enableHover,
  tableInstance,
}) => {
  const {
    getState,
    options: {
      editingMode,
      enableClickToCopy,
      enableEditing,
      idPrefix,
      muiTableBodyCellProps,
      muiTableBodyCellSkeletonProps,
      onCellClick,
    },
    setCurrentEditingCell,
  } = tableInstance;

  const {
    currentEditingCell,
    currentEditingRow,
    isDensePadding,
    isLoading,
    showSkeletons,
  } = getState();

  const { column, row } = cell;

  const mTableCellBodyProps =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps({ cell, tableInstance })
      : muiTableBodyCellProps;

  const mcTableCellBodyProps =
    column.muiTableBodyCellProps instanceof Function
      ? column.muiTableBodyCellProps({ cell, tableInstance })
      : column.muiTableBodyCellProps;

  const tableCellProps = {
    ...mTableCellBodyProps,
    ...mcTableCellBodyProps,
  };

  const skeletonWidth = useMemo(
    () =>
      column.columnDefType === 'display'
        ? column.getSize() / 2
        : Math.random() * (column.getSize() - column.getSize() / 3) +
          column.getSize() / 3,
    [column.columnDefType, column.getSize()],
  );

  const isEditable =
    (enableEditing || column.enableEditing) && column.enableEditing !== false;

  const isEditing =
    isEditable &&
    (editingMode === 'table' ||
      currentEditingRow?.id === row.id ||
      currentEditingCell?.id === cell.id);

  const handleDoubleClick = (_event: MouseEvent<HTMLTableCellElement>) => {
    if (
      (enableEditing || column.enableEditing) &&
      column.enableEditing !== false &&
      editingMode === 'cell'
    ) {
      setCurrentEditingCell(cell);
      setTimeout(() => {
        const textField = document.getElementById(
          `mrt-${idPrefix}-edit-cell-text-field-${cell.id}`,
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
      onClick={(event: MouseEvent<HTMLTableCellElement>) =>
        onCellClick?.({ event, cell, tableInstance })
      }
      onDoubleClick={handleDoubleClick}
      {...tableCellProps}
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
        maxWidth: `min(${column.getSize()}px, fit-content)`,
        minWidth: `max${column.getSize()}px, ${column.minSize}px`,
        p: isDensePadding
          ? column.columnDefType === 'display'
            ? '0 0.5rem'
            : '0.5rem'
          : column.columnDefType === 'display'
          ? '0.5rem 0.75rem'
          : '1rem',
        pl:
          column.id === 'mrt-expand'
            ? `${row.depth + (isDensePadding ? 0.5 : 0.75)}rem`
            : undefined,
        position: column.getIsPinned() ? 'sticky' : 'relative',
        right:
          column.getIsPinned() === 'right' ? `${getTotalRight()}px` : undefined,
        transition: 'all 0.2s ease-in-out',
        whiteSpace: isDensePadding ? 'nowrap' : 'normal',
        width: column.getSize(),
        zIndex: column.getIsPinned() ? 1 : undefined,
        '&:hover': {
          backgroundColor: enableHover
            ? theme.palette.mode === 'dark'
              ? `${lighten(theme.palette.background.default, 0.13)} !important`
              : `${darken(theme.palette.background.default, 0.07)} !important`
            : undefined,
        },
        ...(tableCellProps?.sx as any),
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
        ) : column.columnDefType === 'display' ? (
          column.columnDef.Cell?.({ cell, tableInstance })
        ) : cell.getIsPlaceholder() ||
          (row.getIsGrouped() &&
            column.id !==
              row.groupingColumnId) ? null : cell.getIsAggregated() ? (
          cell.renderAggregatedCell()
        ) : isEditing ? (
          <MRT_EditCellTextField cell={cell} tableInstance={tableInstance} />
        ) : (enableClickToCopy || column.enableClickToCopy) &&
          column.enableClickToCopy !== false ? (
          <>
            <MRT_CopyButton cell={cell} tableInstance={tableInstance}>
              <>
                {cell.column.columnDef?.Cell?.({ cell, tableInstance }) ??
                  cell.renderCell()}
              </>
            </MRT_CopyButton>
            {row.getIsGrouped() && <> ({row.subRows?.length})</>}
          </>
        ) : (
          <>
            {cell.column.columnDef?.Cell?.({ cell, tableInstance }) ?? cell.renderCell()}
            {row.getIsGrouped() && <> ({row.subRows?.length ?? ''})</>}
          </>
        )}
      </>
    </TableCell>
  );
};
