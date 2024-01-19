import { useMemo } from 'react';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../types';
import {
  showRowActionsColumn,
  showRowDragColumn,
  showRowExpandColumn,
  showRowNumbersColumn,
  showRowPinningColumn,
  showRowSelectionColumn,
  showRowSpacerColumn,
} from '../utils/displayColumn.utils';
import { getMRT_RowActionsColumnDef } from './display-columns/getMRT_RowActionsColumnDef';
import { getMRT_RowDragColumnDef } from './display-columns/getMRT_RowDragColumnDef';
import { getMRT_RowExpandColumnDef } from './display-columns/getMRT_RowExpandColumnDef';
import { getMRT_RowNumbersColumnDef } from './display-columns/getMRT_RowNumbersColumnDef';
import { getMRT_RowPinningColumnDef } from './display-columns/getMRT_RowPinningColumnDef';
import { getMRT_RowSelectColumnDef } from './display-columns/getMRT_RowSelectColumnDef';
import { getMRT_RowSpacerColumnDef } from './display-columns/getMRT_RowSpacerColumnDef';

export const useMRT_DisplayColumns = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData>[] => {
  const _showRowPinningColumn = showRowPinningColumn(tableOptions);
  const _showRowDragColumn = showRowDragColumn(tableOptions);
  const _showRowActionsColumn = showRowActionsColumn(tableOptions);
  const _showRowExpandColumn = showRowExpandColumn(tableOptions);
  const _showRowSelectionColumn = showRowSelectionColumn(tableOptions);
  const _showRowNumbersColumn = showRowNumbersColumn(tableOptions);
  const _showRowSpacerColumn = showRowSpacerColumn(tableOptions);

  return useMemo(
    () =>
      [
        _showRowPinningColumn && getMRT_RowPinningColumnDef(tableOptions),
        _showRowDragColumn && getMRT_RowDragColumnDef(tableOptions),
        _showRowActionsColumn && getMRT_RowActionsColumnDef(tableOptions),
        _showRowExpandColumn && getMRT_RowExpandColumnDef(tableOptions),
        _showRowSelectionColumn && getMRT_RowSelectColumnDef(tableOptions),
        _showRowNumbersColumn && getMRT_RowNumbersColumnDef(tableOptions),
        _showRowSpacerColumn && getMRT_RowSpacerColumnDef(tableOptions),
      ].filter(Boolean) as MRT_ColumnDef<TData>[],
    [
      _showRowPinningColumn,
      _showRowDragColumn,
      _showRowActionsColumn,
      _showRowExpandColumn,
      _showRowSelectionColumn,
      _showRowNumbersColumn,
      _showRowSpacerColumn,
      tableOptions,
    ],
  );
};
