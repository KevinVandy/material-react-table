import type {
  ColumnOrderState,
  GroupingState,
  Row,
} from '@tanstack/react-table';
import { MRT_AggregationFns } from './aggregationFns';
import { MRT_FilterFns } from './filterFns';
import { MRT_SortingFns } from './sortingFns';
import { alpha, lighten } from '@mui/material/styles';
import type { TableCellProps } from '@mui/material/TableCell';
import type { Theme } from '@mui/material/styles';
import type {
  MaterialReactTableProps,
  MRT_Column,
  MRT_ColumnDef,
  MRT_DefinedColumnDef,
  MRT_DisplayColumnIds,
  MRT_FilterOption,
  MRT_Header,
  MRT_TableInstance,
} from '.';

export const getColumnId = <TData extends Record<string, any> = {}>(
  columnDef: MRT_ColumnDef<TData>,
): string =>
  columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;

export const getAllLeafColumnDefs = <TData extends Record<string, any> = {}>(
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

export const prepareColumns = <TData extends Record<string, any> = {}>({
  aggregationFns,
  columnDefs,
  columnFilterFns,
  defaultDisplayColumn,
  filterFns,
  sortingFns,
}: {
  aggregationFns: typeof MRT_AggregationFns &
    MaterialReactTableProps<TData>['aggregationFns'];
  columnDefs: MRT_ColumnDef<TData>[];
  columnFilterFns: { [key: string]: MRT_FilterOption };
  defaultDisplayColumn: Partial<MRT_ColumnDef<TData>>;
  filterFns: typeof MRT_FilterFns & MaterialReactTableProps<TData>['filterFns'];
  sortingFns: typeof MRT_SortingFns &
    MaterialReactTableProps<TData>['sortingFns'];
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
          aggFns.map((fn) =>
            aggregationFns[fn]?.(columnId, leafRows, childRows),
          );
      }

      //assign filterFns
      if (Object.keys(filterFns).includes(columnFilterFns[columnDef.id])) {
        columnDef.filterFn =
          filterFns[columnFilterFns[columnDef.id]] ?? filterFns.fuzzy;
        (columnDef as MRT_DefinedColumnDef)._filterFn =
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
    props.positionActionsColumn === 'first' &&
      (props.enableRowActions ||
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
  props.positionActionsColumn === 'last' &&
    (props.enableRowActions ||
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
    (table.getRightLeafHeaders().length - 1 - column.getPinnedIndex()) * 200
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
      ? alpha(lighten(theme.palette.background.default, 0.04), 0.97)
      : 'inherit',
  backgroundImage: 'inherit',
  boxShadow: getIsLastLeftPinnedColumn(table, column)
    ? `-4px 0 8px -6px ${alpha(theme.palette.common.black, 0.2)} inset`
    : getIsFirstRightPinnedColumn(column)
    ? `4px 0 8px -6px ${alpha(theme.palette.common.black, 0.2)} inset`
    : undefined,
  display: table.options.layoutMode === 'grid' ? 'flex' : 'table-cell',
  left:
    column.getIsPinned() === 'left'
      ? `${column.getStart('left')}px`
      : undefined,
  ml:
    table.options.enableColumnVirtualization &&
    column.getIsPinned() === 'left' &&
    column.getPinnedIndex() === 0
      ? `-${
          column.getSize() * (table.getState().columnPinning.left?.length ?? 1)
        }px`
      : undefined,
  mr:
    table.options.enableColumnVirtualization &&
    column.getIsPinned() === 'right' &&
    column.getPinnedIndex() === table.getVisibleLeafColumns().length - 1
      ? `-${
          column.getSize() *
          (table.getState().columnPinning.right?.length ?? 1) *
          1.2
        }px`
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
  transition:
    table.options.enableColumnVirtualization || column.getIsResizing()
      ? 'none'
      : `all 150ms ease-in-out`,
  ...(tableCellProps?.sx instanceof Function
    ? tableCellProps.sx(theme)
    : (tableCellProps?.sx as any)),
  flex:
    table.options.layoutMode === 'grid'
      ? `${column.getSize()} 0 auto`
      : undefined,
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
