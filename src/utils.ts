import { ColumnDef, Table } from '@tanstack/react-table';
import { MRT_ColumnInterface } from '.';

export const findLowestLevelCols = (
  columns: MRT_ColumnInterface[],
): MRT_ColumnInterface[] => {
  let lowestLevelColumns: MRT_ColumnInterface[] = columns;
  let currentCols: MRT_ColumnInterface[] | undefined = columns;
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

export const createGroup = <D extends Record<string, any> = {}>(
  table: Table<D>,
  column: MRT_ColumnInterface<D>,
): ColumnDef<D> =>
  table.createGroup({
    ...column,
    columns: column?.columns?.map?.((col) =>
      col.columns ? createGroup<D>(table, col) : createDataColumn(table, col),
    ),
  } as any);

export const createDataColumn = <D extends Record<string, any> = {}>(
  table: Table<D>,
  column: MRT_ColumnInterface<D>,
): ColumnDef<D> => table.createDataColumn(column.id, column as any) as any;

export const createDisplayColumn = <D extends Record<string, any> = {}>(
  table: Table<D>,
  column: Omit<MRT_ColumnInterface<D>, 'header'> & { header?: string },
): ColumnDef<D> =>
  table.createDisplayColumn({
    ...column,
    isDisplayColumn: true,
  } as any);
