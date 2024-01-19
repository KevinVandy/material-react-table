import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../../types';
import { getMRT_RowActionsColumnDef } from './getMRT_RowActionsColumnDef';
import { getMRT_RowDragColumnDef } from './getMRT_RowDragColumnDef';
import { getMRT_RowExpandColumnDef } from './getMRT_RowExpandColumnDef';
import { getMRT_RowNumbersColumnDef } from './getMRT_RowNumbersColumnDef';
import { getMRT_RowPinningColumnDef } from './getMRT_RowPinningColumnDef';
import { getMRT_RowSelectColumnDef } from './getMRT_RowSelectColumnDef';
import { getMRT_RowSpacerColumnDef } from './getMRT_RowSpacerColumnDef';

export const getMRT_DisplayColumns = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData>[] => {
  console.log('useMRT_DisplayColumns');
  return [
    getMRT_RowNumbersColumnDef(tableOptions),
    getMRT_RowSelectColumnDef(tableOptions),
    getMRT_RowExpandColumnDef(tableOptions),
    getMRT_RowActionsColumnDef(tableOptions),
    getMRT_RowDragColumnDef(tableOptions),
    getMRT_RowPinningColumnDef(tableOptions),
    getMRT_RowSpacerColumnDef(tableOptions),
  ].filter(Boolean) as MRT_ColumnDef<TData>[];
};
