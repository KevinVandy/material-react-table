import { MRT_SelectCheckbox } from '../../components/inputs/MRT_SelectCheckbox';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const getMRT_RowSelectColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> => {
  const { enableMultiRowSelection, enableSelectAll } = tableOptions;

  return {
    Cell: ({ row, staticRowIndex, table }) => (
      <MRT_SelectCheckbox
        row={row}
        staticRowIndex={staticRowIndex}
        table={table}
      />
    ),
    Header:
      enableSelectAll && enableMultiRowSelection
        ? ({ table }) => <MRT_SelectCheckbox table={table} />
        : undefined,
    grow: false,
    ...defaultDisplayColumnProps({
      header: 'select',
      id: 'mrt-row-select',
      size: enableSelectAll ? 60 : 70,
      tableOptions,
    }),
  };
};
