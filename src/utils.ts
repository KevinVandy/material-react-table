import { ColumnOrderState } from '@tanstack/react-table';
import {
  MaterialReactTableProps,
  MRT_Column,
  MRT_ColumnDef,
  MRT_DefinedColumnDef,
  MRT_FilterOption,
} from '.';
import { MRT_FilterFns } from './filtersFns';

const getColumnId = <D extends Record<string, any> = {}>(
  columnDef: MRT_ColumnDef<D>,
): string =>
  columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;

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
  columnDefs.map((columnDef) => {
    if (!columnDef.id) columnDef.id = getColumnId(columnDef);
    if (process.env.NODE_ENV !== 'production' && !columnDef.id) {
      console.error(
        'Column definitions must have a valid `accessorKey` or `id` property',
      );
    }
    if (!columnDef.columnDefType) columnDef.columnDefType = 'data';
    if (!!columnDef.columns?.length) {
      columnDef.columnDefType = 'group';
      columnDef.columns = prepareColumns(columnDef.columns, currentFilterFns);
    } else if (
      columnDef.columnDefType === 'data' &&
      Object.keys(MRT_FilterFns).includes(currentFilterFns[columnDef.id])
    ) {
      columnDef.filterFn =
        MRT_FilterFns[currentFilterFns[columnDef.id]] ?? MRT_FilterFns.fuzzy;
    }
    return columnDef;
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
    ...getAllLeafColumnDefs(props.columns).map((columnDef) =>
      getColumnId(columnDef),
    ),
    ...getTrailingDisplayColumnIds(props),
  ].filter(Boolean) as string[];
