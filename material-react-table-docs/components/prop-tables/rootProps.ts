import { MaterialReactTableProps } from 'material-react-table';

export type PropRow = {
  defaultValue?: string;
  description?: string;
  link?: string;
  linkText?: string;
  propName: keyof MaterialReactTableProps;
  required?: boolean;
  source?: 'MRT' | 'TanStack Table' | 'Material UI' | '';
  type?: string;
};

export const rootProps: PropRow[] = [
  {
    propName: 'aggregationFns',
    defaultValue: '',
    description: `This option allows you to define custom aggregation functions that can be referenced in a column's aggegationFn option by their key`,
    link: 'https://tanstack.com/table/v8/docs/api/features/grouping#aggregationfns',
    linkText: 'TanStack Table Grouping Docs',
    required: false,
    source: 'TanStack Table',
    type: 'Record<string, AggregationFn>',
  },
  {
    propName: 'autoResetAll',
    defaultValue: '',
    description:
      'Set this option to override any of the autoReset... feature options.',
    link: 'https://tanstack.com/table/v8/docs/api/core/table#autoresetall',
    linkText: 'TanStack Table Core Table Docs',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'autoResetExpanded',
    defaultValue: '',
    description:
      'Enable this setting to automatically reset the expanded state of the table when grouping state changes.',
    link: 'https://tanstack.com/table/v8/docs/api/features/expanding#autoresetexpanded',
    linkText: 'TanStack Table Expanding Docs',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'autoResetPageIndex',
    defaultValue: '',
    description:
      'If set to true, pagination will be reset to the first page when page-altering state changes eg. data is updated, filters change, grouping changes, etc.',
    link: 'https://tanstack.com/table/v8/docs/api/features/pagination#autoresetpagination',
    linkText: 'TanStack Table Pagination Docs',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'columnResizeMode',
    defaultValue: "'onEnd'",
    description:
      'Determines when the columnSizing state is updated. onChange updates the state when the user is dragging the resize handle. onEnd updates the state when the user releases the resize handle.',
    link: 'https://tanstack.com/table/v8/docs/api/features/column-sizing#columnresizemode',
    linkText: 'TanStack Table Column Sizing Docs',
    required: false,
    source: 'TanStack Table',
    type: "'onEnd' | 'onChange'",
  },
  {
    propName: 'columns',
    defaultValue: '',
    description: 'The array of column defs to use for the table.    ',
    link: 'https://tanstack.com/table/v8/docs/api/core/table#columns',
    linkText: 'TanStack Table Core Table Docs',
    required: true,
    source: 'TanStack Table',
    type: 'Array<MRT_ColumnDef<TData>>',
  },
  {
    propName: 'data',
    defaultValue: '',
    description: `The data for the table to display. This is array should match the type you provided to table.setRowType<...>, but in theory could be an array of anything. It's common for each item in the array to be an object of key/values but this is not required. Columns can access this data via string/index or a functional accessor to return anything they want.

    When the data option changes reference (compared via Object.is), the table will reprocess the data. Any other data processing that relies on the core data model (such as grouping, sorting, filtering, etc) will also be reprocessed.`,
    link: 'https://tanstack.com/table/v8/docs/api/core/table#data',
    linkText: 'TanStack Table Core Table Docs',
    required: true,
    source: 'TanStack Table',
    type: 'Array<TData>',
  },
  {
    propName: 'debugAll',
    defaultValue: 'false',
    description: 'Set this option to true to output all debugging information to the console.',
    link: 'https://tanstack.com/table/v8/docs/api/core/table#debugall',
    linkText: 'TanStack Table Core Table Docs',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'debugColumns',
    defaultValue: 'false',
    description: 'Set this option to true to output column debugging information to the console.',
    link: 'https://tanstack.com/table/v8/docs/api/core/table#debugcolumns',
    linkText: 'TanStack Table Core Table Docs',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'debugHeaders',
    defaultValue: 'false',
    description: 'Set this option to true to output header debugging information to the console.',
    link: 'https://tanstack.com/table/v8/docs/api/core/table#debugheaders',
    linkText: 'TanStack Table Core Table Docs',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'debugRows',
    defaultValue: 'false',
    description: 'Set this option to true to output row debugging information to the console.',
    link: 'https://tanstack.com/table/v8/docs/api/core/table#debugrows',
    linkText: 'TanStack Table Core Table Docs',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'debugTable',
    defaultValue: 'false',
    description: 'Set this option to true to output table debugging information to the console.',
    link: 'https://tanstack.com/table/v8/docs/api/core/table#debugcolumns',
    linkText: 'TanStack Table Core Table Docs',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'defaultColumn',
    defaultValue: '',
    description: 'Default column options to use for all column defs supplied to the table. This is useful for providing default cell/header/footer renderers, sorting/filtering/grouping options, etc.',
    link: 'https://tanstack.com/table/v8/docs/api/core/table#defaultcolumn',
    linkText: '',
    required: false,
    source: '',
    type: 'Partial<MRT_ColumnDef<TData>>',
  },
  {
    propName: 'displayColumnDefOptions',
    defaultValue: '',
    description:
      'Customize and override the column definition options for the built-in display columns. (Select, Expand, Row Actions, etc.)',
    link: '',
    linkText: '',
    required: false,
    source: 'MRT',
    type: '{ [key: string]: MRT_ColumnDef<TData> }',
  },
  {
    propName: 'editingMode',
    defaultValue: "'row'",
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: "'cell' | 'row' | 'table'",
  },
  {
    propName: 'enableClickToCopy',
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableColumnActions',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableColumnDragging',
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableColumnFilterModes',
    defaultValue: 'false',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableColumnFilters',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableColumnOrdering',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableColumnResizing',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableDensityToggle',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableEditing',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableExpandAll',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableExpanding',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'TanStack Table',
    type: 'boolean',
  },
  {
    propName: 'enableFilters',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableFullScreenToggle',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableGlobalFilter',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableGlobalFilterModes',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableGlobalFilterRankedResults',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableGrouping',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableHiding',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableMultiRemove',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableMultiRowSelection',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableMultiSort',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enablePagination',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enablePinning',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableRowActions',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableRowDragging',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableRowNumbers',
    defaultValue: '',
    description: '',
    link: '/docs/guides/row-numbers',
    linkText: 'Row Numbers Feature Guide',
    required: false,
    source: 'MRT',
    type: 'boolean',
  },
  {
    propName: 'enableRowOrdering',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableRowSelection',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableRowVirtualization',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'MRT',
    type: 'boolean',
  },
  {
    propName: 'enableSelectAll',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableSorting',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableSortingRemoval',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableStickyFooter',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableStickyHeader',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableSubRowSelection',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableTableFooter',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableTableHead',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableBottomToolbar',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableToolbarInternalActions',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'enableTopToolbar',
    defaultValue: 'true',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'columnFilterModeOptions',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '(MRT_FilterOption | string)[] | null',
  },
  {
    propName: 'globalFilterModeOptions',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '(MRT_FilterOption | string)[] | null',
  },
  {
    propName: 'expandRowsFn',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '(dataRow: TData) => TData[]', //?
  },
  {
    propName: 'filterFns',
    defaultValue: '',
    description: `This option allows you to define custom filter functions that can be referenced in a column's filterFn option by their key`,
    link: 'https://tanstack.com/table/v8/docs/api/features/filters#filterfns',
    linkText: 'TanStack Table Filters Docs',
    required: false,
    source: 'TanStack Table',
    type: 'Record<string, FilterFn>',
  },
  {
    propName: 'filterFromLeafRows',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'boolean',
  },
  {
    propName: 'getColumnCanGlobalFilter',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '(column: Column<TData, unknown>) => boolean',
  },
  {
    propName: 'getCoreRowModel',
    defaultValue: '',
    description: `This required option is a factory for a function that computes and returns the core row model for the table. It is called once per table and should return a new function which will calculate and return the row model for the table.

    A default implementation is provided via any table adapter's { getCoreRowModel } export.`,
    link: 'https://tanstack.com/table/v8/docs/api/core/table#getcorerowmodel',
    linkText: 'TanStack Table Core Table Docs',
    required: true, //?
    source: 'TanStack Table',
    type: '(table: Table<TData>) => () => RowModel<TData>',
  },
  {
    propName: 'getExpandedRowModel',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'MRT',
    type: '() => MRT_RowModel<TData>',
  },
  {
    propName: 'getFacetedMinMaxValues',
    defaultValue: '',
    description: 'A function that computes and returns a min/max tuple derived from column.getFacetedRowModel. Useful for displaying faceted result values.',
    link: 'https://tanstack.com/table/v8/docs/api/features/filters#getfacetedminmaxvalues',
    linkText: 'TanStack Table Filters Docs',
    required: false,
    source: 'TanStack Table',
    type: '() => Map<any, number>',
  },
  {
    propName: 'getFacetedRowModel',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getFacetedUniqueValues',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getFilteredRowModel',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getGroupedRowModel',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getIsRowExpanded',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getPaginationRowModel',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getRowCanExpand',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getRowId',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getSortedRowModel',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'getSubRows',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'globalFilterFn',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'groupedColumnMode',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'icons',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'initialState',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'isMultiSortEvent',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'localization',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'manualExpanding',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'manualFiltering',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'manualGrouping',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'manualPagination',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'manualSorting',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'maxMultiSortColCount',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'mergeOptions',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'meta',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'TanStack Table',
    type: '',
  },
  {
    propName: 'muiExpandAllButtonProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiExpandButtonProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiLinearProgressProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: 'LinearProgressProps | ({ isTopToolbar, table }) => LinearProgressProps',
  },
  {
    propName: 'muiSearchTextFieldProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiSelectAllCheckboxProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiSelectCheckboxProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableBodyCellCopyButtonProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableBodyCellEditTextFieldProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableBodyCellProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableBodyCellSkeletonProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableBodyProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableBodyRowDragHandleProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableBodyRowProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableContainerProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableDetailPanelProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableFooterCellProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableFooterProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableFooterRowProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableHeadCellColumnActionsButtonProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableHeadCellDragHandleProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'Material UI',
    type: '',
  },
  {
    propName: 'muiTableHeadCellFilterTextFieldProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiTableHeadCellProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiTableHeadProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiTableHeadRowProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiTablePaginationProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiTablePaperProps',
    defaultValue: '',
    description: '',
    link: 'https://mui.com/material-ui/api/paper/',
    linkText: 'MUI Paper API Docs',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiTableProps',
    defaultValue: '',
    description: '',
    link: 'https://mui.com/material-ui/api/table/',
    linkText: 'MUI TableProps API Docs',
    required: false,
    source: 'Material UI',
    type: 'TableProps',
  },
  {
    propName: 'muiToolbarAlertBannerChipProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiToolbarAlertBannerProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiBottomToolbarProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'muiTopToolbarProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onColumnDrop',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onColumnFiltersChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onColumnOrderChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onColumnPinningChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onColumnSizingChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onColumnSizingInfoChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onColumnVisibilityChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onDraggingColumnChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onEditingCellChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onEditingRowChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onFilterFnsChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onGlobalFilterFnChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onHoveredColumnChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onExpandedChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onGlobalFilterChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onGroupingChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onDensityChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onIsFullScreenChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onEditingRowSave',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onPaginationChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onRowDrop',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onRowSelectionChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onShowAlertBannerChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onShowFiltersChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onShowGlobalFilterChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'onSortingChange',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'pageCount',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'number',
  },
  {
    propName: 'paginateExpandedRows',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'positionActionsColumn',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'MRT',
    type: "'first' | 'last'",
  },
  {
    propName: 'positionExpandColumn',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: 'MRT',
    type: "'first' | 'last'",
  },
  {
    propName: 'positionGlobalFilter',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'positionPagination',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'positionToolbarAlertBanner',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'positionToolbarDropZone',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: "'bottom' | 'top' | 'both' | 'none'",
  },
  {
    propName: 'renderColumnActionsMenuItems',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'renderColumnFilterModeMenuItems',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'renderDetailPanel',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'renderGlobalFilterModeMenuItems',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'renderRowActionMenuItems',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'renderRowActions',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'renderBottomToolbarCustomActions',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'renderTopToolbarCustomActions',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'renderToolbarInternalActions',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'rowCount',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: 'number',
  },
  {
    propName: 'rowNumberMode',
    defaultValue: "'original'",
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: "'original' | 'static'",
  },
  {
    propName: 'selectAllMode',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'sortDescFirst',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'sortingFns',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'state',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'tableInstanceRef',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'virtualizerProps',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
  {
    propName: 'virtualizerInstanceRef',
    defaultValue: '',
    description: '',
    link: '',
    linkText: '',
    required: false,
    source: '',
    type: '',
  },
];
