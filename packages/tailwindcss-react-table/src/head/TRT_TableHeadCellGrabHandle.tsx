import React, { DragEvent, RefObject } from 'react';
import { TRT_GrabHandleButton } from '../buttons/TRT_GrabHandleButton';
import { reorderColumn } from '../column.utils';
import type {
  TRT_Column,
  TRT_TableInstance,
} from '../TailwindCSSReactTable.types';

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
    options: { enableColumnOrdering, tableHeadCellDragHandleProps },
    setColumnOrder,
    setDraggingColumn,
    setHoveredColumn,
  } = table;
  const { columnDef } = column;
  const { hoveredColumn, draggingColumn, columnOrder } = getState();

  const mIconButtonProps =
    tableHeadCellDragHandleProps instanceof Function
      ? tableHeadCellDragHandleProps({ column, table })
      : tableHeadCellDragHandleProps;

  const mcIconButtonProps =
    columnDef.tableHeadCellDragHandleProps instanceof Function
      ? columnDef.tableHeadCellDragHandleProps({ column, table })
      : columnDef.tableHeadCellDragHandleProps;

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
