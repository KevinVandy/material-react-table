import React, {
  ChangeEvent,
  Dispatch,
  DragEvent,
  FC,
  FocusEvent,
  ReactNode,
  SetStateAction,
} from 'react';
import type {
  AlertProps,
  ButtonProps,
  CheckboxProps,
  IconButtonProps,
  LinearProgressProps,
  PaperProps,
  SkeletonProps,
  TableBodyProps,
  TableCellProps,
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TableRowProps,
  TextFieldProps,
  ToolbarProps,
} from '@mui/material';
import type {
  Cell,
  Column,
  ColumnDef,
  DeepKeys,
  FilterFn,
  Header,
  HeaderGroup,
  OnChangeFn,
  Row,
  SortingFn,
  Table,
  TableOptions,
  TableState,
} from '@tanstack/react-table';
import type { VirtualizerOptions } from '@tanstack/react-virtual';
import { MRT_AggregationFns } from './aggregationFns';
import { MRT_Default_Icons, MRT_Icons } from './icons';
import { MRT_FilterFns } from './filterFns';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_SortingFns } from './sortingFns';
import { MRT_TableRoot } from './table/MRT_TableRoot';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export interface MRT_RowModel<TData extends Record<string, any> = {}> {
  flatRows: MRT_Row<TData>[];
  rows: MRT_Row<TData>[];
  rowsById: { [key: string]: MRT_Row<TData> };
}

export type MRT_TableInstance<TData extends Record<string, any> = {}> = Omit<
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
    tableId: string;
    localization: MRT_Localization;
  };
  setCurrentDraggingColumn: Dispatch<SetStateAction<MRT_Column<TData> | null>>;
  setCurrentDraggingRow: Dispatch<SetStateAction<MRT_Row<TData> | null>>;
  setCurrentEditingCell: Dispatch<SetStateAction<MRT_Cell | null>>;
  setCurrentEditingRow: Dispatch<SetStateAction<MRT_Row | null>>;
  setColumnFilterFns: Dispatch<
    SetStateAction<{
      [key: string]: MRT_FilterOption;
    }>
  >;
  setGlobalFilterFn: Dispatch<SetStateAction<MRT_FilterOption>>;
  setCurrentHoveredColumn: Dispatch<
    SetStateAction<MRT_Column<TData> | { id: string } | null>
  >;
  setCurrentHoveredRow: Dispatch<
    SetStateAction<MRT_Row<TData> | { id: string } | null>
  >;
  setDensity: Dispatch<SetStateAction<'comfortable' | 'compact' | 'spacious'>>;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setShowAlertBanner: Dispatch<SetStateAction<boolean>>;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
};

export type MRT_TableState<TData extends Record<string, any> = {}> =
  TableState & {
    currentDraggingColumn: MRT_Column<TData> | null;
    currentDraggingRow: MRT_Row<TData> | null;
    currentEditingCell: MRT_Cell<TData> | null;
    currentEditingRow: MRT_Row<TData> | null;
    columnFilterFns: Record<string, MRT_FilterOption>;
    globalFilterFn: Record<string, MRT_FilterOption>;
    currentHoveredColumn: MRT_Column<TData> | { id: string } | null;
    currentHoveredRow: MRT_Row<TData> | { id: string } | null;
    density: 'comfortable' | 'compact' | 'spacious';
    isFullScreen: boolean;
    isLoading: boolean;
    showAlertBanner: boolean;
    showColumnFilters: boolean;
    showGlobalFilter: boolean;
    showProgressBars: boolean;
    showSkeletons: boolean;
  };

export type MRT_ColumnDef<TData extends Record<string, any> = {}> = Omit<
  ColumnDef<TData, unknown>,
  | 'aggregatedCell'
  | 'cell'
  | 'columns'
  | 'filterFn'
  | 'footer'
  | 'header'
  | 'id'
  | 'sortingFn'
> & {
  AggregatedCell?: ({
    cell,
    column,
    table,
  }: {
    cell: MRT_Cell<TData>;
    column: MRT_Column<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Cell?: ({
    cell,
    column,
    table,
  }: {
    cell: MRT_Cell<TData>;
    column: MRT_Column<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Edit?: ({
    cell,
    column,
    table,
  }: {
    cell: MRT_Cell<TData>;
    column: MRT_Column<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Filter?: ({
    column,
    header,
    table,
  }: {
    column: MRT_Column<TData>;
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
  }) => ReactNode;
  Footer?:
    | ReactNode
    | (({
        column,
        footer,
        table,
      }: {
        column: MRT_Column<TData>;
        footer: MRT_Header<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode);
  Header?:
    | ReactNode
    | (({
        column,
        header,
        table,
      }: {
        column: MRT_Column<TData>;
        header: MRT_Header<TData>;
        table: MRT_TableInstance<TData>;
      }) => ReactNode);
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   * Specify a function here to point to the correct property in the data object.
   *
   * @example accessorFn: (row) => row.username
   */
  accessorFn?: (row: TData) => any;
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   * Specify which key in the row this column should use to access the correct data.
   * Also supports Deep Key Dot Notation.
   *
   * @example accessorKey: 'username' //simple
   * @example accessorKey: 'name.firstName' //deep key dot notation
   */
  accessorKey?: DeepKeys<TData>;
  /**
   * Specify what type of column this is. Either `data`, `display`, or `group`. Defaults to `data`.
   * Leave this blank if you are just creating a normal data column.
   *
   * @default 'data'
   *
   * @example columnDefType: 'display'
   */
  columnDefType?: 'data' | 'display' | 'group';
  columnFilterModeOptions?: MRT_FilterOption[] | null;
  columns?: MRT_ColumnDef<TData>[];
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnDragging?: boolean;
  enableColumnFilterChangeMode?: boolean;
  enableColumnOrdering?: boolean;
  enableEditing?: boolean;
  filterFn?: MRT_FilterFn<TData>;
  filterSelectOptions?: (string | { text: string; value: string })[];
  filterVariant?: 'text' | 'select' | 'multi-select' | 'range';
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
    | (({
        table,
        cell,
      }: {
        table: MRT_TableInstance<TData>;
        cell: MRT_Cell<TData>;
      }) => ButtonProps);
  muiTableBodyCellEditTextFieldProps?:
    | TextFieldProps
    | (({
        table,
        cell,
      }: {
        table: MRT_TableInstance<TData>;
        cell: MRT_Cell<TData>;
      }) => TextFieldProps);
  muiTableBodyCellProps?:
    | TableCellProps
    | (({
        table,
        cell,
      }: {
        table: MRT_TableInstance<TData>;
        cell: MRT_Cell<TData>;
      }) => TableCellProps);
  muiTableFooterCellProps?:
    | TableCellProps
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
      }) => TableCellProps);
  muiTableHeadCellColumnActionsButtonProps?:
    | IconButtonProps
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
      }) => IconButtonProps);
  muiTableHeadCellDragHandleProps?:
    | IconButtonProps
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
      }) => IconButtonProps);
  muiTableHeadCellFilterTextFieldProps?:
    | TextFieldProps
    | (({
        table,
        column,
        rangeFilterIndex,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
        rangeFilterIndex?: number;
      }) => TextFieldProps);
  muiTableHeadCellProps?:
    | TableCellProps
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<TData>;
        column: MRT_Column<TData>;
      }) => TableCellProps);
  onCellEditBlur?: ({
    cell,
    event,
    table,
  }: {
    event: FocusEvent<HTMLInputElement>;
    cell: MRT_Cell<TData>;
    table: MRT_TableInstance<TData>;
  }) => void;
  onCellEditChange?: ({
    cell,
    event,
    table,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    cell: MRT_Cell<TData>;
    table: MRT_TableInstance<TData>;
  }) => void;
  sortingFn?: MRT_SortingFn;
};

export type MRT_DefinedColumnDef<TData extends Record<string, any> = {}> = Omit<
  MRT_ColumnDef<TData>,
  'id'
> & {
  id: string;
  _filterFn: MRT_FilterOption;
};

export type MRT_Column<TData extends Record<string, any> = {}> = Omit<
  Column<TData, unknown>,
  'header' | 'footer' | 'columns' | 'columnDef' | 'filterFn'
> & {
  columnDef: MRT_DefinedColumnDef<TData>;
  columns?: MRT_Column<TData>[];
  filterFn?: MRT_FilterFn<TData>;
  footer: string;
  header: string;
};

export type MRT_Header<TData extends Record<string, any> = {}> = Omit<
  Header<TData, unknown>,
  'column'
> & {
  column: MRT_Column<TData>;
};

export type MRT_HeaderGroup<TData extends Record<string, any> = {}> = Omit<
  HeaderGroup<TData>,
  'headers'
> & {
  headers: MRT_Header<TData>[];
};

export type MRT_Row<TData extends Record<string, any> = {}> = Omit<
  Row<TData>,
  'getVisibleCells' | 'getAllCells' | 'subRows' | '_valuesCache'
> & {
  getAllCells: () => MRT_Cell<TData>[];
  getVisibleCells: () => MRT_Cell<TData>[];
  subRows?: MRT_Row<TData>[];
  _valuesCache?: TData;
};

export type MRT_Cell<TData extends Record<string, any> = {}> = Omit<
  Cell<TData, unknown>,
  'column' | 'row'
> & {
  column: MRT_Column<TData>;
  row: MRT_Row<TData>;
};

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

export type MRT_DisplayColumnIds =
  | 'mrt-row-drag'
  | 'mrt-row-actions'
  | 'mrt-row-expand'
  | 'mrt-row-select'
  | 'mrt-row-numbers';

/**
 * `columns` and `data` props are the only required props, but there are over 150 other optional props.
 *
 * See more info on creating columns and data on the official docs site:
 * @link https://www.material-react-table.com/docs/getting-started/usage
 *
 * See the full props list on the official docs site:
 * @link https://www.material-react-table.com/docs/api/props
 */
export type MaterialReactTableProps<TData extends Record<string, any> = {}> =
  Omit<
    Partial<TableOptions<TData>>,
    | 'columns'
    | 'data'
    | 'expandRowsFn'
    | 'initialState'
    | 'onStateChange'
    | 'state'
  > & {
    displayColumnDefOptions?: Partial<{
      [key in MRT_DisplayColumnIds]: Partial<MRT_ColumnDef>;
    }>;
    columnFilterModeOptions?: (MRT_FilterOption | string)[] | null;
    columns: MRT_ColumnDef<TData>[];
    data: TData[];
    editingMode?: 'table' | 'row' | 'cell';
    enableBottomToolbar?: boolean;
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
    enableColumnDragging?: boolean;
    enableColumnFilterChangeMode?: boolean;
    enableColumnOrdering?: boolean;
    enableDensityToggle?: boolean;
    enableEditing?: boolean;
    enableExpandAll?: boolean;
    enableFullScreenToggle?: boolean;
    enableGlobalFilterChangeMode?: boolean;
    enableGlobalFilterRankedResults?: boolean;
    enablePagination?: boolean;
    enableRowActions?: boolean;
    enableRowDragging?: boolean;
    enableRowNumbers?: boolean;
    enableRowOrdering?: boolean;
    enableRowVirtualization?: boolean;
    enableSelectAll?: boolean;
    enableStickyHeader?: boolean;
    enableTableFooter?: boolean;
    enableTableHead?: boolean;
    enableToolbarInternalActions?: boolean;
    enableTopToolbar?: boolean;
    enabledGlobalFilterOptions?: (MRT_FilterOption | string)[] | null;
    expandRowsFn?: (dataRow: TData) => TData[];
    icons?: Partial<MRT_Icons>;
    initialState?: Partial<MRT_TableState<TData>>;
    localization?: Partial<MRT_Localization>;
    muiExpandAllButtonProps?:
      | IconButtonProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => IconButtonProps);
    muiExpandButtonProps?:
      | IconButtonProps
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => IconButtonProps);
    muiLinearProgressProps?:
      | LinearProgressProps
      | (({
          isTopToolbar,
          table,
        }: {
          isTopToolbar: boolean;
          table: MRT_TableInstance<TData>;
        }) => LinearProgressProps);
    muiSearchTextFieldProps?:
      | TextFieldProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => TextFieldProps);
    muiSelectAllCheckboxProps?:
      | CheckboxProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => CheckboxProps);
    muiSelectCheckboxProps?:
      | CheckboxProps
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => CheckboxProps);
    muiTableBodyCellCopyButtonProps?:
      | ButtonProps
      | (({
          table,
          cell,
        }: {
          table: MRT_TableInstance<TData>;
          cell: MRT_Cell<TData>;
        }) => ButtonProps);
    muiTableBodyCellEditTextFieldProps?:
      | TextFieldProps
      | (({
          table,
          cell,
        }: {
          table: MRT_TableInstance<TData>;
          cell: MRT_Cell<TData>;
        }) => TextFieldProps);
    muiTableBodyCellProps?:
      | TableCellProps
      | (({
          table,
          cell,
        }: {
          table: MRT_TableInstance<TData>;
          cell: MRT_Cell<TData>;
        }) => TableCellProps);
    muiTableBodyCellSkeletonProps?:
      | SkeletonProps
      | (({
          table,
          cell,
        }: {
          table: MRT_TableInstance<TData>;
          cell: MRT_Cell<TData>;
        }) => SkeletonProps);
    muiTableBodyProps?:
      | TableBodyProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => TableBodyProps);
    muiTableBodyRowDragHandleProps?:
      | IconButtonProps
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => IconButtonProps);
    muiTableBodyRowProps?:
      | TableRowProps
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => TableRowProps);
    muiTableBottomToolbarProps?:
      | ToolbarProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => ToolbarProps);
    muiTableContainerProps?:
      | TableContainerProps
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => TableContainerProps);
    muiTableDetailPanelProps?:
      | TableCellProps
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<TData>;
          row: MRT_Row<TData>;
        }) => TableCellProps);
    muiTableFooterCellProps?:
      | TableCellProps
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => TableCellProps);
    muiTableFooterProps?:
      | TableFooterProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => TableFooterProps);
    muiTableFooterRowProps?:
      | TableRowProps
      | (({
          table,
          footerGroup,
        }: {
          table: MRT_TableInstance<TData>;
          footerGroup: MRT_HeaderGroup<TData>;
        }) => TableRowProps);
    muiTableHeadCellColumnActionsButtonProps?:
      | IconButtonProps
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => IconButtonProps);
    muiTableHeadCellDragHandleProps?:
      | IconButtonProps
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => IconButtonProps);
    muiTableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | (({
          table,
          column,
          rangeFilterIndex,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
          rangeFilterIndex?: number;
        }) => TextFieldProps);
    muiTableHeadCellProps?:
      | TableCellProps
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<TData>;
          column: MRT_Column<TData>;
        }) => TableCellProps);
    muiTableHeadProps?:
      | TableHeadProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => TableHeadProps);
    muiTableHeadRowProps?:
      | TableRowProps
      | (({
          table,
          headerGroup,
        }: {
          table: MRT_TableInstance<TData>;
          headerGroup: MRT_HeaderGroup<TData>;
        }) => TableRowProps);
    muiTablePaginationProps?:
      | Partial<TablePaginationProps>
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => Partial<TablePaginationProps>);
    muiTablePaperProps?:
      | PaperProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => PaperProps);
    muiTableProps?:
      | TableProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => TableProps);
    muiTableToolbarAlertBannerProps?:
      | AlertProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => AlertProps);
    muiTableTopToolbarProps?:
      | ToolbarProps
      | (({ table }: { table: MRT_TableInstance<TData> }) => ToolbarProps);
    onCellEditBlur?: ({
      cell,
      event,
      table,
    }: {
      event: FocusEvent<HTMLInputElement>;
      cell: MRT_Cell<TData>;
      table: MRT_TableInstance<TData>;
    }) => void;
    onCellEditChange?: ({
      cell,
      event,
      table,
    }: {
      event: ChangeEvent<HTMLInputElement>;
      cell: MRT_Cell<TData>;
      table: MRT_TableInstance<TData>;
    }) => void;
    onColumnDrop?: ({
      event,
      draggedColumn,
      targetColumn,
    }: {
      event: DragEvent<HTMLButtonElement>;
      draggedColumn: MRT_Column<TData>;
      targetColumn: MRT_Column<TData> | { id: string } | null;
    }) => void;
    onCurrentDraggingColumnChange?: OnChangeFn<MRT_Column<TData> | null>;
    onCurrentDraggingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
    onCurrentEditingCellChange?: OnChangeFn<MRT_Cell<TData> | null>;
    onCurrentEditingRowChange?: OnChangeFn<MRT_Row<TData> | null>;
    onCurrentFilterFnsChange?: OnChangeFn<{ [key: string]: MRT_FilterOption }>;
    onCurrentGlobalFilterFnChange?: OnChangeFn<MRT_FilterOption>;
    onCurrentHoveredColumnChange?: OnChangeFn<MRT_Column<TData> | null>;
    onCurrentHoveredRowChange?: OnChangeFn<MRT_Row<TData> | null>;
    onDensityChange?: OnChangeFn<boolean>;
    onEditRowSubmit?: ({
      row,
      table,
    }: {
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => Promise<void> | void;
    onIsFullScreenChange?: OnChangeFn<boolean>;
    onRowDrop?: ({
      event,
      draggedRow,
      targetRow,
    }: {
      event: DragEvent<HTMLButtonElement>;
      draggedRow: MRT_Row<TData>;
      targetRow: MRT_Row<TData> | { id: string } | null;
    }) => void;
    onShowAlertBannerChange?: OnChangeFn<boolean>;
    onShowFiltersChange?: OnChangeFn<boolean>;
    onShowGlobalFilterChange?: OnChangeFn<boolean>;
    positionActionsColumn?: 'first' | 'last';
    positionExpandColumn?: 'first' | 'last';
    positionGlobalFilter?: 'left' | 'right';
    positionPagination?: 'bottom' | 'top' | 'both';
    positionToolbarAlertBanner?: 'bottom' | 'top' | 'none';
    positionToolbarDropZone?: 'bottom' | 'top' | 'none' | 'both';
    renderBottomToolbarCustomActions?: ({
      table,
    }: {
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderDetailPanel?: ({
      row,
      table,
    }: {
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderRowActionMenuItems?: ({
      closeMenu,
      row,
      table,
    }: {
      closeMenu: () => void;
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode[];
    renderRowActions?: ({
      row,
      table,
    }: {
      row: MRT_Row<TData>;
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    renderToolbarInternalActions?: ({
      table,
      MRT_ToggleGlobalFilterButton,
      MRT_ToggleFiltersButton,
      MRT_ShowHideColumnsButton,
      MRT_ToggleDensePaddingButton,
      MRT_FullScreenToggleButton,
    }: {
      table: MRT_TableInstance<TData>;
      MRT_ToggleGlobalFilterButton: FC<
        IconButtonProps & { table: MRT_TableInstance<TData> }
      >;
      MRT_ToggleFiltersButton: FC<
        IconButtonProps & { table: MRT_TableInstance<TData> }
      >;
      MRT_ShowHideColumnsButton: FC<
        IconButtonProps & { table: MRT_TableInstance<TData> }
      >;
      MRT_ToggleDensePaddingButton: FC<
        IconButtonProps & { table: MRT_TableInstance<TData> }
      >;
      MRT_FullScreenToggleButton: FC<
        IconButtonProps & { table: MRT_TableInstance<TData> }
      >;
    }) => ReactNode;
    renderTopToolbarCustomActions?: ({
      table,
    }: {
      table: MRT_TableInstance<TData>;
    }) => ReactNode;
    rowCount?: number;
    rowNumberMode?: 'original' | 'static';
    selectAllMode?: 'all' | 'page';
    state?: Partial<MRT_TableState<TData>>;
    tableId?: string;
    virtualizerProps?:
      | Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>
      | (({
          table,
        }: {
          table: MRT_TableInstance<TData>;
        }) => Partial<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>>);
  };

export default <TData extends Record<string, any> = {}>({
  aggregationFns,
  autoResetExpanded = false,
  columnResizeMode = 'onEnd',
  defaultColumn = { minSize: 40, maxSize: 1000, size: 180 },
  editingMode = 'row',
  enableBottomToolbar = true,
  enableColumnActions = true,
  enableColumnFilterChangeMode = false,
  enableColumnFilters = true,
  enableColumnOrdering = false,
  enableColumnResizing = false,
  enableDensityToggle = true,
  enableExpandAll = true,
  enableFilters = true,
  enableFullScreenToggle = true,
  enableGlobalFilter = true,
  enableGlobalFilterChangeMode = false,
  enableGlobalFilterRankedResults = true,
  enableGrouping = false,
  enableHiding = true,
  enableMultiRowSelection = true,
  enableMultiSort = true,
  enablePagination = true,
  enablePinning = false,
  enableRowSelection = false,
  enableSelectAll = true,
  enableSorting = true,
  enableStickyHeader = false,
  enableTableFooter = true,
  enableTableHead = true,
  enableToolbarInternalActions = true,
  enableTopToolbar = true,
  filterFns,
  icons,
  localization,
  positionActionsColumn = 'first',
  positionExpandColumn = 'first',
  positionGlobalFilter = 'right',
  positionPagination = 'bottom',
  positionToolbarAlertBanner = 'top',
  positionToolbarDropZone = 'top',
  rowNumberMode = 'original',
  selectAllMode = 'all',
  sortingFns,
  ...rest
}: MaterialReactTableProps<TData>) => (
  <MRT_TableRoot
    aggregationFns={{ ...MRT_AggregationFns, ...aggregationFns }}
    autoResetExpanded={autoResetExpanded}
    columnResizeMode={columnResizeMode}
    defaultColumn={defaultColumn}
    editingMode={editingMode}
    enableBottomToolbar={enableBottomToolbar}
    enableColumnActions={enableColumnActions}
    enableColumnFilterChangeMode={enableColumnFilterChangeMode}
    enableColumnFilters={enableColumnFilters}
    enableColumnOrdering={enableColumnOrdering}
    enableColumnResizing={enableColumnResizing}
    enableDensityToggle={enableDensityToggle}
    enableExpandAll={enableExpandAll}
    enableFilters={enableFilters}
    enableFullScreenToggle={enableFullScreenToggle}
    enableGlobalFilter={enableGlobalFilter}
    enableGlobalFilterChangeMode={enableGlobalFilterChangeMode}
    enableGlobalFilterRankedResults={enableGlobalFilterRankedResults}
    enableGrouping={enableGrouping}
    enableHiding={enableHiding}
    enableMultiRowSelection={enableMultiRowSelection}
    enableMultiSort={enableMultiSort}
    enablePagination={enablePagination}
    enablePinning={enablePinning}
    enableRowSelection={enableRowSelection}
    enableSelectAll={enableSelectAll}
    enableSorting={enableSorting}
    enableStickyHeader={enableStickyHeader}
    enableTableFooter={enableTableFooter}
    enableTableHead={enableTableHead}
    enableToolbarInternalActions={enableToolbarInternalActions}
    enableTopToolbar={enableTopToolbar}
    filterFns={{ ...MRT_FilterFns, ...filterFns }}
    icons={{ ...MRT_Default_Icons, ...icons }}
    localization={{ ...MRT_DefaultLocalization_EN, ...localization }}
    positionActionsColumn={positionActionsColumn}
    positionExpandColumn={positionExpandColumn}
    positionGlobalFilter={positionGlobalFilter}
    positionPagination={positionPagination}
    positionToolbarAlertBanner={positionToolbarAlertBanner}
    positionToolbarDropZone={positionToolbarDropZone}
    rowNumberMode={rowNumberMode}
    selectAllMode={selectAllMode}
    sortingFns={{ ...MRT_SortingFns, ...sortingFns }}
    {...rest}
  />
);
