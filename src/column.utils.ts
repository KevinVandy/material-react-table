import { ColumnOrderState, GroupingState } from '@tanstack/react-table';
import { alpha, lighten, TableCellProps, Theme } from '@mui/material';
import {
  MaterialReactTableProps,
  MRT_Column,
  MRT_ColumnDef,
  MRT_DefinedColumnDef,
  MRT_DisplayColumnIds,
  MRT_FilterOption,
  MRT_Header,
  MRT_TableInstance,
} from '.';
import { MRT_FilterFns } from './filterFns';
import { MRT_SortingFns } from './sortingFns';

export const getColumnId = <TData extends Record<string, any> = {}>(
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

export const prepareColumns = <TData extends Record<string, any> = {}>({
  columnDefs,
  columnFilterFns,
  defaultDisplayColumn,
  filterFns,
  sortingFns,
}: {
  columnDefs: MRT_ColumnDef<TData>[];
  columnFilterFns: { [key: string]: MRT_FilterOption };
  defaultDisplayColumn: Partial<MRT_ColumnDef<TData>>;
  filterFns: typeof MRT_FilterFns & MaterialReactTableProps<TData>['filterFns'];
  sortingFns: typeof MRT_SortingFns &
    MaterialReactTableProps<TData>['sortingFns'];
}): MRT_DefinedColumnDef<TData>[] =>
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
      columnDef.columns = prepareColumns({
        columnDefs: columnDef.columns,
        columnFilterFns,
        defaultDisplayColumn,
        filterFns,
        sortingFns,
      });
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
        ...(defaultDisplayColumn as MRT_ColumnDef<TData>),
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

export const showExpandColumn = <TData extends Record<string, any> = {}>(
  props: MaterialReactTableProps<TData>,
  grouping?: GroupingState,
) =>
  !!(
    props.enableExpanding ||
    (props.enableGrouping && (grouping === undefined || grouping?.length)) ||
    props.renderDetailPanel
  );

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
      showExpandColumn(props) &&
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
    showExpandColumn(props) &&
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
  if (columnDef.filterVariant === 'range') return 'betweenInclusive';
  if (
    columnDef.filterVariant === 'select' ||
    columnDef.filterVariant === 'checkbox'
  )
    return 'equals';
  return 'fuzzy';
};

export const getIsLastLeftPinnedColumn = (
  table: MRT_TableInstance,
  column: MRT_Column,
) => {
  return (
    column.getIsPinned() === 'left' &&
    table.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
  );
};

export const getIsFirstRightPinnedColumn = (column: MRT_Column) => {
  return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
};

export const getTotalRight = (table: MRT_TableInstance, column: MRT_Column) => {
  return (
    (table.getRightLeafHeaders().length - 1 - column.getPinnedIndex()) * 160
  );
};

export const getCommonCellStyles = ({
  column,
  header,
  table,
  tableCellProps,
  theme,
}: {
  column: MRT_Column;
  header?: MRT_Header;
  table: MRT_TableInstance;
  tableCellProps: TableCellProps;
  theme: Theme;
}) => ({
  backgroundColor:
    column.getIsPinned() && column.columnDef.columnDefType !== 'group'
      ? alpha(lighten(theme.palette.background.default, 0.04), 0.95)
      : 'inherit',
  backgroundImage: 'inherit',
  boxShadow: getIsLastLeftPinnedColumn(table, column)
    ? `-4px 0 8px -6px ${alpha(theme.palette.common.black, 0.2)} inset`
    : getIsFirstRightPinnedColumn(column)
    ? `4px 0 8px -6px ${alpha(theme.palette.common.black, 0.2)} inset`
    : undefined,
  left:
    column.getIsPinned() === 'left'
      ? `${column.getStart('left')}px`
      : undefined,
  opacity:
    table.getState().draggingColumn?.id === column.id ||
    table.getState().hoveredColumn?.id === column.id
      ? 0.5
      : 1,
  position:
    column.getIsPinned() && column.columnDef.columnDefType !== 'group'
      ? 'sticky'
      : undefined,
  right:
    column.getIsPinned() === 'right'
      ? `${getTotalRight(table, column)}px`
      : undefined,
  transition: `all ${column.getIsResizing() ? 0 : '0.1s'} ease-in-out`,
  ...(tableCellProps?.sx instanceof Function
    ? tableCellProps.sx(theme)
    : (tableCellProps?.sx as any)),
  maxWidth: `min(${column.getSize()}px, fit-content)`,
  minWidth: `max(${column.getSize()}px, ${column.columnDef.minSize ?? 30}px)`,
  width: header?.getSize() ?? column.getSize(),
});

export const MRT_DefaultColumn = {
  minSize: 40,
  maxSize: 1000,
  size: 180,
};

export const MRT_DefaultDisplayColumn: Partial<MRT_ColumnDef> = {
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
};
