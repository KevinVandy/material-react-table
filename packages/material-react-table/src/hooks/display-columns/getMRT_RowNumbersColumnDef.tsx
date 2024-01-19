import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import {
  defaultDisplayColumnProps,
  showRowNumbersColumn,
} from '../../utils/displayColumn.utils';

export const getMRT_RowNumbersColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  if (!showRowNumbersColumn(tableOptions)) {
    return null;
  }

  const { rowNumberDisplayMode } = tableOptions;
  const {
    pagination: { pageIndex, pageSize },
  } = tableOptions.state;

  return {
    Cell: ({ row, staticRowIndex }) =>
      ((rowNumberDisplayMode === 'static'
        ? (staticRowIndex || 0) + (pageSize || 0) * (pageIndex || 0)
        : row.index) ?? 0) + 1,
    ...defaultDisplayColumnProps({
      header: 'rowNumbers',
      id: 'mrt-row-numbers',
      tableOptions,
    }),
  };
};
