import { MRT_ColumnInstance, MRT_ColumnInterface } from '.';

export const findLowestLevelCols = (
  columns: MRT_ColumnInterface[] | MRT_ColumnInstance[],
) => {
  let lowestLevelColumns: MRT_ColumnInterface[] | MRT_ColumnInstance[] =
    columns;
  let currentCols: MRT_ColumnInterface[] | MRT_ColumnInstance[] | undefined =
    columns;
  while (!!currentCols?.length && currentCols.some((col) => col.columns)) {
    const nextCols: MRT_ColumnInterface[] = currentCols
      .filter((col) => !!col.columns)
      .map((col) => col.columns)
      .flat() as MRT_ColumnInterface[];
    if (nextCols.every((col) => !col?.columns)) {
      lowestLevelColumns = [...lowestLevelColumns, ...nextCols];
    }
    currentCols = nextCols;
  }
  return lowestLevelColumns.filter((col) => !col.columns);
};
