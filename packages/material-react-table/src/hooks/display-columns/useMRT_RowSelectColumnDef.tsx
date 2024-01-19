import { useMemo } from 'react';
import { MRT_SelectCheckbox } from '../../components/inputs/MRT_SelectCheckbox';
import {
  type MRT_ColumnDef,
  type MRT_DisplayColumnIds,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const useMRT_RowSelectColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  const id: MRT_DisplayColumnIds = 'mrt-row-select';
  const { columnOrder } = tableOptions.state;

  return useMemo(() => {
    if (columnOrder?.includes(id)) {
      return {
        Cell: ({ row, staticRowIndex, table }) => (
          <MRT_SelectCheckbox
            row={row}
            staticRowIndex={staticRowIndex}
            table={table}
          />
        ),
        Header:
          tableOptions.enableSelectAll && tableOptions.enableMultiRowSelection
            ? ({ table }) => <MRT_SelectCheckbox selectAll table={table} />
            : undefined,
        ...defaultDisplayColumnProps({ header: 'select', id, tableOptions }),
      };
    }
    return null;
  }, [columnOrder]);
};
