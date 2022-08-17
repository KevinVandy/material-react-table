import { ColumnOrderState } from '@tanstack/react-table';
import {
  MaterialReactTableProps,
  MRT_Column,
  MRT_ColumnDef,
  MRT_DefinedColumnDef,
  MRT_DisplayColumnIds,
  MRT_FilterOption,
} from '.';
import { MRT_FilterFns } from './filterFns';
import { MRT_SortingFns } from './sortingFns';

export const defaultDisplayColumnDefOptions = {
  columnDefType: 'display',
  enableClickToCopy: false,
  enableColumnActions: false,
  enableColumnDragging: false,
  enableColumnFilter: false,
  enableColumnOrdering: false,
  enableEditing: false,
  enableGlobalFilter: false,
  enableGrouping: false,
  enableHiding: false,
  enableResizing: false,
  enableSorting: false,
} as Partial<MRT_ColumnDef>;

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
  columnFilterFns: { [key: string]: MRT_FilterOption },
  filterFns: typeof MRT_FilterFns & MaterialReactTableProps<TData>['filterFns'],
  sortingFns: typeof MRT_SortingFns &
    MaterialReactTableProps<TData>['sortingFns'],
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
      columnDef.columns = prepareColumns(
        columnDef.columns,
        columnFilterFns,
        filterFns,
        sortingFns,
      );
    } else if (columnDef.columnDefType === 'data') {
      if (Object.keys(filterFns).includes(columnFilterFns[columnDef.id])) {
        columnDef.filterFn =
          filterFns[columnFilterFns[columnDef.id]] ?? filterFns.fuzzy;
        (columnDef as MRT_DefinedColumnDef)._filterFn =
          columnFilterFns[columnDef.id];
      }
      if (Object.keys(sortingFns).includes(columnDef.sortingFn as string)) {
        // @ts-ignore
        columnDef.sortingFn = sortingFns[columnDef.sortingFn];
      }
    } else if (columnDef.columnDefType === 'display') {
      columnDef = {
        ...(defaultDisplayColumnDefOptions as MRT_ColumnDef<TData>),
        ...columnDef,
      };
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
      (props.enableEditing &&
        ['row', 'modal'].includes(props.editingMode ?? ''))) &&
      'mrt-row-actions',
    props.positionExpandColumn === 'first' &&
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
    (props.enableEditing &&
      ['row', 'modal'].includes(props.editingMode ?? ''))) &&
    'mrt-row-actions',
  props.positionExpandColumn === 'last' &&
    (props.enableExpanding ||
      props.enableGrouping ||
      props.renderDetailPanel) &&
    'mrt-row-expand',
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

export const getDefaultColumnFilterFn = <
  TData extends Record<string, any> = {},
>(
  columnDef: MRT_ColumnDef<TData>,
): MRT_FilterOption => {
  if (columnDef.filterVariant === 'multi-select') return 'arrIncludesSome';
  if (columnDef.filterVariant === 'select') return 'equals';
  if (columnDef.filterVariant === 'range') return 'betweenInclusive';
  return 'fuzzy';
};
