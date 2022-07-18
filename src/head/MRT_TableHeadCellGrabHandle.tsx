import React, { DragEvent, FC, RefObject } from 'react';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { reorderColumn } from '../column.utils';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  column: MRT_Column;
  table: MRT_TableInstance;
  tableHeadCellRef: RefObject<HTMLTableCellElement>;
}

export const MRT_TableHeadCellGrabHandle: FC<Props> = ({
  column,
  table,
  tableHeadCellRef,
}) => {
  const {
    getState,
    options: {
      enableColumnOrdering,
      muiTableHeadCellDragHandleProps,
      onColumnDrop,
    },
    setColumnOrder,
    setCurrentDraggingColumn,
    setCurrentHoveredColumn,
  } = table;
  const { columnDef } = column;
  const { currentHoveredColumn, currentDraggingColumn, columnOrder } =
    getState();

  const mIconButtonProps =
    muiTableHeadCellDragHandleProps instanceof Function
      ? muiTableHeadCellDragHandleProps({ column, table })
      : muiTableHeadCellDragHandleProps;

  const mcIconButtonProps =
    columnDef.muiTableHeadCellDragHandleProps instanceof Function
      ? columnDef.muiTableHeadCellDragHandleProps({ column, table })
      : columnDef.muiTableHeadCellDragHandleProps;

  const iconButtonProps = {
    ...mIconButtonProps,
    ...mcIconButtonProps,
  };

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    setCurrentDraggingColumn(column);
    e.dataTransfer.setDragImage(tableHeadCellRef.current as HTMLElement, 0, 0);
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    onColumnDrop?.({
      event,
      draggedColumn: column,
      targetColumn: currentHoveredColumn,
    });
    if (
      enableColumnOrdering &&
      currentHoveredColumn &&
      currentHoveredColumn?.id !== currentDraggingColumn?.id
    ) {
      setColumnOrder(reorderColumn(column, currentHoveredColumn, columnOrder));
    }
    setCurrentDraggingColumn(null);
    setCurrentHoveredColumn(null);
  };

  return (
    <MRT_GrabHandleButton
      iconButtonProps={iconButtonProps}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      table={table}
    />
  );
};
