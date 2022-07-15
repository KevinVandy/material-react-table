import React, { DragEvent, FC, RefObject } from 'react';
import { MRT_Cell, MRT_TableInstance } from '..';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';

interface Props {
  cell: MRT_Cell;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance;
}

export const MRT_TableBodyRowGrabHandle: FC<Props> = ({
  cell,
  rowRef,
  table,
}) => {
  const {
    options: { muiTableBodyRowDragHandleProps, onRowDrop },
  } = table;

  const iconButtonProps =
    muiTableBodyRowDragHandleProps instanceof Function
      ? muiTableBodyRowDragHandleProps({ row: cell.row, table })
      : muiTableBodyRowDragHandleProps;

  const handleDragStart = (e: DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setDragImage(rowRef.current as HTMLElement, 0, 0);
    table.setCurrentDraggingRow(cell.row as any);
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    onRowDrop?.({
      event,
      draggedRow: table.getState().currentDraggingRow as any,
      targetRow: table.getState().currentHoveredRow as any,
    });
    table.setCurrentDraggingRow(null);
    table.setCurrentHoveredRow(null);
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
