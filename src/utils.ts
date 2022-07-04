import { ColumnOrderState } from '@tanstack/react-table';
import {
  MaterialReactTableProps,
  MRT_Column,
  MRT_ColumnDef,
  MRT_DefinedColumnDef,
  MRT_FilterOption,
} from '.';
import { MRT_FilterFns } from './filtersFns';

export const getAllLeafColumnDefs = <D extends Record<string, any> = {}>(
  columns: MRT_ColumnDef<D>[],
): MRT_ColumnDef<D>[] => {
  let lowestLevelColumns: MRT_ColumnDef<D>[] = columns;
  let currentCols: MRT_ColumnDef<D>[] | undefined = columns;
  while (!!currentCols?.length && currentCols.some((col) => col.columns)) {
    const nextCols: MRT_ColumnDef<D>[] = currentCols
      .filter((col) => !!col.columns)
      .map((col) => col.columns)
      .flat() as MRT_ColumnDef<D>[];
    if (nextCols.every((col) => !col?.columns)) {
      lowestLevelColumns = [...lowestLevelColumns, ...nextCols];
    }
    currentCols = nextCols;
  }
  return lowestLevelColumns.filter((col) => !col.columns);
};

export const prepareColumns = <D extends Record<string, any> = {}>(
  columnDefs: MRT_ColumnDef<D>[],
  currentFilterFns: { [key: string]: MRT_FilterOption },
): MRT_DefinedColumnDef<D>[] =>
  columnDefs.map((column) => {
    if (!column.id) column.id = column.accessorKey?.toString() ?? column.header;
    if (!column.columnDefType) column.columnDefType = 'data';
    if (!!column.columns?.length) {
      column.columnDefType = 'group';
      column.columns = prepareColumns(column.columns, currentFilterFns);
    } else if (column.columnDefType === 'data') {
      if (!(column.filterFn instanceof Function)) {
        //@ts-ignore
        column.filterFn =
          MRT_FilterFns[currentFilterFns[column.id]] ?? MRT_FilterFns.fuzzy;
      }
    }
    return column;
  }) as MRT_DefinedColumnDef<D>[];

export const reorderColumn = <D extends Record<string, any> = {}>(
  movingColumn: MRT_Column<D>,
  receivingColumn: MRT_Column<D>,
  columnOrder: ColumnOrderState,
): ColumnOrderState => {
  if (movingColumn.getCanPin()) {
    movingColumn.pin(receivingColumn.getIsPinned());
  }
  columnOrder.splice(
    columnOrder.indexOf(receivingColumn.id),
    0,
    columnOrder.splice(columnOrder.indexOf(movingColumn.id), 1)[0],
  );
  return [...columnOrder];
};

export const getLeadingDisplayColumnIds = <D extends Record<string, any> = {}>(
  props: MaterialReactTableProps<D>,
) =>
  [
    ((props.positionActionsColumn === 'first' && props.enableRowActions) ||
      (props.enableEditing && props.editingMode === 'row')) &&
      'mrt-row-actions',
    (props.enableExpanding || props.enableGrouping) && 'mrt-expand',
    props.enableRowSelection && 'mrt-select',
    props.enableRowNumbers && 'mrt-row-numbers',
  ].filter(Boolean) as string[];

export const getTrailingDisplayColumnIds = <D extends Record<string, any> = {}>(
  props: MaterialReactTableProps<D>,
) => [
  ((props.positionActionsColumn === 'last' && props.enableRowActions) ||
    (props.enableEditing && props.editingMode === 'row')) &&
    'mrt-row-actions',
];

export const getDefaultColumnOrderIds = <D extends Record<string, any> = {}>(
  props: MaterialReactTableProps<D>,
) =>
  [
    ...getLeadingDisplayColumnIds(props),
    ...getAllLeafColumnDefs(props.columns as MRT_ColumnDef[]).map((c) => c.id),
    ...getTrailingDisplayColumnIds(props),
  ].filter(Boolean) as string[];
