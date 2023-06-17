import {
  type Dispatch,
  type MutableRefObject,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { type AlertProps } from '@mui/material/Alert';
import { type ButtonProps } from '@mui/material/Button';
import { type CheckboxProps } from '@mui/material/Checkbox';
import { type ChipProps } from '@mui/material/Chip';
import { type IconButtonProps } from '@mui/material/IconButton';
import { type LinearProgressProps } from '@mui/material/LinearProgress';
import { type PaperProps } from '@mui/material/Paper';
import { type RadioProps } from '@mui/material/Radio';
import { type SkeletonProps } from '@mui/material/Skeleton';
import { type SliderProps } from '@mui/material';
import { type TableBodyProps } from '@mui/material/TableBody';
import { type TableCellProps } from '@mui/material/TableCell';
import { type TableContainerProps } from '@mui/material/TableContainer';
import { type TableFooterProps } from '@mui/material/TableFooter';
import { type TableHeadProps } from '@mui/material/TableHead';
import { type TablePaginationProps } from '@mui/material/TablePagination';
import { type TableProps } from '@mui/material/Table';
import { type TableRowProps } from '@mui/material/TableRow';
import { type TextFieldProps } from '@mui/material/TextField';
import { type ToolbarProps } from '@mui/material/Toolbar';
import {
  type AggregationFn,
  type Cell,
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnOrderState,
  type ColumnPinningState,
  type ColumnSizingInfoState,
  type ColumnSizingState,
  type DeepKeys,
  type ExpandedState,
  type FilterFn,
  type GroupingState,
  type Header,
  type HeaderGroup,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingFn,
  type SortingState,
  type Table,
  type TableOptions,
  type TableState,
  type Updater,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  type VirtualizerOptions,
  type Virtualizer,
  type VirtualItem,
} from '@tanstack/react-virtual';
import { type MRT_AggregationFns } from './aggregationFns';
import { type MRT_FilterFns } from './filterFns';
import { type MRT_SortingFns } from './sortingFns';
import { type MRT_Icons } from './icons';

export type { MRT_Icons };

type Prettify<T> = { [K in keyof T]: T[K] } & {};

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export type MRT_DensityState = 'comfortable' | 'compact' | 'spacious';

export type MRT_FilterFnsState = Record<string, MRT_FilterOption>;

export type {
  ColumnFiltersState as MRT_ColumnFiltersState,
  ColumnOrderState as MRT_ColumnOrderState,
  ColumnPinningState as MRT_ColumnPinningState,
  ColumnSizingInfoState as MRT_ColumnSizingInfoState,
  ColumnSizingState as MRT_ColumnSizingState,
  ExpandedState as MRT_ExpandedState,
  GroupingState as MRT_GroupingState,
  PaginationState as MRT_PaginationState,
  RowSelectionState as MRT_RowSelectionState,
  SortingState as MRT_SortingState,
  Updater as MRT_Updater,
  VirtualItem as MRT_VirtualItem,
  Virtualizer as MRT_Virtualizer,
  VirtualizerOptions as MRT_VirtualizerOptions,
  VisibilityState as MRT_VisibilityState,
};

export interface MRT_Localization {
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

export interface MRT_RowModel<TData extends Record<string, any> = {}> {
  flatRows: MRT_Row<TData>[];
  rows: MRT_Row<TData>[];
  rowsById: { [key: string]: MRT_Row<TData> };
}

export type MRT_TableInstance<TData extends Record<string, any> = {}> =
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
      getAllColumns: () => MRT_Column<TData>[];
      getAllFlatColumns: () => MRT_Column<TData>[];
      getAllLeafColumns: () => MRT_Column<TData>[];
      getCenterLeafColumns: () => MRT_Column<TData>[];
      getColumn: (columnId: string) => MRT_Column<TData>;
      getExpandedRowModel: () => MRT_RowModel<TData>;
      getFlatHeaders: () => MRT_Header<TData>[];
      getLeftLeafColumns: () => MRT_Column<TData>[];
      getPaginationRowModel: () => MRT_RowModel<TData>;
      getPreFilteredRowModel: () => MRT_RowModel<TData>;
      getPrePaginationRowModel: () => MRT_RowModel<TData>;
      getRightLeafColumns: () => MRT_Column<TData>[];
      getRowModel: () => MRT_RowModel<TData>;
      getSelectedRowModel: () => MRT_RowModel<TData>;
      getState: () => MRT_TableState<TData>;
      options: MaterialReactTableProps<TData> & {
        icons: MRT_Icons;
        localization: MRT_Localization;
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
      setColumnFilterFns: Dispatch<SetStateAction<MRT_FilterFnsState>>;
      setDensity: Dispatch<SetStateAction<MRT_DensityState>>;
      setDraggingColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
      setDraggingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
      setEditingCell: Dispatch<SetStateAction<MRT_Cell<TData> | null>>;
      setEditingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
      setGlobalFilterFn: Dispatch<SetStateAction<MRT_FilterOption>>;
      setHoveredColumn: Dispatch<
        SetStateAction<MRT_Column<TData> | { id: string } | null>
      >;
      setHoveredRow: Dispatch<
        SetStateAction<MRT_Row<TData> | { id: string } | null>
      >;
      setIsFullScreen: Dispatch<SetStateAction<boolean>>;
      setShowAlertBanner: Dispatch<SetStateAction<boolean>>;
      setShowColumnFilters: Dispatch<SetStateAction<boolean>>;
      setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
      setShowToolbarDropZone: Dispatch<SetStateAction<boolean>>;
    }
  >;

export type MRT_TableState<TData extends Record<string, any> = {}> = Prettify<
  TableState & {
    columnFilterFns: MRT_FilterFnsState;
    density: MRT_DensityState;
    draggingColumn: MRT_Column<TData> | null;
    draggingRow: MRT_Row<TData> | null;
    editingCell: MRT_Cell<TData> | null;
    editingRow: MRT_Row<TData> | null;
    globalFilterFn: MRT_FilterOption;
    hoveredColumn: MRT_Column<TData> | { id: string } | null;
    hoveredRow: MRT_Row<TData> | { id: string } | null;
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

export type MRT_ColumnDef<TData extends Record<string, any> = {}> =
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
      cell: MRT_Cell<TData>;
      column: MRT_Column<TData>;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    Cell?: (props: {
      cell: MRT_Cell<TData>;
      renderedCellValue: number | string | ReactNode;
      column: MRT_Column<TData>;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    Edit?: (props: {
      cell: MRT_Cell<TData>;
      column: MRT_Column<TData>;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    Filter?: (props: {
      column: MRT_Column<TData>;
      header: MRT_Header<TData>;
      rangeFilterIndex?: number;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    Footer?:
      | ReactNode
      | ((props: {
          column: MRT_Column<TData>;
          footer: MRT_Header<TData>;
          table: MRT_TableInstance<TData>;
        }) => ReactNode);
    GroupedCell?: (props: {
      cell: MRT_Cell<TData>;
      column: MRT_Column<TData>;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    Header?:
      | ReactNode
      | ((props: {
          column: MRT_Column<TData>;
          header: MRT_Header<TData>;
          table: MRT_TableInstance<TData>;
        }) => ReactNode);
    PlaceholderCell?: (props: {
      cell: MRT_Cell<TData>;
      column: MRT_Column<TData>;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
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
    aggregationFn?: MRT_AggregationFn<TData> | Array<MRT_AggregationFn<TData>>;
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
      LiteralUnion<string & MRT_FilterOption>
    > | null;
    columns?: MRT_ColumnDef<TData>[];
    editSelectOptions?: (string | { text: string; value: any })[];
    editVariant?: 'text' | 'select';
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
    enableColumnDragging?: boolean;
    enableColumnFilterModes?: boolean;
    enableColumnOrdering?: boolean;
    enableEditing?: boolean | ((row: MRT_Row<TData>) => boolean);
    enableFilterMatchHighlighting?: boolean;
    filterFn?: MRT_FilterFn<TData>;
    filterSelectOptions?: (string | { text: string; value: any })[];
    filterVariant?:
      | 'checkbox'
      | 'multi-select'
      | 'range'
      | 'range-slider'
      | 'select'
      | 'text';
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
    muiTableBodyCellCopyButtonProps?:
      | ButtonProps
      | ((props: {
          cell: MRT_Cell<TData>;
          column: MRT_Column<TData>;
          row: MRT_Row<TData>;
          table: MRT_TableInstance<TData>;
        }) => ButtonProps);
    muiTableBodyCellEditTextFieldProps?:
      | TextFieldProps
      | ((props: {
          cell: MRT_Cell<TData>;
          column: MRT_Column<TData>;
          row: MRT_Row<TData>;
          table: MRT_TableInstance<TData>;
        }) => TextFieldProps);
    muiTableBodyCellProps?:
      | TableCellProps
      | ((props: {
          cell: MRT_Cell<TData>;
          column: MRT_Column<TData>;
          row: MRT_Row<TData>;
          table: MRT_TableInstance<TData>;
        }) => TableCellProps);
    muiTableFooterCellProps?:
      | TableCellProps
      | ((props: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => TableCellProps);
    muiTableHeadCellColumnActionsButtonProps?:
      | IconButtonProps
      | ((props: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => IconButtonProps);
    muiTableHeadCellDragHandleProps?:
      | IconButtonProps
      | ((props: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => IconButtonProps);
    muiTableHeadCellFilterCheckboxProps?:
      | CheckboxProps
      | ((props: {
          column: MRT_Column<TData>;
          table: MRT_TableInstance<TData>;
        }) => CheckboxProps);
    muiTableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | ((props: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
          rangeFilterIndex?: number;
        }) => TextFieldProps);
    muiTableHeadCellFilterSliderProps?:
      | SliderProps
      | ((props: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => TextFieldProps);
    muiTableHeadCellProps?:
      | TableCellProps
      | ((props: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => TableCellProps);
    renderColumnActionsMenuItems?: (props: {
      closeMenu: () => void;
      column: MRT_Column<TData>;
      internalColumnMenuItems: ReactNode[];
      table: MRT_TableInstance<TData>;
    }) => ReactNode[];
    renderColumnFilterModeMenuItems?: (props: {
      column: MRT_Column<TData>;
      internalFilterOptions: MRT_InternalFilterOption[];
      onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
      table: MRT_TableInstance<TData>;
    }) => ReactNode[];
    sortingFn?: MRT_SortingFn<TData>;
  };
// >

export type MRT_DefinedColumnDef<TData extends Record<string, any> = {}> =
  // Prettify<
  Omit<MRT_ColumnDef<TData>, 'id' | 'defaultDisplayColumn'> & {
    defaultDisplayColumn: Partial<MRT_ColumnDef<TData>>;
    id: string;
    _filterFn: MRT_FilterOption;
  };
// >

export type MRT_Column<TData extends Record<string, any> = {}> =
  // Prettify<
  Omit<
    Column<TData, unknown>,
    'header' | 'footer' | 'columns' | 'columnDef' | 'filterFn'
  > & {
    columnDef: MRT_DefinedColumnDef<TData>;
    columns?: MRT_Column<TData>[];
    filterFn?: MRT_FilterFn<TData>;
    footer: string;
    header: string;
  };
// >;

export type MRT_Header<TData extends Record<string, any> = {}> = Prettify<
  Omit<Header<TData, unknown>, 'column'> & {
    column: MRT_Column<TData>;
  }
>;

export type MRT_HeaderGroup<TData extends Record<string, any> = {}> = Prettify<
  Omit<HeaderGroup<TData>, 'headers'> & {
    headers: MRT_Header<TData>[];
  }
>;

export type MRT_Row<TData extends Record<string, any> = {}> = Prettify<
  Omit<
    Row<TData>,
    'getVisibleCells' | 'getAllCells' | 'subRows' | '_valuesCache'
  > & {
    getAllCells: () => MRT_Cell<TData>[];
    getVisibleCells: () => MRT_Cell<TData>[];
    subRows?: MRT_Row<TData>[];
    _valuesCache: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
  }
>;

export type MRT_Cell<TData extends Record<string, any> = {}> = Prettify<
  Omit<Cell<TData, unknown>, 'column' | 'row'> & {
    column: MRT_Column<TData>;
    row: MRT_Row<TData>;
  }
>;

export type MRT_AggregationOption = string & keyof typeof MRT_AggregationFns;

export type MRT_AggregationFn<TData extends Record<string, any> = {}> =
  | AggregationFn<TData>
  | MRT_AggregationOption;

export type MRT_SortingOption = LiteralUnion<
  string & keyof typeof MRT_SortingFns
>;

export type MRT_SortingFn<TData extends Record<string, any> = {}> =
  | SortingFn<TData>
  | MRT_SortingOption;

export type MRT_FilterOption = LiteralUnion<
  string & keyof typeof MRT_FilterFns
>;

export type MRT_FilterFn<TData extends Record<string, any> = {}> =
  | FilterFn<TData>
  | MRT_FilterOption;

export type MRT_InternalFilterOption = {
  option: string;
  symbol: string;
  label: string;
  divider: boolean;
};

export type MRT_DisplayColumnIds =
  | 'mrt-row-actions'
  | 'mrt-row-drag'
  | 'mrt-row-expand'
  | 'mrt-row-numbers'
  | 'mrt-row-select';

export type MRT_CreateTableFeature<
  TData extends Record<string, any> = {},
  TFeature = any,
> = (table: MRT_TableInstance<TData>) => TFeature;

/**
 * `columns` and `data` props are the only required props, but there are over 170 other optional props.
 *
 * See more info on creating columns and data on the official docs site:
 * @link https://www.material-react-table.com/docs/getting-started/usage
 *
 * See the full props list on the official docs site:
 * @link https://www.material-react-table.com/docs/api/props
 */
export type MaterialReactTableProps<TData extends Record<string, any> = {}> =
  Prettify<
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
      columnFilterModeOptions?: Array<
        LiteralUnion<string & MRT_FilterOption>
      > | null;
      /**
       * The columns to display in the table. `accessorKey`s or `accessorFn`s must match keys in the `data` prop.
       *
       * See more info on creating columns on the official docs site:
       * @link https://www.material-react-table.com/docs/guides/data-columns
       * @link https://www.material-react-table.com/docs/guides/display-columns
       *
       * See all Columns Options on the official docs site:
       * @link https://www.material-react-table.com/docs/api/column-options
       */
      columns: MRT_ColumnDef<TData>[];
      /**
       * Pass your data as an array of objects. Objects can theoretically be any shape, but it's best to keep them consistent.
       *
       * See the usage guide for more info on creating columns and data:
       * @link https://www.material-react-table.com/docs/getting-started/usage
       */
      data: TData[];
      /**
       * Instead of specifying a bunch of the same options for each column, you can just change an option in the `defaultColumn` prop to change a default option for all columns.
       */
      defaultColumn?: Partial<MRT_ColumnDef<TData>>;
      /**
       * Change the default options for display columns.
       */
      defaultDisplayColumn?: Partial<MRT_ColumnDef<TData>>;
      displayColumnDefOptions?: Partial<{
        [key in MRT_DisplayColumnIds]: Partial<MRT_ColumnDef>;
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
      enableEditing?: boolean | ((row: MRT_Row<TData>) => boolean);
      enableExpandAll?: boolean;
      enableFacetedValues?: boolean;
      enableFilterMatchHighlighting?: boolean;
      enableFullScreenToggle?: boolean;
      enableGlobalFilterModes?: boolean;
      enableGlobalFilterRankedResults?: boolean;
      enablePagination?: boolean;
      enableRowActions?: boolean;
      enableRowDragging?: boolean;
      enableRowNumbers?: boolean;
      enableRowOrdering?: boolean;
      enableRowSelection?: boolean | ((row: MRT_Row<TData>) => boolean);
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
        parentRow: MRT_Row<TData>,
      ) => string;
      globalFilterFn?: MRT_FilterOption;
      globalFilterModeOptions?: MRT_FilterOption[] | null;
      icons?: Partial<MRT_Icons>;
      initialState?: Partial<MRT_TableState<TData>>;
      /**
       * Changes which kind of CSS layout is used to render the table. `semantic` uses default semantic HTML elements, while `grid` adds CSS grid and flexbox styles
       */
      layoutMode?: 'semantic' | 'grid';
      /**
       * Pass in either a locale imported from `material-react-table/locales/*` or a custom locale object.
       *
       * See the localization (i18n) guide for more info:
       * @link https://www.material-react-table.com/docs/guides/localization
       */
      localization?: Partial<MRT_Localization>;
      /**
       * Memoize cells, rows, or the entire table body to potentially improve render performance.
       *
       * @warning This will break some dynamic rendering features. See the memoization guide for more info:
       * @link https://www.material-react-table.com/docs/guides/memoize-components
       */
      memoMode?: 'cells' | 'rows' | 'table-body';
      muiBottomToolbarProps?:
        | ToolbarProps
        | ((props: { table: MRT_TableInstance<TData> }) => ToolbarProps);
      muiExpandAllButtonProps?:
        | IconButtonProps
        | ((props: { table: MRT_TableInstance<TData> }) => IconButtonProps);
      muiExpandButtonProps?:
        | IconButtonProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            row: MRT_Row<TData>;
          }) => IconButtonProps);
      muiLinearProgressProps?:
        | LinearProgressProps
        | ((props: {
            isTopToolbar: boolean;
            table: MRT_TableInstance<TData>;
          }) => LinearProgressProps);
      muiSearchTextFieldProps?:
        | TextFieldProps
        | ((props: { table: MRT_TableInstance<TData> }) => TextFieldProps);
      muiSelectAllCheckboxProps?:
        | CheckboxProps
        | ((props: { table: MRT_TableInstance<TData> }) => CheckboxProps);
      muiSelectCheckboxProps?:
        | (CheckboxProps | RadioProps)
        | ((props: {
            table: MRT_TableInstance<TData>;
            row: MRT_Row<TData>;
          }) => CheckboxProps | RadioProps);
      muiTableBodyCellCopyButtonProps?:
        | ButtonProps
        | ((props: {
            cell: MRT_Cell<TData>;
            column: MRT_Column<TData>;
            row: MRT_Row<TData>;
            table: MRT_TableInstance<TData>;
          }) => ButtonProps);
      muiTableBodyCellEditTextFieldProps?:
        | TextFieldProps
        | ((props: {
            cell: MRT_Cell<TData>;
            column: MRT_Column<TData>;
            row: MRT_Row<TData>;
            table: MRT_TableInstance<TData>;
          }) => TextFieldProps);
      muiTableBodyCellProps?:
        | TableCellProps
        | ((props: {
            cell: MRT_Cell<TData>;
            column: MRT_Column<TData>;
            row: MRT_Row<TData>;
            table: MRT_TableInstance<TData>;
          }) => TableCellProps);
      muiTableBodyCellSkeletonProps?:
        | SkeletonProps
        | ((props: {
            cell: MRT_Cell<TData>;
            column: MRT_Column<TData>;
            row: MRT_Row<TData>;
            table: MRT_TableInstance<TData>;
          }) => SkeletonProps);
      muiTableBodyProps?:
        | TableBodyProps
        | ((props: { table: MRT_TableInstance<TData> }) => TableBodyProps);
      muiTableBodyRowDragHandleProps?:
        | IconButtonProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            row: MRT_Row<TData>;
          }) => IconButtonProps);
      muiTableBodyRowProps?:
        | TableRowProps
        | ((props: {
            isDetailPanel?: boolean;
            row: MRT_Row<TData>;
            staticRowIndex: number;
            table: MRT_TableInstance<TData>;
          }) => TableRowProps);
      muiTableContainerProps?:
        | TableContainerProps
        | ((props: { table: MRT_TableInstance<TData> }) => TableContainerProps);
      muiTableDetailPanelProps?:
        | TableCellProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            row: MRT_Row<TData>;
          }) => TableCellProps);
      muiTableFooterCellProps?:
        | TableCellProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            column: MRT_Column<TData>;
          }) => TableCellProps);
      muiTableFooterProps?:
        | TableFooterProps
        | ((props: { table: MRT_TableInstance<TData> }) => TableFooterProps);
      muiTableFooterRowProps?:
        | TableRowProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            footerGroup: MRT_HeaderGroup<TData>;
          }) => TableRowProps);
      muiTableHeadCellColumnActionsButtonProps?:
        | IconButtonProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            column: MRT_Column<TData>;
          }) => IconButtonProps);
      muiTableHeadCellDragHandleProps?:
        | IconButtonProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            column: MRT_Column<TData>;
          }) => IconButtonProps);
      muiTableHeadCellFilterCheckboxProps?:
        | CheckboxProps
        | ((props: {
            column: MRT_Column<TData>;
            table: MRT_TableInstance<TData>;
          }) => CheckboxProps);
      muiTableHeadCellFilterTextFieldProps?:
        | TextFieldProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            column: MRT_Column<TData>;
            rangeFilterIndex?: number;
          }) => TextFieldProps);
      muiTableHeadCellFilterSliderProps?:
        | SliderProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            column: MRT_Column<TData>;
          }) => TextFieldProps);
      muiTableHeadCellProps?:
        | TableCellProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            column: MRT_Column<TData>;
          }) => TableCellProps);
      muiTableHeadProps?:
        | TableHeadProps
        | ((props: { table: MRT_TableInstance<TData> }) => TableHeadProps);
      muiTableHeadRowProps?:
        | TableRowProps
        | ((props: {
            table: MRT_TableInstance<TData>;
            headerGroup: MRT_HeaderGroup<TData>;
          }) => TableRowProps);
      muiTablePaginationProps?:
        | Partial<Omit<TablePaginationProps, 'rowsPerPage'>>
        | ((props: {
            table: MRT_TableInstance<TData>;
          }) => Partial<Omit<TablePaginationProps, 'rowsPerPage'>>);
      muiTablePaperProps?:
        | PaperProps
        | ((props: { table: MRT_TableInstance<TData> }) => PaperProps);
      muiTableProps?:
        | TableProps
        | ((props: { table: MRT_TableInstance<TData> }) => TableProps);
      muiToolbarAlertBannerChipProps?:
        | ChipProps
        | ((props: { table: MRT_TableInstance<TData> }) => ChipProps);
      muiToolbarAlertBannerProps?:
        | AlertProps
        | ((props: { table: MRT_TableInstance<TData> }) => AlertProps);
      muiTopToolbarProps?:
        | ToolbarProps
        | ((props: { table: MRT_TableInstance<TData> }) => ToolbarProps);
      onDensityChange?: OnChangeFn<MRT_DensityState>;
      onDraggingColumnChange?: OnChangeFn<MRT_Column<TData> | null>;
      onDraggingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
      onEditingCellChange?: OnChangeFn<MRT_Cell<TData> | null>;
      onEditingRowCancel?: (props: {
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => void;
      onEditingRowSave?: (props: {
        exitEditingMode: () => void;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
        values: Record<LiteralUnion<string & DeepKeys<TData>>, any>;
      }) => Promise<void> | void;
      onEditingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
      onColumnFilterFnsChange?: OnChangeFn<{ [key: string]: MRT_FilterOption }>;
      onGlobalFilterFnChange?: OnChangeFn<MRT_FilterOption>;
      onHoveredColumnChange?: OnChangeFn<MRT_Column<TData> | null>;
      onHoveredRowChange?: OnChangeFn<MRT_Row<TData> | null>;
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
        | ((props: { table: MRT_TableInstance<TData> }) => ReactNode);
      renderBottomToolbarCustomActions?: (props: {
        table: MRT_TableInstance<TData>;
      }) => ReactNode;
      renderColumnActionsMenuItems?: (props: {
        column: MRT_Column<TData>;
        closeMenu: () => void;
        internalColumnMenuItems: ReactNode[];
        table: MRT_TableInstance<TData>;
      }) => ReactNode[];
      renderColumnFilterModeMenuItems?: (props: {
        column: MRT_Column<TData>;
        internalFilterOptions: MRT_InternalFilterOption[];
        onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
        table: MRT_TableInstance<TData>;
      }) => ReactNode[];
      renderDetailPanel?: (props: {
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode;
      renderGlobalFilterModeMenuItems?: (props: {
        internalFilterOptions: MRT_InternalFilterOption[];
        onSelectFilterMode: (filterMode: MRT_FilterOption) => void;
        table: MRT_TableInstance<TData>;
      }) => ReactNode[];
      renderEmptyRowsFallback?: (props: {
        table: MRT_TableInstance<TData>;
      }) => ReactNode;
      renderRowActionMenuItems?: (props: {
        closeMenu: () => void;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode[];
      renderRowActions?: (props: {
        cell: MRT_Cell<TData>;
        row: MRT_Row<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode;
      renderToolbarInternalActions?: (props: {
        table: MRT_TableInstance<TData>;
      }) => ReactNode;
      renderTopToolbar?:
        | ReactNode
        | ((props: { table: MRT_TableInstance<TData> }) => ReactNode);
      renderTopToolbarCustomActions?: (props: {
        table: MRT_TableInstance<TData>;
      }) => ReactNode;
      rowCount?: number;
      rowNumberMode?: 'original' | 'static';
      selectAllMode?: 'all' | 'page';
      /**
       * Manage state externally any way you want, then pass it back into MRT.
       */
      state?: Partial<MRT_TableState<TData>>;
      /**
       * Sequence of features important any dependent feature must be defined first
       */
      tableFeatures?: Array<MRT_CreateTableFeature<TData>>;
      /**
       * Get access to the table instance via a ref to read state or call built-in methods
       */
      tableInstanceRef?: MutableRefObject<MRT_TableInstance<TData> | null>;
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
          table: MRT_TableInstance<TData>;
        }) => Partial<
          VirtualizerOptions<HTMLDivElement, HTMLTableCellElement>
        >);
    rowVirtualizerInstanceRef?: MutableRefObject<Virtualizer<
      HTMLDivElement,
      HTMLTableRowElement
    > | null>;
    rowVirtualizerProps?:
      | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>
      | ((props: {
          table: MRT_TableInstance<TData>;
        }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>);
  };
