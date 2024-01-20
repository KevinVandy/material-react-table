import { MRT_TableBodyRowPinButton } from '../../components/body/MRT_TableBodyRowPinButton';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import {
  defaultDisplayColumnProps,
  showRowPinningColumn,
} from '../../utils/displayColumn.utils';

export const getMRT_RowPinningColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  if (!showRowPinningColumn(tableOptions)) {
    return null;
  }

  return {
    Cell: ({ row, table }) => (
      <MRT_TableBodyRowPinButton row={row} table={table} />
    ),
    grow: false,
    ...defaultDisplayColumnProps({
      header: 'pin',
      id: 'mrt-row-pin',
      tableOptions,
    }),
  };
};
