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
    options: { muiTableBodyRowDragHandleProps },
  } = table;
  const { row } = cell;

  const iconButtonProps =
    muiTableBodyRowDragHandleProps instanceof Function
      ? muiTableBodyRowDragHandleProps({ row, table })
      : muiTableBodyRowDragHandleProps;

  const handleDragStart = (event: DragEvent<HTMLButtonElement>) => {
    iconButtonProps?.onDragStart?.(event);
    event.dataTransfer.setDragImage(rowRef.current as HTMLElement, 0, 0);
    table.setDraggingRow(row as any);
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    iconButtonProps?.onDragEnd?.(event);
    table.setDraggingRow(null);
    table.setHoveredRow(null);
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
