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
  type MRT_GroupingState,
  type MRT_Row,
  type MRT_RowData,
} from '../types';
import { MRT_DefaultDisplayColumn } from './useMRT_TableOptions';

const blankColProps = {
  children: null,
  sx: {
    flex: '1 0 auto',
    minWidth: 0,
    p: 0,
    width: 0,
  },
};

interface Params<TData extends MRT_RowData> {
  columnOrder: MRT_ColumnOrderState;
  creatingRow: MRT_Row<TData> | null;
  grouping: MRT_GroupingState;
  tableOptions: MRT_DefinedTableOptions<TData>;
}

export const useMRT_DisplayColumns = <TData extends MRT_RowData>({
  columnOrder,
  creatingRow,
  grouping,
  tableOptions,
}: Params<TData>) => {
  return useMemo(
    () =>
      (
        [
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-pin',
          ) && {
            Cell: ({ row, table }) => (
              <MRT_TableBodyRowPinButton row={row} table={table} />
            ),
            header: tableOptions.localization.pin,
            size: 60,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-pin'],
            columnDefType: 'display',
            id: 'mrt-row-pin',
          },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-drag',
          ) && {
            Cell: ({ row, rowRef, table }) => (
              <MRT_TableBodyRowGrabHandle
                row={row}
                rowRef={rowRef as RefObject<HTMLTableRowElement>}
                table={table}
              />
            ),
            header: tableOptions.localization.move,
            size: 60,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-drag'],
            columnDefType: 'display',
            id: 'mrt-row-drag',
          },
          ((tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-actions',
          ) ||
            (creatingRow && tableOptions.createDisplayMode === 'row')) && {
            Cell: ({ cell, row, table }) => (
              <MRT_ToggleRowActionMenuButton
                cell={cell}
                row={row}
                table={table}
              />
            ),
            header: tableOptions.localization.actions,
            size: 70,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-actions'],
            columnDefType: 'display',
            id: 'mrt-row-actions',
          },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-expand',
          ) &&
            showExpandColumn(
              tableOptions,
              tableOptions.state?.grouping ?? grouping,
            ) && {
              Cell: ({ row, table }) => (
                <MRT_ExpandButton row={row} table={table} />
              ),
              Header: tableOptions.enableExpandAll
                ? ({ table }) => <MRT_ExpandAllButton table={table} />
                : null,
              header: tableOptions.localization.expand,
              size: 60,
              ...tableOptions.displayColumnDefOptions?.['mrt-row-expand'],
              columnDefType: 'display',
              id: 'mrt-row-expand',
            },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-select',
          ) && {
            Cell: ({ row, table }) => (
              <MRT_SelectCheckbox row={row} table={table} />
            ),
            Header:
              tableOptions.enableSelectAll &&
              tableOptions.enableMultiRowSelection
                ? ({ table }) => <MRT_SelectCheckbox selectAll table={table} />
                : null,
            header: tableOptions.localization.select,
            size: 60,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-select'],
            columnDefType: 'display',
            id: 'mrt-row-select',
          },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-numbers',
          ) && {
            Cell: ({ row }) => row.index + 1,
            Header: () => tableOptions.localization.rowNumber,
            header: tableOptions.localization.rowNumbers,
            size: 60,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-numbers'],
            columnDefType: 'display',
            id: 'mrt-row-numbers',
          },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-spacer',
          ) && {
            ...tableOptions.displayColumnDefOptions?.['mrt-row-spacer'],
            ...MRT_DefaultDisplayColumn,
            columnDefType: 'display',
            header: '',
            id: 'mrt-row-spacer',
            muiTableBodyCellProps: blankColProps,
            muiTableFooterCellProps: blankColProps,
            muiTableHeadCellProps: blankColProps,
          },
        ] as MRT_ColumnDef<TData>[]
      ).filter(Boolean),
    [
      columnOrder,
      grouping,
      tableOptions.displayColumnDefOptions,
      tableOptions.editDisplayMode,
      tableOptions.enableColumnDragging,
      tableOptions.enableColumnFilterModes,
      tableOptions.enableColumnOrdering,
      tableOptions.enableEditing,
      tableOptions.enableExpandAll,
      tableOptions.enableExpanding,
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
