import { type ReactNode } from 'react';
import {
  createRow as _createRow,
  flexRender as _flexRender,
  type Renderable,
  type Row,
} from '@tanstack/react-table';
import { type Range, defaultRangeExtractor } from '@tanstack/react-virtual';
import { type MRT_AggregationFns } from './aggregationFns';
import { type MRT_FilterFns } from './filterFns';
import { type MRT_SortingFns } from './sortingFns';
import {
  type MRT_Column,
  type MRT_ColumnDef,
  type MRT_ColumnHelper,
  type MRT_ColumnOrderState,
  type MRT_DefinedColumnDef,
  type MRT_DisplayColumnDef,
  type MRT_DisplayColumnIds,
  type MRT_FilterOption,
  type MRT_GroupColumnDef,
  type MRT_GroupingState,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_TableOptions,
} from './types';

export const getColumnId = <TData extends MRT_RowData>(
  columnDef: MRT_ColumnDef<TData>,
): string =>
  columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;

export const getAllLeafColumnDefs = <TData extends MRT_RowData>(
  columns: MRT_ColumnDef<TData>[],
): MRT_ColumnDef<TData>[] => {
  const allLeafColumnDefs: MRT_ColumnDef<TData>[] = [];
  const getLeafColumns = (cols: MRT_ColumnDef<TData>[]) => {
    cols.forEach((col) => {
      if (col.columns) {
        getLeafColumns(col.columns);
      } else {
        allLeafColumnDefs.push(col);
      }
    });
  };
  getLeafColumns(columns);
  return allLeafColumnDefs;
};

export const prepareColumns = <TData extends MRT_RowData>({
  aggregationFns,
  columnDefs,
  columnFilterFns,
  defaultDisplayColumn,
  filterFns,
  sortingFns,
}: {
  aggregationFns: typeof MRT_AggregationFns &
    MRT_TableOptions<TData>['aggregationFns'];
  columnDefs: MRT_ColumnDef<TData>[];
  columnFilterFns: { [key: string]: MRT_FilterOption };
  defaultDisplayColumn: Partial<MRT_ColumnDef<TData>>;
  filterFns: typeof MRT_FilterFns & MRT_TableOptions<TData>['filterFns'];
  sortingFns: typeof MRT_SortingFns & MRT_TableOptions<TData>['sortingFns'];
}): MRT_DefinedColumnDef<TData>[] =>
  columnDefs.map((columnDef) => {
    //assign columnId
    if (!columnDef.id) columnDef.id = getColumnId(columnDef);
    if (process.env.NODE_ENV !== 'production' && !columnDef.id) {
      console.error(
        'Column definitions must have a valid `accessorKey` or `id` property',
      );
    }

    //assign columnDefType
    if (!columnDef.columnDefType) columnDef.columnDefType = 'data';
    if (columnDef.columns?.length) {
      columnDef.columnDefType = 'group';
      //recursively prepare columns if this is a group column
      columnDef.columns = prepareColumns({
        aggregationFns,
        columnDefs: columnDef.columns,
        columnFilterFns,
        defaultDisplayColumn,
        filterFns,
        sortingFns,
      });
    } else if (columnDef.columnDefType === 'data') {
      //assign aggregationFns if multiple aggregationFns are provided
      if (Array.isArray(columnDef.aggregationFn)) {
        const aggFns = columnDef.aggregationFn as string[];
        columnDef.aggregationFn = (
          columnId: string,
          leafRows: Row<TData>[],
          childRows: Row<TData>[],
        ) =>
          aggFns.map(
            (fn) => aggregationFns[fn]?.(columnId, leafRows, childRows),
          );
      }

      //assign filterFns
      if (Object.keys(filterFns).includes(columnFilterFns[columnDef.id])) {
        columnDef.filterFn =
          filterFns[columnFilterFns[columnDef.id]] ?? filterFns.fuzzy;
        (columnDef as MRT_DefinedColumnDef<TData>)._filterFn =
          columnFilterFns[columnDef.id];
      }

      //assign sortingFns
      if (Object.keys(sortingFns).includes(columnDef.sortingFn as string)) {
        // @ts-ignore
        columnDef.sortingFn = sortingFns[columnDef.sortingFn];
      }
    } else if (columnDef.columnDefType === 'display') {
      columnDef = {
        ...(defaultDisplayColumn as MRT_ColumnDef<TData>),
        ...columnDef,
      };
    }
    return columnDef;
  }) as MRT_DefinedColumnDef<TData>[];

export const reorderColumn = <TData extends MRT_RowData>(
  draggedColumn: MRT_Column<TData>,
  targetColumn: MRT_Column<TData>,
  columnOrder: MRT_ColumnOrderState,
): MRT_ColumnOrderState => {
  if (draggedColumn.getCanPin()) {
    draggedColumn.pin(targetColumn.getIsPinned());
  }
  const newColumnOrder = [...columnOrder];
  newColumnOrder.splice(
    newColumnOrder.indexOf(targetColumn.id),
    0,
    newColumnOrder.splice(newColumnOrder.indexOf(draggedColumn.id), 1)[0],
  );
  return newColumnOrder;
};

export const showExpandColumn = <TData extends MRT_RowData>(
  props: MRT_TableOptions<TData>,
  grouping?: MRT_GroupingState,
) =>
  !!(
    props.enableExpanding ||
    (props.enableGrouping && (grouping === undefined || grouping?.length)) ||
    props.renderDetailPanel
  );

export const getLeadingDisplayColumnIds = <TData extends MRT_RowData>(
  props: MRT_TableOptions<TData>,
) =>
  [
    props.enableRowPinning &&
      !props.rowPinningDisplayMode?.startsWith('select') &&
      'mrt-row-pin',
    (props.enableRowDragging || props.enableRowOrdering) && 'mrt-row-drag',
    props.positionActionsColumn === 'first' &&
      (props.enableRowActions ||
        (props.enableEditing &&
          ['modal', 'row'].includes(props.editDisplayMode ?? ''))) &&
      'mrt-row-actions',
    props.positionExpandColumn === 'first' &&
      showExpandColumn(props) &&
      'mrt-row-expand',
    props.enableRowSelection && 'mrt-row-select',
    props.enableRowNumbers && 'mrt-row-numbers',
  ].filter(Boolean) as MRT_DisplayColumnIds[];

export const getTrailingDisplayColumnIds = <TData extends MRT_RowData>(
  props: MRT_TableOptions<TData>,
) =>
  [
    props.positionActionsColumn === 'last' &&
      (props.enableRowActions ||
        (props.enableEditing &&
          ['modal', 'row'].includes(props.editDisplayMode ?? ''))) &&
      'mrt-row-actions',
    props.positionExpandColumn === 'last' &&
      showExpandColumn(props) &&
      'mrt-row-expand',
    props.layoutMode === 'grid-no-grow' && 'mrt-row-spacer',
  ].filter(Boolean) as MRT_DisplayColumnIds[];

export const getDefaultColumnOrderIds = <TData extends MRT_RowData>(
  props: MRT_TableOptions<TData>,
) => {
  const leadingDisplayCols: string[] = getLeadingDisplayColumnIds(props);
  const trailingDisplayCols: string[] = getTrailingDisplayColumnIds(props);
  const allLeafColumnDefs = getAllLeafColumnDefs(props.columns)
    .map((columnDef) => getColumnId(columnDef))
    .filter(
      (columnId) =>
        !leadingDisplayCols.includes(columnId) &&
        !trailingDisplayCols.includes(columnId),
    );
  return [...leadingDisplayCols, ...allLeafColumnDefs, ...trailingDisplayCols];
};

export const getDefaultColumnFilterFn = <TData extends MRT_RowData>(
  columnDef: MRT_ColumnDef<TData>,
): MRT_FilterOption => {
  if (columnDef.filterVariant === 'multi-select') return 'arrIncludesSome';
  if (columnDef.filterVariant?.includes('range')) return 'betweenInclusive';
  if (
    columnDef.filterVariant === 'select' ||
    columnDef.filterVariant === 'checkbox'
  )
    return 'equals';
  return 'fuzzy';
};

export const getIsFirstColumn = <TData extends MRT_RowData>(
  column: MRT_Column<TData>,
  table: MRT_TableInstance<TData>,
) => {
  const leftColumns = table.getLeftVisibleLeafColumns();
  return leftColumns.length
    ? leftColumns[0].id === column.id
    : table.getVisibleLeafColumns()[0].id === column.id;
};

export const getIsLastColumn = <TData extends MRT_RowData>(
  column: MRT_Column<TData>,
  table: MRT_TableInstance<TData>,
) => {
  const rightColumns = table.getRightVisibleLeafColumns();
  const columns = table.getVisibleLeafColumns();
  return rightColumns.length
    ? rightColumns[rightColumns.length - 1].id === column.id
    : columns[columns.length - 1].id === column.id;
};

export const getIsLastLeftPinnedColumn = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  column: MRT_Column<TData>,
) => {
  return (
    column.getIsPinned() === 'left' &&
    table.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
  );
};

export const getIsFirstRightPinnedColumn = <TData extends MRT_RowData>(
  column: MRT_Column<TData>,
) => {
  return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
};

export const getTotalRight = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  column: MRT_Column<TData>,
) => {
  return table
    .getRightLeafHeaders()
    .slice(column.getPinnedIndex() + 1)
    .reduce((acc, col) => acc + col.getSize(), 0);
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

export const parseFromValuesOrFunc = <T, U>(
  fn: ((arg: U) => T) | T | undefined,
  arg: U,
): T | undefined => (fn instanceof Function ? fn(arg) : fn);

export const flexRender = _flexRender as (
  Comp: Renderable<any>,
  props: any,
) => JSX.Element | ReactNode;

export const createRow = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  originalRow?: TData,
): MRT_Row<TData> =>
  _createRow(
    table as any,
    'mrt-row-create',
    originalRow ??
      Object.assign(
        {},
        ...getAllLeafColumnDefs(table.options.columns).map((col) => ({
          [getColumnId(col)]: '',
        })),
      ),
    -1,
    0,
  ) as MRT_Row<TData>;

export const extraIndexRangeExtractor = (
  range: Range,
  draggingIndex?: number,
) => {
  const newIndexes = defaultRangeExtractor(range);
  if (draggingIndex === undefined) return newIndexes;
  if (
    draggingIndex >= 0 &&
    draggingIndex < Math.max(range.startIndex - range.overscan, 0)
  ) {
    newIndexes.unshift(draggingIndex);
  }
  if (draggingIndex >= 0 && draggingIndex > range.endIndex + range.overscan) {
    newIndexes.push(draggingIndex);
  }
  return newIndexes;
};

export function createMRTColumnHelper<
  TData extends MRT_RowData,
>(): MRT_ColumnHelper<TData> {
  return {
    accessor: (accessor, column) => {
      return typeof accessor === 'function'
        ? ({
            ...column,
            accessorFn: accessor,
          } as any)
        : {
            ...column,
            accessorKey: accessor,
          };
    },
    display: (column) => column as MRT_DisplayColumnDef<TData>,
    group: (column) => column as MRT_GroupColumnDef<TData>,
  };
}

export const getValueAndLabel = (
  option: { label?: string; text?: string; value: string } | string,
): { label: string; value: string } => {
  let label: string = '';
  let value: string = '';
  if (option) {
    if (typeof option !== 'object') {
      label = option;
      value = option;
    } else {
      label = option.label ?? option.text ?? option.value;
      value = option.value ?? label;
    }
  }
  return { label, value };
};
