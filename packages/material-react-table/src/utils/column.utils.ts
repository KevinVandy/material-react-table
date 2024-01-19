import { type Row } from '@tanstack/react-table';
import {
  type MRT_Column,
  type MRT_ColumnDef,
  type MRT_ColumnOrderState,
  type MRT_DefinedColumnDef,
  type MRT_DefinedTableOptions,
  type MRT_FilterOption,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

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
  columnDefs,
  tableOptions,
}: {
  columnDefs: MRT_ColumnDef<TData>[];
  tableOptions: MRT_DefinedTableOptions<TData>;
}): MRT_DefinedColumnDef<TData>[] => {
  const {
    aggregationFns = {},
    defaultDisplayColumn,
    filterFns = {},
    sortingFns = {},
    state: { columnFilterFns = {} } = {},
  } = tableOptions;
  return columnDefs.map((columnDef) => {
    //assign columnId
    if (!columnDef.id) columnDef.id = getColumnId(columnDef);
    //assign columnDefType
    if (!columnDef.columnDefType) columnDef.columnDefType = 'data';
    if (columnDef.columns?.length) {
      columnDef.columnDefType = 'group';
      //recursively prepare columns if this is a group column
      columnDef.columns = prepareColumns({
        columnDefs: columnDef.columns,
        tableOptions,
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
};

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
