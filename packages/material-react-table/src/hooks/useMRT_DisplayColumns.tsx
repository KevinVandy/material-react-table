import { useMemo } from 'react';
import {
  type MRT_ColumnDef,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../types';
import { useMRT_RowActionsColumnDef } from './display-columns/useMRT_RowActionsColumnDef';
import { useMRT_RowDragColumnDef } from './display-columns/useMRT_RowDragColumnDef';
import { useMRT_RowExpandColumnDef } from './display-columns/useMRT_RowExpandColumnDef';
import { useMRT_RowNumbersColumnDef } from './display-columns/useMRT_RowNumbersColumnDef';
import { useMRT_RowPinningColumnDef } from './display-columns/useMRT_RowPinningColumnDef';
import { useMRT_RowSelectColumnDef } from './display-columns/useMRT_RowSelectColumnDef';
import { useMRT_RowSpacerColumnDef } from './display-columns/useMRT_RowSpacerColumnDef';

export const useMRT_DisplayColumns = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
): MRT_ColumnDef<TData>[] => {
  const mrtPinningColumnDef = useMRT_RowPinningColumnDef(tableOptions);
  const mrtDragColumnDef = useMRT_RowDragColumnDef(tableOptions);
  const mrtActionsColumnDef = useMRT_RowActionsColumnDef(tableOptions);
  const mrtExpandColumnDef = useMRT_RowExpandColumnDef(tableOptions);
  const mrtSelectColumnDef = useMRT_RowSelectColumnDef(tableOptions);
  const mrtNumbersColumnDef = useMRT_RowNumbersColumnDef(tableOptions);
  const mrtSpacerColumnDef = useMRT_RowSpacerColumnDef(tableOptions);
  
  return useMemo(
    () =>
      [
        mrtPinningColumnDef,
        mrtDragColumnDef,
        mrtActionsColumnDef,
        mrtExpandColumnDef,
        mrtSelectColumnDef,
        mrtNumbersColumnDef,
        mrtSpacerColumnDef,
      ].filter(Boolean) as MRT_ColumnDef<TData>[],
    [
      mrtPinningColumnDef,
      mrtDragColumnDef,
      mrtActionsColumnDef,
      mrtExpandColumnDef,
      mrtSelectColumnDef,
      mrtNumbersColumnDef,
      mrtSpacerColumnDef,
    ],
  );
};
