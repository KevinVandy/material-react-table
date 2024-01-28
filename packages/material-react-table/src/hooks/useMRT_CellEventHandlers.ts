import { type DragEvent, type MouseEvent, type MutableRefObject } from 'react';
import { type TableCellProps } from '@mui/material';
import {
  type MRT_Cell,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> {
  cell: MRT_Cell<TData>;
  cellRef: MutableRefObject<HTMLTableCellElement | null>;
  table: MRT_TableInstance<TData>;
  tableCellProps: TableCellProps;
}

export const useMRT_CellEventHandlers = <TData extends MRT_RowData>({
  cell,
  cellRef,
  table,
  tableCellProps,
}: Props<TData>) => {
  const {
    getState,
    options: {
      cellActionTrigger,
      enableCellActions,
      enableColumnOrdering,
      enableGrouping,
      renderCellActionMenuItems,
      renderCellActions,
    },
    setHoveredColumn,
  } = table;
  const { draggingColumn, hoveredColumn } = getState();
  const { column } = cell;
  const { columnDef } = column;

  const openCellAction = () => {
    table.setActionCell(cell);
    table.refs.actionCellRef.current = cellRef.current;
  };

  const closeCellAction = () => {
    table.setActionCell(null);
    table.refs.actionCellRef.current = null;
  };

  const handleDragEnter = (e: DragEvent<HTMLTableCellElement>) => {
    tableCellProps?.onDragEnter?.(e);
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn) {
      setHoveredColumn(
        columnDef.enableColumnOrdering !== false ? column : null,
      );
    }
  };

  const handleMouseEnter = (e: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onMouseEnter?.(e);
    if (cellActionTrigger === 'hover' && renderCellActions) {
      openCellAction();
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onMouseLeave?.(e);
    if (cellActionTrigger === 'hover' && renderCellActions) {
      closeCellAction();
    }
  };

  const handleOnClick = (e: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onMouseDown?.(e);
    if (cellActionTrigger === 'click' && renderCellActions) {
      openCellAction();
    }
  };

  const handleContextMenu = (e: MouseEvent<HTMLTableCellElement>) => {
    tableCellProps?.onContextMenu?.(e);
    if (
      enableCellActions &&
      ((cellActionTrigger === 'right-click' && renderCellActions) ||
        renderCellActionMenuItems)
    ) {
      e.preventDefault();
      openCellAction();
    }
  };

  return {
    handleContextMenu,
    handleDragEnter,
    handleMouseEnter,
    handleMouseLeave,
    handleOnClick,
  } as const;
};
