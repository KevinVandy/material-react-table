import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from './utils';

export const getIsRowSelected = <TData extends MRT_RowData>({
  row,
  table,
}: {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}) => {
  const { options: enableRowSelection } = table;
  return (
    row.getIsSelected() ||
    (parseFromValuesOrFunc(enableRowSelection, row) &&
      row.getCanSelectSubRows() &&
      row.getIsAllSubRowsSelected())
  );
};

export const getCanRankRows = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
) => {
  const { getState, options } = table;
  const {
    enableGlobalFilterRankedResults,
    manualExpanding,
    manualFiltering,
    manualGrouping,
    manualSorting,
  } = options;
  const { expanded, globalFilterFn } = getState();

  return (
    !manualExpanding &&
    !manualFiltering &&
    !manualGrouping &&
    !manualSorting &&
    enableGlobalFilterRankedResults &&
    globalFilterFn === 'fuzzy' &&
    expanded !== true &&
    !Object.values(expanded).some(Boolean)
  );
};
