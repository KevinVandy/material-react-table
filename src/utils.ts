import {
  ColumnDef,
  ColumnOrderState,
  Table,
  Updater,
} from '@tanstack/react-table';
import { MRT_Column, MRT_ColumnDef, MRT_FilterFn } from '.';
import { MRT_FILTER_OPTION } from './enums';
import { defaultFilterFNs } from './filtersFNs';

export const getAllLeafColumnDefs = (
  columns: MRT_ColumnDef[],
): MRT_ColumnDef[] => {
  let lowestLevelColumns: MRT_ColumnDef[] = columns;
  let currentCols: MRT_ColumnDef[] | undefined = columns;
  while (!!currentCols?.length && currentCols.some((col) => col.columns)) {
    const nextCols: MRT_ColumnDef[] = currentCols
      .filter((col) => !!col.columns)
      .map((col) => col.columns)
      .flat() as MRT_ColumnDef[];
    if (nextCols.every((col) => !col?.columns)) {
      lowestLevelColumns = [...lowestLevelColumns, ...nextCols];
    }
    currentCols = nextCols;
  }
  return lowestLevelColumns.filter((col) => !col.columns);
};

export const createGroup = <D extends Record<string, any> = {}>(
  table: Table<D>,
  column: MRT_ColumnDef<D>,
  currentFilterFns: { [key: string]: MRT_FilterFn },
): ColumnDef<D> =>
  table.createGroup({
    ...column,
    columns: column?.columns?.map?.((col) =>
      col.columns
        ? createGroup<D>(table, col, currentFilterFns)
        : createDataColumn(table, col, currentFilterFns),
    ),
  } as any);

export const createDataColumn = <D extends Record<string, any> = {}>(
  table: Table<D>,
  column: MRT_ColumnDef<D>,
  currentFilterFns: { [key: string]: MRT_FilterFn },
): ColumnDef<D> => // @ts-ignore
  table.createDataColumn(column.id, {
    filterFn:
      currentFilterFns[column.id] instanceof Function
        ? currentFilterFns[column.id]
        : defaultFilterFNs[currentFilterFns[column.id] as MRT_FILTER_OPTION],
    ...column,
  }) as any;

export const createDisplayColumn = <D extends Record<string, any> = {}>(
  table: Table<D>,
  column: Omit<MRT_ColumnDef<D>, 'header'> & { header?: string },
): ColumnDef<D> => table.createDisplayColumn(column as ColumnDef<D>);

export const reorderColumn = (
  movingColumn: MRT_Column,
  receivingColumn: MRT_Column,
  columnOrder: ColumnOrderState,
  setColumnOrder: (updater: Updater<ColumnOrderState>) => void,
) => {
  if (movingColumn.getCanPin()) {
    movingColumn.pin(receivingColumn.getIsPinned());
  }
  columnOrder.splice(
    columnOrder.indexOf(receivingColumn.id),
    0,
    columnOrder.splice(columnOrder.indexOf(movingColumn.id), 1)[0],
  );
  setColumnOrder([...columnOrder]);
};
