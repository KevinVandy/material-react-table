import { ColumnOrderState } from '@tanstack/react-table';
import {
  MaterialReactTableProps,
  MRT_Column,
  MRT_ColumnDef,
  MRT_DefinedColumnDef,
  MRT_DisplayColumnIds,
  MRT_FilterOption,
} from '.';
import { MRT_FilterFns } from './filtersFns';
import { MRT_SortingFns } from './sortingFns';

const getColumnId = <TData extends Record<string, any> = {}>(
  columnDef: MRT_ColumnDef<TData>,
): string =>
  columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;

export const getAllLeafColumnDefs = <TData extends Record<string, any> = {}>(
  columns: MRT_ColumnDef<TData>[],
): MRT_ColumnDef<TData>[] => {
  let lowestLevelColumns: MRT_ColumnDef<TData>[] = columns;
  let currentCols: MRT_ColumnDef<TData>[] | undefined = columns;
  while (!!currentCols?.length && currentCols.some((col) => col.columns)) {
    const nextCols: MRT_ColumnDef<TData>[] = currentCols
      .filter((col) => !!col.columns)
      .map((col) => col.columns)
      .flat() as MRT_ColumnDef<TData>[];
    if (nextCols.every((col) => !col?.columns)) {
      lowestLevelColumns = [...lowestLevelColumns, ...nextCols];
    }
    currentCols = nextCols;
  }
  return lowestLevelColumns.filter((col) => !col.columns);
};

export const prepareColumns = <TData extends Record<string, any> = {}>(
  columnDefs: MRT_ColumnDef<TData>[],
  currentFilterFns: { [key: string]: MRT_FilterOption },
): MRT_DefinedColumnDef<TData>[] =>
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
    } else if (columnDef.columnDefType === 'data') {
      if (Object.keys(MRT_FilterFns).includes(currentFilterFns[columnDef.id])) {
        columnDef.filterFn =
          MRT_FilterFns[currentFilterFns[columnDef.id]] ?? MRT_FilterFns.fuzzy;
      }
      if (Object.keys(MRT_SortingFns).includes(columnDef.sortingFn as string)) {
        // @ts-ignore
        columnDef.sortingFn = MRT_SortingFns[columnDef.sortingFn];
      }
    }
    return columnDef;
  }) as MRT_DefinedColumnDef<TData>[];

export const reorderColumn = <TData extends Record<string, any> = {}>(
  draggedColumn: MRT_Column<TData>,
  targetColumn: MRT_Column<TData>,
  columnOrder: ColumnOrderState,
): ColumnOrderState => {
  if (draggedColumn.getCanPin()) {
    draggedColumn.pin(targetColumn.getIsPinned());
  }
  columnOrder.splice(
    columnOrder.indexOf(targetColumn.id),
    0,
    columnOrder.splice(columnOrder.indexOf(draggedColumn.id), 1)[0],
  );
  return [...columnOrder];
};

export const getLeadingDisplayColumnIds = <
  TData extends Record<string, any> = {},
>(
  props: MaterialReactTableProps<TData>,
) =>
  [
    (props.enableRowDragging || props.enableRowOrdering) && 'mrt-row-drag',
    ((props.positionActionsColumn === 'first' && props.enableRowActions) ||
      (props.enableEditing && props.editingMode === 'row')) &&
      'mrt-row-actions',
    (props.enableExpanding ||
      props.enableGrouping ||
      props.renderDetailPanel) &&
      'mrt-row-expand',
    props.enableRowSelection && 'mrt-row-select',
    props.enableRowNumbers && 'mrt-row-numbers',
  ].filter(Boolean) as MRT_DisplayColumnIds[];

export const getTrailingDisplayColumnIds = <
  TData extends Record<string, any> = {},
>(
  props: MaterialReactTableProps<TData>,
) => [
  ((props.positionActionsColumn === 'last' && props.enableRowActions) ||
    (props.enableEditing && props.editingMode === 'row')) &&
    'mrt-row-actions',
];

export const getDefaultColumnOrderIds = <
  TData extends Record<string, any> = {},
>(
  props: MaterialReactTableProps<TData>,
) =>
  [
    ...getLeadingDisplayColumnIds(props),
    ...getAllLeafColumnDefs(props.columns).map((columnDef) =>
      getColumnId(columnDef),
    ),
    ...getTrailingDisplayColumnIds(props),
  ].filter(Boolean) as string[];
