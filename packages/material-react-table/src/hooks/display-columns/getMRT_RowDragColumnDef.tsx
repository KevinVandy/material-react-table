import { type RefObject } from 'react';
import { MRT_TableBodyRowGrabHandle } from '../../components/body/MRT_TableBodyRowGrabHandle';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const getMRT_RowDragColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> => {
  return {
    Cell: ({ row, rowRef, table }) => (
      <MRT_TableBodyRowGrabHandle
        row={row}
        rowRef={rowRef as RefObject<HTMLTableRowElement>}
        table={table}
      />
    ),
    grow: false,
    ...defaultDisplayColumnProps({
      header: 'move',
      id: 'mrt-row-drag',
      size: 60,
      tableOptions,
    }),
  };
};
