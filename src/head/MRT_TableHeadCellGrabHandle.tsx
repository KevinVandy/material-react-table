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
    setDraggingColumn,
    setHoveredColumn,
  } = table;
  const { columnDef } = column;
  const { hoveredColumn, draggingColumn, columnOrder } = getState();

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
    setDraggingColumn(column);
    e.dataTransfer.setDragImage(tableHeadCellRef.current as HTMLElement, 0, 0);
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    onColumnDrop?.({
      event,
      draggedColumn: column,
      targetColumn: hoveredColumn,
    });
    if (hoveredColumn?.id === 'drop-zone') {
      column.toggleGrouping();
    } else if (
      enableColumnOrdering &&
      hoveredColumn &&
      hoveredColumn?.id !== draggingColumn?.id
    ) {
      setColumnOrder(
        reorderColumn(column, hoveredColumn as MRT_Column, columnOrder),
      );
    }
    setDraggingColumn(null);
    setHoveredColumn(null);
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
