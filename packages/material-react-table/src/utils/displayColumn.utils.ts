import {
  type MRT_DefinedTableOptions,
  type MRT_DisplayColumnIds,
  type MRT_Localization,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
} from '../types';
import { getAllLeafColumnDefs, getColumnId } from './column.utils';

export function defaultDisplayColumnProps<TData extends MRT_RowData>({
  header,
  id,
  size,
  tableOptions,
}: {
  header?: keyof MRT_Localization;
  id: MRT_DisplayColumnIds;
  size: number;
  tableOptions: MRT_DefinedTableOptions<TData>;
}) {
  const { defaultDisplayColumn, displayColumnDefOptions, localization } =
    tableOptions;
  return {
    ...defaultDisplayColumn,
    header: header ? localization[header]! : '',
    size,
    ...displayColumnDefOptions?.[id],
    id,
  } as const;
}

export const showRowPinningColumn = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) => {
  const { enableRowPinning, rowPinningDisplayMode } = tableOptions;
  return enableRowPinning && !rowPinningDisplayMode?.startsWith('select');
};

export const showRowDragColumn = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) => {
  const { enableRowDragging, enableRowOrdering } = tableOptions;
  return enableRowDragging || enableRowOrdering;
};

export const showRowExpandColumn = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) => {
  const {
    enableExpanding,
    enableGrouping,
    renderDetailPanel,
    state: { grouping },
  } = tableOptions;
  return !!(
    enableExpanding ||
    (enableGrouping && (grouping === undefined || grouping?.length)) ||
    renderDetailPanel
  );
};

export const showRowActionsColumn = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) => {
  const {
    createDisplayMode,
    editDisplayMode,
    enableEditing,
    enableRowActions,
    state: { creatingRow },
  } = tableOptions;
  return (
    enableRowActions ||
    (creatingRow && createDisplayMode === 'row') ||
    (enableEditing && ['modal', 'row'].includes(editDisplayMode ?? ''))
  );
};

export const showRowSelectionColumn = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) => tableOptions.enableRowSelection;

export const showRowNumbersColumn = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) => tableOptions.enableRowNumbers;

export const showRowSpacerColumn = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) => tableOptions.layoutMode === 'grid-no-grow';

export const getLeadingDisplayColumnIds = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) =>
  [
    showRowPinningColumn(tableOptions) && 'mrt-row-pin',
    showRowDragColumn(tableOptions) && 'mrt-row-drag',
    tableOptions.positionActionsColumn === 'first' &&
      showRowActionsColumn(tableOptions) &&
      'mrt-row-actions',
    tableOptions.positionExpandColumn === 'first' &&
      showRowExpandColumn(tableOptions) &&
      'mrt-row-expand',
    showRowSelectionColumn(tableOptions) && 'mrt-row-select',
    showRowNumbersColumn(tableOptions) && 'mrt-row-numbers',
  ].filter(Boolean) as MRT_DisplayColumnIds[];

export const getTrailingDisplayColumnIds = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) =>
  [
    tableOptions.positionActionsColumn === 'last' &&
      showRowActionsColumn(tableOptions) &&
      'mrt-row-actions',
    tableOptions.positionExpandColumn === 'last' &&
      showRowExpandColumn(tableOptions) &&
      'mrt-row-expand',
    showRowSpacerColumn(tableOptions) && 'mrt-row-spacer',
  ].filter(Boolean) as MRT_DisplayColumnIds[];

export const getDefaultColumnOrderIds = <TData extends MRT_RowData>(
  tableOptions: MRT_StatefulTableOptions<TData>,
) => {
  const leadingDisplayCols: string[] = getLeadingDisplayColumnIds(tableOptions);
  const trailingDisplayCols: string[] =
    getTrailingDisplayColumnIds(tableOptions);
  const allLeafColumnDefs = getAllLeafColumnDefs(tableOptions.columns)
    .map((columnDef) => getColumnId(columnDef))
    .filter(
      (columnId) =>
        !leadingDisplayCols.includes(columnId) &&
        !trailingDisplayCols.includes(columnId),
    );
  return [...leadingDisplayCols, ...allLeafColumnDefs, ...trailingDisplayCols];
};
