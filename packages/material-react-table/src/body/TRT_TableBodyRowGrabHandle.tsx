import React, { DragEvent, RefObject } from 'react';
import { TRT_Cell, TRT_TableInstance } from '..';
import { TRT_GrabHandleButton } from '../buttons/TRT_GrabHandleButton';

interface Props {
  cell: TRT_Cell;
  rowRef: RefObject<HTMLTableRowElement>;
  table: TRT_TableInstance;
}

export const TRT_TableBodyRowGrabHandle = ({ cell, rowRef, table }: Props) => {
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
    <TRT_GrabHandleButton
      iconButtonProps={iconButtonProps}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      table={table}
    />
  );
};
