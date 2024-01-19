import {
  type MRT_DefinedTableOptions,
  type MRT_DisplayColumnIds,
  type MRT_GroupingState,
  type MRT_Localization,
  type MRT_RowData,
} from '../types';
import { getAllLeafColumnDefs, getColumnId } from './column.utils';

export function defaultDisplayColumnProps<TData extends MRT_RowData>({
  header,
  id,
  size = 60,
  tableOptions,
}: {
  header?: keyof MRT_Localization;
  id: MRT_DisplayColumnIds;
  size?: number;
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

export const showExpandColumn = <TData extends MRT_RowData>(
  tableOptions: MRT_DefinedTableOptions<TData>,
  grouping?: MRT_GroupingState,
) =>
  !!(
    tableOptions.enableExpanding ||
    (tableOptions.enableGrouping &&
      (grouping === undefined || grouping?.length)) ||
    tableOptions.renderDetailPanel
  );

export const getLeadingDisplayColumnIds = <TData extends MRT_RowData>(
  props: MRT_DefinedTableOptions<TData>,
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
  props: MRT_DefinedTableOptions<TData>,
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
  props: MRT_DefinedTableOptions<TData>,
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
