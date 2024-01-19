import { useMemo } from 'react';
import {
  type MRT_ColumnDef,
  type MRT_DisplayColumnIds,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const useMRT_RowNumbersColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  const id: MRT_DisplayColumnIds = 'mrt-row-numbers';
  const { enableRowNumbers, rowNumberDisplayMode } = tableOptions;
  const {
    columnOrder,
    pagination: { pageIndex, pageSize },
  } = tableOptions.state;

  return useMemo(() => {
    if (columnOrder?.includes(id) || enableRowNumbers)
      return {
        Cell: ({ row, staticRowIndex }) =>
          ((rowNumberDisplayMode === 'static'
            ? (staticRowIndex || 0) + (pageSize || 0) * (pageIndex || 0)
            : row.index) ?? 0) + 1,
        ...defaultDisplayColumnProps({
          header: 'rowNumbers',
          id,
          tableOptions,
        }),
      };
    return null;
  }, [
    columnOrder,
    pageIndex,
    pageSize,
    enableRowNumbers,
    rowNumberDisplayMode,
  ]);
};
