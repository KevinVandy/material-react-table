import type {
  AggregationFn,
  Cell,
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingInfoState,
  ColumnSizingState,
  DeepKeys,
  ExpandedState,
  FilterFn,
  GroupingState,
  Header,
  HeaderGroup,
  OnChangeFn,
  PaginationState,
  Row,
  RowSelectionState,
  SortingFn,
  SortingState,
  Table,
  TableOptions,
  TableState,
  Updater,
  VisibilityState,
} from '@tanstack/react-table';
import type {
  VirtualItem,
  Virtualizer,
  VirtualizerOptions,
} from '@tanstack/react-virtual';
import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from 'react';
import { TRT_AggregationFns } from './aggregationFns';
import { TRT_FilterFns } from './filterFns';
import { TRT_Icons } from './icons';
import { TRT_SortingFns } from './sortingFns';

export type {
  ColumnFiltersState as TRT_ColumnFiltersState,
  ColumnOrderState as TRT_ColumnOrderState,
  ColumnPinningState as TRT_ColumnPinningState,
  ColumnSizingInfoState as TRT_ColumnSizingInfoState,
  ColumnSizingState as TRT_ColumnSizingState,
  ExpandedState as TRT_ExpandedState,
  GroupingState as TRT_GroupingState,
  PaginationState as TRT_PaginationState,
  RowSelectionState as TRT_RowSelectionState,
  SortingState as TRT_SortingState,
  Updater as TRT_Updater,
  VirtualItem as TRT_VirtualItem,
  Virtualizer as TRT_Virtualizer,
  VirtualizerOptions as TRT_VirtualizerOptions,
  VisibilityState as TRT_VisibilityState,
};

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export type TRT_DensityState = 'comfortable' | 'compact' | 'spacious';

export interface TRT_Localization {
  actions: string;
  and: string;
  cancel: string;
  changeFilterMode: string;
  changeSearchMode: string;
  clearFilter: string;
  clearSearch: string;
  clearSort: string;
  clickToCopy: string;
  collapse: string;
  collapseAll: string;
  columnActions: string;
  copiedToClipboard: string;
  dropToGroupBy: string;
  edit: string;
  expand: string;
  expandAll: string;
  filterArrIncludes: string;
  filterArrIncludesAll: string;
  filterArrIncludesSome: string;
  filterBetween: string;
  filterBetweenInclusive: string;
  filterByColumn: string;
  filterContains: string;
  filterEmpty: string;
  filterEndsWith: string;
  filterEquals: string;
  filterEqualsString: string;
  filterFuzzy: string;
  filterGreaterThan: string;
  filterGreaterThanOrEqualTo: string;
  filterInNumberRange: string;
  filterIncludesString: string;
  filterIncludesStringSensitive: string;
  filterLessThan: string;
  filterLessThanOrEqualTo: string;
  filterMode: string;
  filterNotEmpty: string;
  filterNotEquals: string;
  filterStartsWith: string;
  filterWeakEquals: string;
  filteringByColumn: string;
  goToFirstPage: string;
  goToLastPage: string;
  goToNextPage: string;
  goToPreviousPage: string;
  grab: string;
  groupByColumn: string;
  groupedBy: string;
  hideAll: string;
  hideColumn: string;
  max: string;
  min: string;
  move: string;
  noRecordsToDisplay: string;
  noResultsFound: string;
  of: string;
  or: string;
  pinToLeft: string;
  pinToRight: string;
  resetColumnSize: string;
  resetOrder: string;
  rowActions: string;
  rowNumber: string;
  rowNumbers: string;
  rowsPerPage: string;
  save: string;
  search: string;
  select: string;
  selectedCountOfRowCountRowsSelected: string;
  showAll: string;
  showAllColumns: string;
  showHideColumns: string;
  showHideFilters: string;
  showHideSearch: string;
  sortByColumnAsc: string;
  sortByColumnDesc: string;
  sortedByColumnAsc: string;
  sortedByColumnDesc: string;
  thenBy: string;
  toggleDensity: string;
  toggleFullScreen: string;
  toggleSelectAll: string;
  toggleSelectRow: string;
  toggleVisibility: string;
  ungroupByColumn: string;
  unpin: string;
  unpinAll: string;
  unsorted: string;
}

export interface TRT_RowModel<TData extends Record<string, any> = {}> {
  flatRows: TRT_Row<TData>[];
  rows: TRT_Row<TData>[];
  rowsById: { [key: string]: TRT_Row<TData> };
}

export type TRT_TableInstance<TData extends Record<string, any> = {}> =
  Prettify<
    Omit<
      Table<TData>,
      | 'getAllColumns'
      | 'getAllFlatColumns'
      | 'getAllLeafColumns'
      | 'getCenterLeafColumns'
      | 'getColumn'
      | 'getExpandedRowModel'
      | 'getFlatHeaders'
      | 'getLeftLeafColumns'
      | 'getPaginationRowModel'
      | 'getPreFilteredRowModel'
      | 'getPrePaginationRowModel'
      | 'getRightLeafColumns'
      | 'getRowModel'
      | 'getSelectedRowModel'
      | 'getState'
      | 'options'
    > & {
      getAllColumns: () => TRT_Column<TData>[];
      getAllFlatColumns: () => TRT_Column<TData>[];
      getAllLeafColumns: () => TRT_Column<TData>[];
      getCenterLeafColumns: () => TRT_Column<TData>[];
      getColumn: (columnId: string) => TRT_Column<TData>;
      getExpandedRowModel: () => TRT_RowModel<TData>;
      getFlatHeaders: () => TRT_Header<TData>[];
      getLeftLeafColumns: () => TRT_Column<TData>[];
      getPaginationRowModel: () => TRT_RowModel<TData>;
      getPreFilteredRowModel: () => TRT_RowModel<TData>;
      getPrePaginationRowModel: () => TRT_RowModel<TData>;
      getRightLeafColumns: () => TRT_Column<TData>[];
      getRowModel: () => TRT_RowModel<TData>;
      getSelectedRowModel: () => TRT_RowModel<TData>;
      getState: () => TRT_TableState<TData>;
      options: TailwindCSSReactTableProps<TData> & {
        icons: TRT_Icons;
        localization: TRT_Localization;
      };
      refs: {
        bottomToolbarRef: MutableRefObject<HTMLDivElement>;
        editInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
        filterInputRefs: MutableRefObject<Record<string, HTMLInputElement>>;
        searchInputRef: MutableRefObject<HTMLInputElement>;
        tableContainerRef: MutableRefObject<HTMLDivElement>;
        tableHeadCellRefs: MutableRefObject<
          Record<string, HTMLTableCellElement>
        >;
        tablePaperRef: MutableRefObject<HTMLDivElement>;
        topToolbarRef: MutableRefObject<HTMLDivElement>;
      };
      setColumnFilterFns: Dispatch<
        SetStateAction<{ [key: string]: TRT_FilterOption }>
      >;
      setDensity: Dispatch<SetStateAction<TRT_DensityState>>;
      setDraggingColumn: Dispatch<SetStateAction<TRT_Column<TData> | null>>;
      setDraggingRow: Dispatch<SetStateAction<TRT_Row<TData> | null>>;
      setEditingCell: Dispatch<SetStateAction<TRT_Cell<TData> | null>>;
      setEditingRow: Dispatch<SetStateAction<TRT_Row<TData> | null>>;
      setGlobalFilterFn: Dispatch<SetStateAction<TRT_FilterOption>>;
      setHoveredColumn: Dispatch<
        SetStateAction<TRT_Column<TData> | { id: string } | null>
      >;
      setHoveredRow: Dispatch<
        SetStateAction<TRT_Row<TData> | { id: string } | null>
      >;
      setIsFullScreen: Dispatch<SetStateAction<boolean>>;
      setShowAlertBanner: Dispatch<SetStateAction<boolean>>;
      setShowColumnFilters: Dispatch<SetStateAction<boolean>>;
      setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
      setShowToolbarDropZone: Dispatch<SetStateAction<boolean>>;
    }
  >;

export type TRT_TableState<TData extends Record<string, any> = {}> = Prettify<
  TableState & {
    columnFilterFns: Record<string, TRT_FilterOption>;
    density: TRT_DensityState;
    draggingColumn: TRT_Column<TData> | null;
    draggingRow: TRT_Row<TData> | null;
    editingCell: TRT_Cell<TData> | null;
    editingRow: TRT_Row<TData> | null;
    globalFilterFn: TRT_FilterOption;
    hoveredColumn: TRT_Column<TData> | { id: string } | null;
    hoveredRow: TRT_Row<TData> | { id: string } | null;
    isFullScreen: boolean;
    isLoading: boolean;
    showAlertBanner: boolean;
    showColumnFilters: boolean;
    showGlobalFilter: boolean;
    showProgressBars: boolean;
    showSkeletons: boolean;
    showToolbarDropZone: boolean;
  }
>;

export type TRT_ColumnDef<TData extends Record<string, any> = {}> =
  // Prettify<
  Omit<
    ColumnDef<TData, unknown>,
    | 'accessorKey'
    | 'aggregatedCell'
    | 'aggregationFn'
    | 'cell'
    | 'columns'
    | 'filterFn'
    | 'footer'
    | 'header'
    | 'id'
    | 'sortingFn'
  > & {
    AggregatedCell?: (props: {
      cell: TRT_Cell<TData>;
      column: TRT_Column<TData>;
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    Cell?: (props: {
      cell: TRT_Cell<TData>;
      renderedCellValue: number | string | ReactNode;
      column: TRT_Column<TData>;
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    Edit?: (props: {
      cell: TRT_Cell<TData>;
      column: TRT_Column<TData>;
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    Filter?: (props: {
      column: TRT_Column<TData>;
      header: TRT_Header<TData>;
      rangeFilterIndex?: number;
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    Footer?:
      | ReactNode
      | ((props: {
          column: TRT_Column<TData>;
          footer: TRT_Header<TData>;
          table: TRT_TableInstance<TData>;
        }) => ReactNode);
    GroupedCell?: (props: {
      cell: TRT_Cell<TData>;
      column: TRT_Column<TData>;
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    Header?:
      | ReactNode
      | ((props: {
          column: TRT_Column<TData>;
          header: TRT_Header<TData>;
          table: TRT_TableInstance<TData>;
        }) => ReactNode);
    PlaceholderCell?: (props: {
      cell: TRT_Cell<TData>;
      column: TRT_Column<TData>;
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    /**
     * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
     * Specify a function here to point to the correct property in the data object.
     *
     * @example accessorFn: (row) => row.username
     */
    accessorFn?: (originalRow: TData) => any;
    /**
     * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
     * Specify which key in the row this column should use to access the correct data.
     * Also supports Deep Key Dot Notation.
     *
     * @example accessorKey: 'username' //simple
     * @example accessorKey: 'name.firstName' //deep key dot notation
     */
    accessorKey?: DeepKeys<TData>;
    aggregationFn?: TRT_AggregationFn<TData> | Array<TRT_AggregationFn<TData>>;
    /**
     * Specify what type of column this is. Either `data`, `display`, or `group`. Defaults to `data`.
     * Leave this blank if you are just creating a normal data column.
     *
     * @default 'data'
     *
     * @example columnDefType: 'display'
     */
    columnDefType?: 'data' | 'display' | 'group';
    columnFilterModeOptions?: Array<
      LiteralUnion<string & TRT_FilterOption>
    > | null;
    columns?: TRT_ColumnDef<TData>[];
    editSelectOptions?: (string | { text: string; value: any })[];
    editVariant?: 'text' | 'select';
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
    enableColumnDragging?: boolean;
    enableColumnFilterModes?: boolean;
    enableColumnOrdering?: boolean;
    enableEditing?: boolean | ((row: TRT_Row<TData>) => boolean);
    enableFilterMatchHighlighting?: boolean;
    filterFn?: TRT_FilterFn<TData>;
    filterSelectOptions?: (string | { text: string; value: any })[];
    filterVariant?: 'text' | 'select' | 'multi-select' | 'range' | 'checkbox';
    /**
     * footer must be a string. If you want custom JSX to render the footer, you can also specify a `Footer` option. (Capital F)
     */
    footer?: string;
    /**
     * header must be a string. If you want custom JSX to render the header, you can also specify a `Header` option. (Capital H)
     */
    header: string;
    /**
     * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
     *
     * If you have also specified an `accessorFn`, MRT still needs to have a valid `id` to be able to identify the column uniquely.
     *
     * `id` defaults to the `accessorKey` or `header` if not specified.
     *
     * @default gets set to the same value as `accessorKey` by default
     */
    id?: LiteralUnion<string & keyof TData>;
    tableBodyCellCopyButtonProps?:
      | ButtonProps
      | ((props: {
          cell: TRT_Cell<TData>;
          column: TRT_Column<TData>;
          row: TRT_Row<TData>;
          table: TRT_TableInstance<TData>;
        }) => ButtonProps);
    tableBodyCellEditTextFieldProps?:
      | TextFieldProps
      | ((props: {
          cell: TRT_Cell<TData>;
          column: TRT_Column<TData>;
          row: TRT_Row<TData>;
          table: TRT_TableInstance<TData>;
        }) => TextFieldProps);
    tableBodyCellProps?:
      | TableCellProps
      | ((props: {
          cell: TRT_Cell<TData>;
          column: TRT_Column<TData>;
          row: TRT_Row<TData>;
          table: TRT_TableInstance<TData>;
        }) => TableCellProps);
    tableFooterCellProps?:
      | TableCellProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
        }) => TableCellProps);
    tableHeadCellColumnActionsButtonProps?:
      | IconButtonProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
        }) => IconButtonProps);
    tableHeadCellDragHandleProps?:
      | IconButtonProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
        }) => IconButtonProps);
    tableHeadCellFilterCheckboxProps?:
      | CheckboxProps
      | ((props: {
          column: TRT_Column<TData>;
          table: TRT_TableInstance<TData>;
        }) => CheckboxProps);
    tableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
          rangeFilterIndex?: number;
        }) => TextFieldProps);
    tableHeadCellProps?:
      | TableCellProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
        }) => TableCellProps);
    renderColumnActionsMenuItems?: (props: {
      closeMenu: () => void;
      column: TRT_Column<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode[];
    renderColumnFilterModeMenuItems?: (props: {
      column: TRT_Column<TData>;
      internalFilterOptions: TRT_InternalFilterOption[];
      onSelectFilterMode: (filterMode: TRT_FilterOption) => void;
      table: TRT_TableInstance<TData>;
    }) => ReactNode[];
    sortingFn?: TRT_SortingFn<TData>;
  };
// >

export type TRT_DefinedColumnDef<TData extends Record<string, any> = {}> =
  // Prettify<
  Omit<TRT_ColumnDef<TData>, 'id' | 'defaultDisplayColumn'> & {
    defaultDisplayColumn: Partial<TRT_ColumnDef<TData>>;
    id: string;
    _filterFn: TRT_FilterOption;
  };
// >

export type TRT_Column<TData extends Record<string, any> = {}> =
  // Prettify<
  Omit<
    Column<TData, unknown>,
    'header' | 'footer' | 'columns' | 'columnDef' | 'filterFn'
  > & {
    columnDef: TRT_DefinedColumnDef<TData>;
    columns?: TRT_Column<TData>[];
    filterFn?: TRT_FilterFn<TData>;
    footer: string;
    header: string;
  };
// >;

export type TRT_Header<TData extends Record<string, any> = {}> = Prettify<
  Omit<Header<TData, unknown>, 'column'> & {
    column: TRT_Column<TData>;
  }
>;

export type TRT_HeaderGroup<TData extends Record<string, any> = {}> = Prettify<
  Omit<HeaderGroup<TData>, 'headers'> & {
    headers: TRT_Header<TData>[];
  }
>;

export type TRT_Row<TData extends Record<string, any> = {}> = Prettify<
  Omit<
    Row<TData>,
    'getVisibleCells' | 'getAllCells' | 'subRows' | '_valuesCache'
  > & {
    getAllCells: () => TRT_Cell<TData>[];
    getVisibleCells: () => TRT_Cell<TData>[];
    subRows?: TRT_Row<TData>[];
    _valuesCache: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
  }
>;

export type TRT_Cell<TData extends Record<string, any> = {}> = Prettify<
  Omit<Cell<TData, unknown>, 'column' | 'row'> & {
    column: TRT_Column<TData>;
    row: TRT_Row<TData>;
  }
>;

export type TRT_AggregationOption = string & keyof typeof TRT_AggregationFns;

export type TRT_AggregationFn<TData extends Record<string, any> = {}> =
  | AggregationFn<TData>
  | TRT_AggregationOption;

export type TRT_SortingOption = LiteralUnion<
  string & keyof typeof TRT_SortingFns
>;

export type TRT_SortingFn<TData extends Record<string, any> = {}> =
  | SortingFn<TData>
  | TRT_SortingOption;

export type TRT_FilterOption = LiteralUnion<
  string & keyof typeof TRT_FilterFns
>;

export type TRT_FilterFn<TData extends Record<string, any> = {}> =
  | FilterFn<TData>
  | TRT_FilterOption;

export type TRT_InternalFilterOption = {
  option: string;
  symbol: string;
  label: string;
  divider: boolean;
};

export type TRT_DisplayColumnIds =
  | 'mrt-row-actions'
  | 'mrt-row-drag'
  | 'mrt-row-expand'
  | 'mrt-row-numbers'
  | 'mrt-row-select';

export type TRT_CreateTableFeature<
  TData extends Record<string, any> = {},
  TFeature = any,
> = (table: TRT_TableInstance<TData>) => TFeature;

/**
 * `columns` and `data` props are the only required props, but there are over 170 other optional props.
 *
 * See more info on creating columns and data on the official docs site:
 * @link https://www.tailwindcss-react-table.com/docs/getting-started/usage
 *
 * See the full props list on the official docs site:
 * @link https://www.tailwindcss-react-table.com/docs/api/props
 */
export type TailwindCSSReactTableProps<
  TData extends Record<string, any> = {},
  AlertProps = any,
  ButtonProps = any,
  CheckboxProps = any,
  ChipProps = any,
  IconButtonProps = any,
  LinearProgressProps = any,
  PaperProps = any,
  RadioProps = any,
  SkeletonProps = any,
  TableProps = any,
  TableBodyProps = any,
  TableCellProps = any,
  TableContainerProps = any,
  TableFooterProps = any,
  TableHeadProps = any,
  TablePaginationProps = any,
  TableRowProps = any,
  TextFieldProps = any,
  ToolbarProps = any,
> = Prettify<
  Omit<
    Partial<TableOptions<TData>>,
    | 'columns'
    | 'data'
    | 'defaultColumn'
    | 'enableRowSelection'
    | 'expandRowsFn'
    | 'getRowId'
    | 'globalFilterFn'
    | 'initialState'
    | 'onStateChange'
    | 'state'
  > & {
    className?: string;
    columnFilterModeOptions?: Array<
      LiteralUnion<string & TRT_FilterOption>
    > | null;
    /**
     * The columns to display in the table. `accessorKey`s or `accessorFn`s must match keys in the `data` prop.
     *
     * See more info on creating columns on the official docs site:
     * @link https://www.tailwindcss-react-table.com/docs/guides/data-columns
     * @link https://www.tailwindcss-react-table.com/docs/guides/display-columns
     *
     * See all Columns Options on the official docs site:
     * @link https://www.tailwindcss-react-table.com/docs/api/column-options
     */
    columns: TRT_ColumnDef<TData>[];
    /**
     * Pass your data as an array of objects. Objects can theoretically be any shape, but it's best to keep them consistent.
     *
     * See the usage guide for more info on creating columns and data:
     * @link https://www.tailwindcss-react-table.com/docs/getting-started/usage
     */
    data: TData[];
    /**
     * Instead of specifying a bunch of the same options for each column, you can just change an option in the `defaultColumn` prop to change a default option for all columns.
     */
    defaultColumn?: Partial<TRT_ColumnDef<TData>>;
    /**
     * Change the default options for display columns.
     */
    defaultDisplayColumn?: Partial<TRT_ColumnDef<TData>>;
    displayColumnDefOptions?: Partial<{
      [key in TRT_DisplayColumnIds]: Partial<TRT_ColumnDef>;
    }>;
    editingMode?: 'table' | 'modal' | 'row' | 'cell';
    enableBottomToolbar?: boolean;
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
    enableColumnDragging?: boolean;
    enableColumnFilterModes?: boolean;
    enableColumnOrdering?: boolean;
    enableColumnVirtualization?: boolean;
    enableDensityToggle?: boolean;
    enableEditing?: boolean | ((row: TRT_Row<TData>) => boolean);
    enableExpandAll?: boolean;
    enableFilterMatchHighlighting?: boolean;
    enableFullScreenToggle?: boolean;
    enableGlobalFilterModes?: boolean;
    enableGlobalFilterRankedResults?: boolean;
    enablePagination?: boolean;
    enableRowActions?: boolean;
    enableRowDragging?: boolean;
    enableRowNumbers?: boolean;
    enableRowOrdering?: boolean;
    enableRowSelection?: boolean | ((row: TRT_Row<TData>) => boolean);
    enableRowVirtualization?: boolean;
    enableSelectAll?: boolean;
    enableStickyFooter?: boolean;
    enableStickyHeader?: boolean;
    enableTableFooter?: boolean;
    enableTableHead?: boolean;
    enableToolbarInternalActions?: boolean;
    enableTopToolbar?: boolean;
    expandRowsFn?: (dataRow: TData) => TData[];
    getRowId?: (
      originalRow: TData,
      index: number,
      parentRow: TRT_Row<TData>,
    ) => string;
    globalFilterFn?: TRT_FilterOption;
    globalFilterModeOptions?: TRT_FilterOption[] | null;
    icons?: Partial<TRT_Icons>;
    initialState?: Partial<TRT_TableState<TData>>;
    /**
     * Changes which kind of CSS layout is used to render the table. `semantic` uses default semantic HTML elements, while `grid` adds CSS grid and flexbox styles
     */
    layoutMode?: 'semantic' | 'grid';
    /**
     * Pass in either a locale imported from `tailwindcss-react-table/locales/*` or a custom locale object.
     *
     * See the localization (i18n) guide for more info:
     * @link https://www.tailwindcss-react-table.com/docs/guides/localization
     */
    localization?: Partial<TRT_Localization>;
    /**
     * Memoize cells, rows, or the entire table body to potentially improve render performance.
     *
     * @warning This will break some dynamic rendering features. See the memoization guide for more info:
     * @link https://www.tailwindcss-react-table.com/docs/guides/memoize-components
     */
    memoMode?: 'cells' | 'rows' | 'table-body';
    bottomToolbarProps?:
      | ToolbarProps
      | ((props: { table: TRT_TableInstance<TData> }) => ToolbarProps);
    expandAllButtonProps?:
      | IconButtonProps
      | ((props: { table: TRT_TableInstance<TData> }) => IconButtonProps);
    expandButtonProps?:
      | IconButtonProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          row: TRT_Row<TData>;
        }) => IconButtonProps);
    linearProgressProps?:
      | LinearProgressProps
      | ((props: {
          isTopToolbar: boolean;
          table: TRT_TableInstance<TData>;
        }) => LinearProgressProps);
    searchTextFieldProps?:
      | TextFieldProps
      | ((props: { table: TRT_TableInstance<TData> }) => TextFieldProps);
    selectAllCheckboxProps?:
      | CheckboxProps
      | ((props: { table: TRT_TableInstance<TData> }) => CheckboxProps);
    selectCheckboxProps?:
      | (CheckboxProps | RadioProps)
      | ((props: {
          table: TRT_TableInstance<TData>;
          row: TRT_Row<TData>;
        }) => CheckboxProps | RadioProps);
    tableBodyCellCopyButtonProps?:
      | ButtonProps
      | ((props: {
          cell: TRT_Cell<TData>;
          column: TRT_Column<TData>;
          row: TRT_Row<TData>;
          table: TRT_TableInstance<TData>;
        }) => ButtonProps);
    tableBodyCellEditTextFieldProps?:
      | TextFieldProps
      | ((props: {
          cell: TRT_Cell<TData>;
          column: TRT_Column<TData>;
          row: TRT_Row<TData>;
          table: TRT_TableInstance<TData>;
        }) => TextFieldProps);
    tableBodyCellProps?:
      | TableCellProps
      | ((props: {
          cell: TRT_Cell<TData>;
          column: TRT_Column<TData>;
          row: TRT_Row<TData>;
          table: TRT_TableInstance<TData>;
        }) => TableCellProps);
    tableBodyCellSkeletonProps?:
      | SkeletonProps
      | ((props: {
          cell: TRT_Cell<TData>;
          column: TRT_Column<TData>;
          row: TRT_Row<TData>;
          table: TRT_TableInstance<TData>;
        }) => SkeletonProps);
    tableBodyProps?:
      | TableBodyProps
      | ((props: { table: TRT_TableInstance<TData> }) => TableBodyProps);
    tableBodyRowDragHandleProps?:
      | IconButtonProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          row: TRT_Row<TData>;
        }) => IconButtonProps);
    tableBodyRowProps?:
      | TableRowProps
      | ((props: {
          isDetailPanel?: boolean;
          row: TRT_Row<TData>;
          staticRowIndex: number;
          table: TRT_TableInstance<TData>;
        }) => TableRowProps);
    tableContainerProps?:
      | TableContainerProps
      | ((props: { table: TRT_TableInstance<TData> }) => TableContainerProps);
    tableDetailPanelProps?:
      | TableCellProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          row: TRT_Row<TData>;
        }) => TableCellProps);
    tableFooterCellProps?:
      | TableCellProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
        }) => TableCellProps);
    tableFooterProps?:
      | TableFooterProps
      | ((props: { table: TRT_TableInstance<TData> }) => TableFooterProps);
    tableFooterRowProps?:
      | TableRowProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          footerGroup: TRT_HeaderGroup<TData>;
        }) => TableRowProps);
    tableHeadCellColumnActionsButtonProps?:
      | IconButtonProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
        }) => IconButtonProps);
    tableHeadCellDragHandleProps?:
      | IconButtonProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
        }) => IconButtonProps);
    tableHeadCellFilterCheckboxProps?:
      | CheckboxProps
      | ((props: {
          column: TRT_Column<TData>;
          table: TRT_TableInstance<TData>;
        }) => CheckboxProps);
    tableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
          rangeFilterIndex?: number;
        }) => TextFieldProps);
    tableHeadCellProps?:
      | TableCellProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          column: TRT_Column<TData>;
        }) => TableCellProps);
    tableHeadProps?:
      | TableHeadProps
      | ((props: { table: TRT_TableInstance<TData> }) => TableHeadProps);
    tableHeadRowProps?:
      | TableRowProps
      | ((props: {
          table: TRT_TableInstance<TData>;
          headerGroup: TRT_HeaderGroup<TData>;
        }) => TableRowProps);
    tablePaginationProps?:
      | Partial<Omit<TablePaginationProps, 'rowsPerPage'>>
      | ((props: {
          table: TRT_TableInstance<TData>;
        }) => Partial<Omit<TablePaginationProps, 'rowsPerPage'>>);
    tablePaperProps?:
      | PaperProps
      | ((props: { table: TRT_TableInstance<TData> }) => PaperProps);
    tableProps?:
      | TableProps
      | ((props: { table: TRT_TableInstance<TData> }) => TableProps);
    toolbarAlertBannerChipProps?:
      | ChipProps
      | ((props: { table: TRT_TableInstance<TData> }) => ChipProps);
    toolbarAlertBannerProps?:
      | AlertProps
      | ((props: { table: TRT_TableInstance<TData> }) => AlertProps);
    topToolbarProps?:
      | ToolbarProps
      | ((props: { table: TRT_TableInstance<TData> }) => ToolbarProps);
    onDensityChange?: OnChangeFn<TRT_DensityState>;
    onDraggingColumnChange?: OnChangeFn<TRT_Column<TData> | null>;
    onDraggingRowChange?: OnChangeFn<TRT_Row<TData> | null>;
    onEditingCellChange?: OnChangeFn<TRT_Cell<TData> | null>;
    onEditingRowCancel?: (props: {
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => void;
    onEditingRowSave?: (props: {
      exitEditingMode: () => void;
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
      values: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
    }) => Promise<void> | void;
    onEditingRowChange?: OnChangeFn<TRT_Row<TData> | null>;
    onColumnFilterFnsChange?: OnChangeFn<{ [key: string]: TRT_FilterOption }>;
    onGlobalFilterFnChange?: OnChangeFn<TRT_FilterOption>;
    onHoveredColumnChange?: OnChangeFn<TRT_Column<TData> | null>;
    onHoveredRowChange?: OnChangeFn<TRT_Row<TData> | null>;
    onIsFullScreenChange?: OnChangeFn<boolean>;
    onShowAlertBannerChange?: OnChangeFn<boolean>;
    onShowColumnFiltersChange?: OnChangeFn<boolean>;
    onShowGlobalFilterChange?: OnChangeFn<boolean>;
    onShowToolbarDropZoneChange?: OnChangeFn<boolean>;
    positionActionsColumn?: 'first' | 'last';
    positionExpandColumn?: 'first' | 'last';
    positionGlobalFilter?: 'left' | 'right' | 'none';
    positionPagination?: 'bottom' | 'top' | 'both' | 'none';
    positionToolbarAlertBanner?: 'bottom' | 'top' | 'none';
    positionToolbarDropZone?: 'bottom' | 'top' | 'none' | 'both';
    renderBottomToolbar?:
      | ReactNode
      | ((props: { table: TRT_TableInstance<TData> }) => ReactNode);
    renderBottomToolbarCustomActions?: (props: {
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    renderColumnActionsMenuItems?: (props: {
      column: TRT_Column<TData>;
      closeMenu: () => void;
      table: TRT_TableInstance<TData>;
    }) => ReactNode[];
    renderColumnFilterModeMenuItems?: (props: {
      column: TRT_Column<TData>;
      internalFilterOptions: TRT_InternalFilterOption[];
      onSelectFilterMode: (filterMode: TRT_FilterOption) => void;
      table: TRT_TableInstance<TData>;
    }) => ReactNode[];
    renderDetailPanel?: (props: {
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    renderGlobalFilterModeMenuItems?: (props: {
      internalFilterOptions: TRT_InternalFilterOption[];
      onSelectFilterMode: (filterMode: TRT_FilterOption) => void;
      table: TRT_TableInstance<TData>;
    }) => ReactNode[];
    renderEmptyRowsFallback?: (props: {
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    renderRowActionMenuItems?: (props: {
      closeMenu: () => void;
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode[];
    renderRowActions?: (props: {
      cell: TRT_Cell<TData>;
      row: TRT_Row<TData>;
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    renderToolbarInternalActions?: (props: {
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    renderTopToolbar?:
      | ReactNode
      | ((props: { table: TRT_TableInstance<TData> }) => ReactNode);
    renderTopToolbarCustomActions?: (props: {
      table: TRT_TableInstance<TData>;
    }) => ReactNode;
    rowCount?: number;
    rowNumberMode?: 'original' | 'static';
    selectAllMode?: 'all' | 'page';
    /**
     * Manage state externally any way you want, then pass it back into MRT.
     */
    state?: Partial<TRT_TableState<TData>>;
    /**
     * Sequence of features important any dependent feature must be defined first
     */
    tableFeatures?: Array<TRT_CreateTableFeature<TData>>;
    /**
     * Get access to the table instance via a ref to read state or call built-in methods
     */
    tableInstanceRef?: MutableRefObject<TRT_TableInstance<TData> | null>;
    /**
     * @deprecated Use `rowVirtualizerInstanceRef` instead
     */
    virtualizerInstanceRef?: any;
    /**
     * @deprecated Use `rowVirtualizerProps` instead
     */
    virtualizerProps?: any;
  }
> & {
  columnVirtualizerInstanceRef?: MutableRefObject<Virtualizer<
    HTMLDivElement,
    HTMLTableCellElement
  > | null>;
  columnVirtualizerProps?:
    | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>>
    | ((props: {
        table: TRT_TableInstance<TData>;
      }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>>);
  rowVirtualizerInstanceRef?: MutableRefObject<Virtualizer<
    HTMLDivElement,
    HTMLTableRowElement
  > | null>;
  rowVirtualizerProps?:
    | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>
    | ((props: {
        table: TRT_TableInstance<TData>;
      }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>);
};
