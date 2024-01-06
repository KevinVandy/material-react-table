import { type RefObject, useMemo } from 'react';
import { MRT_TableBodyRowGrabHandle } from '../body';
import { MRT_TableBodyRowPinButton } from '../body/MRT_TableBodyRowPinButton';
import { MRT_ExpandAllButton } from '../buttons/MRT_ExpandAllButton';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_ToggleRowActionMenuButton } from '../buttons/MRT_ToggleRowActionMenuButton';
import { showExpandColumn } from '../column.utils';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import {
  type MRT_ColumnDef,
  type MRT_ColumnOrderState,
  type MRT_DefinedTableOptions,
  type MRT_DisplayColumnIds,
  type MRT_GroupingState,
  type MRT_Localization,
  type MRT_Row,
  type MRT_RowData,
} from '../types';
import { MRT_DefaultDisplayColumn } from '.';

interface Params<TData extends MRT_RowData> {
  columnOrder: MRT_ColumnOrderState;
  creatingRow: MRT_Row<TData> | null;
  grouping: MRT_GroupingState;
  tableOptions: MRT_DefinedTableOptions<TData>;
}

export const useMRT_DisplayColumns = <TData extends MRT_RowData>(
  params: Params<TData>,
): MRT_ColumnDef<TData>[] => {
  const { columnOrder, creatingRow, grouping, tableOptions } = params;
  const order = tableOptions.state?.columnOrder ?? columnOrder;

  return useMemo(
    () =>
      [
        makeRowPinColumn,
        makeRowDragColumn,
        makeRowActionsColumn,
        makeRowExpandColumn,
        makeRowSelectColumn,
        makeRowNumbersColumn,
        makeSpacerColumn,
      ]
        .map((makeCol) => makeCol(params, order))
        .filter(Boolean) as MRT_ColumnDef<TData>[],
    [
      columnOrder,
      creatingRow,
      grouping,
      tableOptions.displayColumnDefOptions,
      tableOptions.editDisplayMode,
      tableOptions.enableColumnDragging,
      tableOptions.enableColumnFilterModes,
      tableOptions.enableColumnOrdering,
      tableOptions.enableEditing,
      tableOptions.enableExpandAll,
      tableOptions.enableExpanding,
      tableOptions.enableGroupingSingleColumn,
      tableOptions.enableGrouping,
      tableOptions.enableRowActions,
      tableOptions.enableRowDragging,
      tableOptions.enableRowNumbers,
      tableOptions.enableRowOrdering,
      tableOptions.enableRowSelection,
      tableOptions.enableSelectAll,
      tableOptions.localization,
      tableOptions.positionActionsColumn,
      tableOptions.renderDetailPanel,
      tableOptions.renderRowActionMenuItems,
      tableOptions.renderRowActions,
      tableOptions.state?.columnOrder,
      tableOptions.state?.grouping,
    ],
  );
};

function defaultDisplayColumnProps<TData extends MRT_RowData>(
  {
    defaultDisplayColumn,
    displayColumnDefOptions,
    localization,
  }: MRT_DefinedTableOptions<TData>,
  id: MRT_DisplayColumnIds,
  header?: keyof MRT_Localization,
  size = 60,
) {
  return {
    ...defaultDisplayColumn,
    header: header ? localization[header]! : '',
    size,
    ...displayColumnDefOptions?.[id],
    id,
  } as const;
}

function makeRowPinColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-pin';
  if (order.includes(id)) {
    return {
      Cell: ({ row, table }) => (
        <MRT_TableBodyRowPinButton row={row} table={table} />
      ),
      ...defaultDisplayColumnProps(tableOptions, id, 'pin'),
    };
  }
  return null;
}

function makeRowDragColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-drag';
  if (order.includes(id)) {
    return {
      Cell: ({ row, rowRef, table }) => (
        <MRT_TableBodyRowGrabHandle
          row={row}
          rowRef={rowRef as RefObject<HTMLTableRowElement>}
          table={table}
        />
      ),
      ...defaultDisplayColumnProps(tableOptions, id, 'move'),
    };
  }
  return null;
}

function makeRowActionsColumn<TData extends MRT_RowData>(
  { creatingRow, tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-actions';
  if (
    order.includes(id) ||
    (creatingRow && tableOptions.createDisplayMode === 'row')
  ) {
    return {
      Cell: ({ cell, row, table }) => (
        <MRT_ToggleRowActionMenuButton cell={cell} row={row} table={table} />
      ),
      ...defaultDisplayColumnProps(tableOptions, id, 'actions'),
    };
  }
  return null;
}

function makeRowExpandColumn<TData extends MRT_RowData>(
  { grouping, tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-expand';
  if (
    order.includes(id) &&
    showExpandColumn(tableOptions, tableOptions.state?.grouping ?? grouping)
  ) {
    return {
      Cell: ({ row, table }) => {
        return (
          <>
            <MRT_ExpandButton row={row} table={table} />
            {tableOptions?.enableGroupingSingleColumn &&
              tableOptions?.groupedColumnMode === 'remove' &&
              row.groupingValue}
            {tableOptions?.enableGroupingSingleColumn &&
              tableOptions?.groupedColumnMode === 'remove' &&
              tableOptions?.showOpenedGroup &&
              !row.getCanExpand() &&
              row.original?.[
                table.getState().grouping[table.getState().grouping.length - 1]
              ]}
          </>
        );
      },
      Header: ({ table }) => {
        return (
          <>
            {tableOptions.enableExpandAll && (
              <MRT_ExpandAllButton table={table} />
            )}
            {tableOptions?.enableGroupingSingleColumn &&
              tableOptions?.groupedColumnMode === 'remove' &&
              'Group'}
          </>
        );
      },
      ...defaultDisplayColumnProps(tableOptions, id, 'expand'),
    };
  }
  return null;
}

function makeRowSelectColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-select';
  if (order.includes(id)) {
    return {
      Cell: ({ row, table }) => <MRT_SelectCheckbox row={row} table={table} />,
      Header:
        tableOptions.enableSelectAll && tableOptions.enableMultiRowSelection
          ? ({ table }) => <MRT_SelectCheckbox selectAll table={table} />
          : undefined,
      ...defaultDisplayColumnProps(tableOptions, id, 'select'),
    };
  }
  return null;
}

function makeRowNumbersColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-numbers';
  if (order.includes(id) || tableOptions.enableRowNumbers)
    return {
      Cell: ({ row }) => row.index + 1,
      Header: () => tableOptions.localization.rowNumber,
      ...defaultDisplayColumnProps(tableOptions, id, 'rowNumbers'),
    };
  return null;
}

const blankColProps = {
  children: null,
  sx: {
    flex: '1 0 auto',
    minWidth: 0,
    p: 0,
    width: 0,
  },
};

function makeSpacerColumn<TData extends MRT_RowData>(
  { tableOptions }: Params<TData>,
  order: MRT_ColumnOrderState,
): MRT_ColumnDef<TData> | null {
  const id: MRT_DisplayColumnIds = 'mrt-row-spacer';
  if (order.includes(id)) {
    return {
      ...defaultDisplayColumnProps(tableOptions, id, undefined, 0),
      ...MRT_DefaultDisplayColumn,
      muiTableBodyCellProps: blankColProps,
      muiTableFooterCellProps: blankColProps,
      muiTableHeadCellProps: blankColProps,
    };
  }
  return null;
}
