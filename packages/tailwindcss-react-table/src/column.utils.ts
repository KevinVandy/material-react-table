import { TRT_AggregationFns } from './aggregationFns';
import { TRT_FilterFns } from './filterFns';
import { TRT_SortingFns } from './sortingFns';
import { alpha, lighten } from '@mui/material/styles';
import type { Row } from '@tanstack/react-table';
import type { TableCellProps } from '@mui/material/TableCell';
import type { Theme } from '@mui/material/styles';
import type {
  TailwindCSSReactTableProps,
  TRT_Column,
  TRT_ColumnDef,
  TRT_ColumnOrderState,
  TRT_DefinedColumnDef,
  TRT_DisplayColumnIds,
  TRT_FilterOption,
  TRT_GroupingState,
  TRT_Header,
  TRT_TableInstance,
} from './TailwindCSSReactTable.types';

export const getColumnId = <TData extends Record<string, any> = {}>(
  columnDef: TRT_ColumnDef<TData>,
): string =>
  columnDef.id ?? columnDef.accessorKey?.toString?.() ?? columnDef.header;

export const getAllLeafColumnDefs = <TData extends Record<string, any> = {}>(
  columns: TRT_ColumnDef<TData>[],
): TRT_ColumnDef<TData>[] => {
  const allLeafColumnDefs: TRT_ColumnDef<TData>[] = [];
  const getLeafColumns = (cols: TRT_ColumnDef<TData>[]) => {
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
  aggregationFns: typeof TRT_AggregationFns &
    TailwindCSSReactTableProps<TData>['aggregationFns'];
  columnDefs: TRT_ColumnDef<TData>[];
  columnFilterFns: { [key: string]: TRT_FilterOption };
  defaultDisplayColumn: Partial<TRT_ColumnDef<TData>>;
  filterFns: typeof TRT_FilterFns &
    TailwindCSSReactTableProps<TData>['filterFns'];
  sortingFns: typeof TRT_SortingFns &
    TailwindCSSReactTableProps<TData>['sortingFns'];
}): TRT_DefinedColumnDef<TData>[] =>
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
        (columnDef as TRT_DefinedColumnDef)._filterFn =
          columnFilterFns[columnDef.id];
      }

      //assign sortingFns
      if (Object.keys(sortingFns).includes(columnDef.sortingFn as string)) {
        // @ts-ignore
        columnDef.sortingFn = sortingFns[columnDef.sortingFn];
      }
    } else if (columnDef.columnDefType === 'display') {
      columnDef = {
        ...(defaultDisplayColumn as TRT_ColumnDef<TData>),
        ...columnDef,
      };
    }
    return columnDef;
  }) as TRT_DefinedColumnDef<TData>[];

export const reorderColumn = <TData extends Record<string, any> = {}>(
  draggedColumn: TRT_Column<TData>,
  targetColumn: TRT_Column<TData>,
  columnOrder: TRT_ColumnOrderState,
): TRT_ColumnOrderState => {
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
  props: TailwindCSSReactTableProps<TData>,
  grouping?: TRT_GroupingState,
) =>
  !!(
    props.enableExpanding ||
    (props.enableGrouping && (grouping === undefined || grouping?.length)) ||
    props.renderDetailPanel
  );

export const getLeadingDisplayColumnIds = <
  TData extends Record<string, any> = {},
>(
  props: TailwindCSSReactTableProps<TData>,
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
  ].filter(Boolean) as TRT_DisplayColumnIds[];

export const getTrailingDisplayColumnIds = <
  TData extends Record<string, any> = {},
>(
  props: TailwindCSSReactTableProps<TData>,
) =>
  [
    props.positionActionsColumn === 'last' &&
      (props.enableRowActions ||
        (props.enableEditing &&
          ['row', 'modal'].includes(props.editingMode ?? ''))) &&
      'mrt-row-actions',
    props.positionExpandColumn === 'last' &&
      showExpandColumn(props) &&
      'mrt-row-expand',
  ].filter(Boolean) as TRT_DisplayColumnIds[];

export const getDefaultColumnOrderIds = <
  TData extends Record<string, any> = {},
>(
  props: TailwindCSSReactTableProps<TData>,
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

export const getDefaultColumnFilterFn = <
  TData extends Record<string, any> = {},
>(
  columnDef: TRT_ColumnDef<TData>,
): TRT_FilterOption => {
  if (columnDef.filterVariant === 'multi-select') return 'arrIncludesSome';
  if (columnDef.filterVariant === 'range') return 'betweenInclusive';
  if (
    columnDef.filterVariant === 'select' ||
    columnDef.filterVariant === 'checkbox'
  )
    return 'equals';
  return 'fuzzy';
};

export const getIsFirstColumn = (
  column: TRT_Column,
  table: TRT_TableInstance,
) => {
  return table.getVisibleLeafColumns()[0].id === column.id;
};

export const getIsLastColumn = (
  column: TRT_Column,
  table: TRT_TableInstance,
) => {
  const columns = table.getVisibleLeafColumns();
  return columns[columns.length - 1].id === column.id;
};

export const getIsLastLeftPinnedColumn = (
  table: TRT_TableInstance,
  column: TRT_Column,
) => {
  return (
    column.getIsPinned() === 'left' &&
    table.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
  );
};

export const getIsFirstRightPinnedColumn = (column: TRT_Column) => {
  return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
};

export const getTotalRight = (table: TRT_TableInstance, column: TRT_Column) => {
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
  column: TRT_Column;
  header?: TRT_Header;
  table: TRT_TableInstance;
  tableCellProps: TableCellProps;
  theme: Theme;
}) => {
  const widthStyles = {
    minWidth: `max(calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) * 1px), ${column.columnDef.minSize ?? 30}px)`,
    width: `calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) * 1px)`,
  };
  return {
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
    flex:
      table.options.layoutMode === 'grid'
        ? `var(--${header ? 'header' : 'col'}-${parseCSSVarId(
            header?.id ?? column.id,
          )}-size) 0 auto`
        : undefined,
    left:
      column.getIsPinned() === 'left'
        ? `${column.getStart('left')}px`
        : undefined,
    ml:
      table.options.enableColumnVirtualization &&
      column.getIsPinned() === 'left' &&
      column.getPinnedIndex() === 0
        ? `-${
            column.getSize() *
            (table.getState().columnPinning.left?.length ?? 1)
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
    transition: table.options.enableColumnVirtualization
      ? 'none'
      : `padding 150ms ease-in-out`,
    ...(!table.options.enableColumnResizing && widthStyles), //let devs pass in width styles if column resizing is disabled
    ...(tableCellProps?.sx instanceof Function
      ? tableCellProps.sx(theme)
      : (tableCellProps?.sx as any)),
    ...(table.options.enableColumnResizing && widthStyles), //don't let devs pass in width styles if column resizing is enabled
  };
};

export const TRT_DefaultColumn = {
  filterVariant: 'text',
  minSize: 40,
  maxSize: 1000,
  size: 180,
} as const;

export const TRT_DefaultDisplayColumn = {
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
} as const;

export const parseCSSVarId = (id: string) => id.replace(/[^a-zA-Z0-9]/g, '_');
