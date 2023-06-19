import { type DragEvent, type RefObject } from 'react';
import { type MRT_Cell, type MRT_TableInstance } from '../types';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';

interface Props<TData extends Record<string, any>> {
  cell: MRT_Cell<TData>;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyRowGrabHandle = <TData extends Record<string, any>>({
  cell,
  rowRef,
  table,
}: Props<TData>) => {
  const {
    options: { muiRowDragHandleProps },
  } = table;
  const { row } = cell;

  const iconButtonProps =
    muiRowDragHandleProps instanceof Function
      ? muiRowDragHandleProps({ row, table })
      : muiRowDragHandleProps;

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
