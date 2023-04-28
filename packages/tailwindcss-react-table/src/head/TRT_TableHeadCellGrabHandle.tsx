import React, { DragEvent, RefObject } from 'react';
import { TRT_GrabHandleButton } from '../buttons/TRT_GrabHandleButton';
import { reorderColumn } from '../column.utils';
import type { TRT_Column, TRT_TableInstance } from '..';

interface Props {
  column: TRT_Column;
  table: TRT_TableInstance;
  tableHeadCellRef: RefObject<HTMLTableCellElement>;
}

export const TRT_TableHeadCellGrabHandle = ({
  column,
  table,
  tableHeadCellRef,
}: Props) => {
  const {
    getState,
    options: { enableColumnOrdering, muiTableHeadCellDragHandleProps },
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
        reorderColumn(column, hoveredColumn as TRT_Column, columnOrder),
      );
    }
    setDraggingColumn(null);
    setHoveredColumn(null);
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
