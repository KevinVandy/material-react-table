import { useMemo } from 'react';
import { MRT_ToggleRowActionMenuButton } from '../../components/buttons/MRT_ToggleRowActionMenuButton';
import {
  type MRT_ColumnDef,
  type MRT_DisplayColumnIds,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

export const useMRT_RowActionsColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  const id: MRT_DisplayColumnIds = 'mrt-row-actions';
  const { createDisplayMode, state } = tableOptions;
  const { columnOrder, creatingRow } = state;

  return useMemo(() => {
    if (
      columnOrder?.includes(id) ||
      (creatingRow && createDisplayMode === 'row')
    ) {
      return {
        Cell: ({ cell, row, staticRowIndex, table }) => (
          <MRT_ToggleRowActionMenuButton
            cell={cell}
            row={row}
            staticRowIndex={staticRowIndex}
            table={table}
          />
        ),
        ...defaultDisplayColumnProps({ header: 'actions', id, tableOptions }),
      };
    }
    return null;
  }, [columnOrder, creatingRow, createDisplayMode]);
};
