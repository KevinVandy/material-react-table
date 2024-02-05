import { type DragEvent, type RefObject } from 'react';
import { type IconButtonProps } from '@mui/material/IconButton';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';

export interface MRT_TableBodyRowGrabHandleProps<TData extends MRT_RowData>
  extends IconButtonProps {
  row: MRT_Row<TData>;
  rowRef: RefObject<HTMLTableRowElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBodyRowGrabHandle = <TData extends MRT_RowData>({
  row,
  rowRef,
  table,
  ...rest
}: MRT_TableBodyRowGrabHandleProps<TData>) => {
  const {
    options: { muiRowDragHandleProps },
  } = table;

  const iconButtonProps = {
    ...parseFromValuesOrFunc(muiRowDragHandleProps, {
      row,
      table,
    }),
    ...rest,
  };

  const handleDragStart = (event: DragEvent<HTMLButtonElement>) => {
    iconButtonProps?.onDragStart?.(event);
    try {
      event.dataTransfer.setDragImage(rowRef.current as HTMLElement, 0, 0);
    } catch (e) {
      console.error(e);
    }
    table.setDraggingRow(row as any);
  };

  const handleDragEnd = (event: DragEvent<HTMLButtonElement>) => {
    iconButtonProps?.onDragEnd?.(event);
    table.setDraggingRow(null);
    table.setHoveredRow(null);
  };

  return (
    <MRT_GrabHandleButton
      {...iconButtonProps}
      location="row"
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      table={table}
    />
  );
};
