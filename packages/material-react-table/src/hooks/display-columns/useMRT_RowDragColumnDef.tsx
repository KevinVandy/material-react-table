import { type RefObject, useMemo } from 'react';
import { MRT_TableBodyRowGrabHandle } from '../../components/body/MRT_TableBodyRowGrabHandle';
import {
  type MRT_ColumnDef,
  type MRT_DisplayColumnIds,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const useMRT_RowDragColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  const id: MRT_DisplayColumnIds = 'mrt-row-drag';
  const { columnOrder } = tableOptions.state;

  return useMemo(() => {
    if (columnOrder?.includes(id)) {
      return {
        Cell: ({ row, rowRef, table }) => (
          <MRT_TableBodyRowGrabHandle
            row={row}
            rowRef={rowRef as RefObject<HTMLTableRowElement>}
            table={table}
          />
        ),
        ...defaultDisplayColumnProps({ header: 'move', id, tableOptions }),
      };
    }
    return null;
  }, [columnOrder]);
};
