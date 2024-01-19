import { useMemo } from 'react';
import { MRT_TableBodyRowPinButton } from '../../components/body/MRT_TableBodyRowPinButton';
import {
  type MRT_ColumnDef,
  type MRT_DisplayColumnIds,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const useMRT_RowPinningColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  const id: MRT_DisplayColumnIds = 'mrt-row-pin';
  const { columnOrder } = tableOptions.state;

  return useMemo(() => {
    if (columnOrder?.includes(id)) {
      return {
        Cell: ({ row, table }) => (
          <MRT_TableBodyRowPinButton row={row} table={table} />
        ),
        ...defaultDisplayColumnProps({ header: 'pin', id, tableOptions }),
      };
    }
    return null;
  }, [columnOrder]);
};
