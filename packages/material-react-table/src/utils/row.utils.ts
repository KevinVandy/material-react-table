import { type MRT_RowData, type MRT_TableInstance } from '../types';

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
