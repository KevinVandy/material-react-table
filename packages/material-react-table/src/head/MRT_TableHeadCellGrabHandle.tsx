import { type DragEvent, type RefObject } from 'react';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';
import { reorderColumn } from '../column.utils';
import { type MRT_Column, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  column: MRT_Column<TData>;
  table: MRT_TableInstance<TData>;
  tableHeadCellRef: RefObject<HTMLTableCellElement>;
}

export const MRT_TableHeadCellGrabHandle = <TData extends Record<string, any>>({
  column,
  table,
  tableHeadCellRef,
}: Props<TData>) => {
  const {
    getState,
    options: { enableColumnOrdering, muiColumnDragHandleProps },
    setColumnOrder,
    setDraggingColumn,
    setHoveredColumn,
  } = table;
  const { columnDef } = column;
  const { hoveredColumn, draggingColumn, columnOrder } = getState();

  const mIconButtonProps =
    muiColumnDragHandleProps instanceof Function
      ? muiColumnDragHandleProps({ column, table })
      : muiColumnDragHandleProps;

  const mcIconButtonProps =
    columnDef.muiColumnDragHandleProps instanceof Function
      ? columnDef.muiColumnDragHandleProps({ column, table })
      : columnDef.muiColumnDragHandleProps;

  const iconButtonProps = {
    ...mIconButtonProps,
    ...mcIconButtonProps,
  };

  const handleDragStart = (event: DragEvent<HTMLButtonElement>) => {
    iconButtonProps?.onDragStart?.(event);
    setDraggingColumn(column);
    event.dataTransfer.setDragImage(
      tableHeadCellRef.current as HTMLElement,
      0,
      0,
    );
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    iconButtonProps?.onDragEnd?.(event);
    if (hoveredColumn?.id === 'drop-zone') {
      column.toggleGrouping();
    } else if (
      enableColumnOrdering &&
      hoveredColumn &&
      hoveredColumn?.id !== draggingColumn?.id
    ) {
      setColumnOrder(
        reorderColumn(column, hoveredColumn as MRT_Column<TData>, columnOrder),
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
