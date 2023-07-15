import { type DragEvent, type RefObject } from 'react';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  row: MRT_Row<TData>;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyRowGrabHandle = <TData extends Record<string, any>>({
  row,
  rowRef,
  table,
}: Props<TData>) => {
  const {
    options: { muiRowDragHandleProps },
  } = table;

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
