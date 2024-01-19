import { useMemo } from 'react';
import { MRT_DefaultDisplayColumn } from '../useMRT_TableOptions';
import {
  type MRT_ColumnDef,
  type MRT_DisplayColumnIds,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { defaultDisplayColumnProps } from '../../utils/displayColumn.utils';

const blankColProps = {
  children: null,
  sx: {
    flex: '1 0 auto',
    minWidth: 0,
    p: 0,
    width: 0,
  },
};

export const useMRT_RowSpacerColumnDef = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData> | null => {
  const id: MRT_DisplayColumnIds = 'mrt-row-spacer';
  const { columnOrder } = tableOptions.state;

  return useMemo(() => {
    if (columnOrder?.includes(id)) {
      return {
        ...defaultDisplayColumnProps({ id, size: 0, tableOptions }),
        ...MRT_DefaultDisplayColumn,
        muiTableBodyCellProps: blankColProps,
        muiTableFooterCellProps: blankColProps,
        muiTableHeadCellProps: blankColProps,
      };
    }
    return null;
  }, [columnOrder]);
};
