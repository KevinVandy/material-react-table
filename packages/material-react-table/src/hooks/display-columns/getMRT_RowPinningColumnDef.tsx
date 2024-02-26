import { MRT_TableBodyRowPinButton } from '../../components/body/MRT_TableBodyRowPinButton';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const getMRT_RowPinningColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> => {
  return {
    Cell: ({ row, table }) => (
      <MRT_TableBodyRowPinButton row={row} table={table} />
    ),
    grow: false,
    ...defaultDisplayColumnProps({
      header: 'pin',
      id: 'mrt-row-pin',
      size: 60,
      tableOptions,
    }),
  };
};
