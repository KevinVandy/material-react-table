import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FocusEvent,
  ReactNode,
  SetStateAction,
} from 'react';
import {
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
import {
  Cell,
  Column,
  ColumnDef,
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
import { Options as VirtualizerOptions } from 'react-virtual';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_Default_Icons, MRT_Icons } from './icons';
import { MRT_TableRoot } from './table/MRT_TableRoot';
import { MRT_FilterFns } from './filtersFns';
import { MRT_SortingFns } from './sortingFns';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export type MRT_TableOptions<D extends Record<string, any> = {}> = Partial<
  Omit<
    TableOptions<D>,
    'columns' | 'data' | 'initialState' | 'state' | 'expandRowsFn'
  >
> & {
  columns: MRT_ColumnDef<D>[];
  data: D[];
  expandRowsFn?: (dataRow: D) => D[];
  initialState?: Partial<MRT_TableState<D>>;
  state?: Partial<MRT_TableState<D>>;
};

export interface MRT_RowModel<D extends Record<string, any> = {}> {
  flatRows: MRT_Row<D>[];
  rows: MRT_Row<D>[];
  rowsById: { [key: string]: MRT_Row<D> };
}

export type MRT_TableInstance<D extends Record<string, any> = {}> = Omit<
  Table<D>,
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
  getAllColumns: () => MRT_Column<D>[];
  getAllFlatColumns: () => MRT_Column<D>[];
  getAllLeafColumns: () => MRT_Column<D>[];
  getCenterLeafColumns: () => MRT_Column<D>[];
  getColumn: (columnId: string) => MRT_Column<D>;
  getExpandedRowModel: () => MRT_RowModel<D>;
  getFlatHeaders: () => MRT_Header<D>[];
  getLeftLeafColumns: () => MRT_Column<D>[];
  getPaginationRowModel: () => MRT_RowModel<D>;
  getPreFilteredRowModel: () => MRT_RowModel<D>;
  getPrePaginationRowModel: () => MRT_RowModel<D>;
  getRightLeafColumns: () => MRT_Column<D>[];
  getRowModel: () => MRT_RowModel<D>;
  getSelectedRowModel: () => MRT_RowModel<D>;
  getState: () => MRT_TableState<D>;
  options: MaterialReactTableProps<D> & {
    icons: MRT_Icons;
    tableId: string;
    localization: MRT_Localization;
  };
  setCurrentEditingCell: Dispatch<SetStateAction<MRT_Cell | null>>;
  setCurrentEditingRow: Dispatch<SetStateAction<MRT_Row | null>>;
  setCurrentFilterFns: Dispatch<
    SetStateAction<{
      [key: string]: MRT_FilterOption;
    }>
  >;
  setCurrentGlobalFilterFn: Dispatch<SetStateAction<MRT_FilterOption>>;
  setDensity: Dispatch<SetStateAction<'comfortable' | 'compact' | 'spacious'>>;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setShowAlertBanner: Dispatch<SetStateAction<boolean>>;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
};

export type MRT_TableState<D extends Record<string, any> = {}> = TableState & {
  currentEditingCell: MRT_Cell<D> | null;
  currentEditingRow: MRT_Row<D> | null;
  currentFilterFns: Record<string, MRT_FilterOption>;
  currentGlobalFilterFn: Record<string, MRT_FilterOption>;
  density: 'comfortable' | 'compact' | 'spacious';
  isLoading: boolean;
  isFullScreen: boolean;
  showAlertBanner: boolean;
  showFilters: boolean;
  showGlobalFilter: boolean;
  showProgressBars: boolean;
  showSkeletons: boolean;
};

export type MRT_ColumnDef<D extends Record<string, any> = {}> = Omit<
  ColumnDef<D>,
  | 'accessorFn'
  | 'accessorKey'
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
    table,
  }: {
    cell: MRT_Cell<D>;
    table: MRT_TableInstance<D>;
  }) => ReactNode;
  Cell?: ({
    cell,
    table,
  }: {
    cell: MRT_Cell<D>;
    table: MRT_TableInstance<D>;
  }) => ReactNode;
  Edit?: ({
    cell,
    table,
  }: {
    cell: MRT_Cell<D>;
    table: MRT_TableInstance<D>;
  }) => ReactNode;
  Filter?: ({
    header,
    table,
  }: {
    header: MRT_Header<D>;
    table: MRT_TableInstance<D>;
  }) => ReactNode;
  Footer?:
    | ReactNode
    | (({
        footer,
        table,
      }: {
        footer: MRT_Header<D>;
        table: MRT_TableInstance<D>;
      }) => ReactNode);
  Header?:
    | ReactNode
    | (({
        header,
        table,
      }: {
        header: MRT_Header<D>;
        table: MRT_TableInstance<D>;
      }) => ReactNode);
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   * Specify a function here to point to the correct property in the data object.
   *
   * @example accessorFn: (row) => row.username
   */
  accessorFn?: (row: D) => any;
  /**
   * Either an `accessorKey` or a combination of an `accessorFn` and `id` are required for a data column definition.
   * Specify which key in the row this column should use to access the correct data.
   *
   * @example accessorKey: 'username'
   */
  accessorKey?: LiteralUnion<string & keyof D>;
  /**
   * Specify what type of column this is. Either `data`, `display`, or `group`. Defaults to `data`.
   * Leave this blank if you are just creating a normal data column.
   *
   * @default 'data'
   *
   * @example columnDefType: 'display'
   */
  columnDefType?: 'data' | 'display' | 'group';
  columns?: MRT_ColumnDef<D>[];
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnFilterChangeMode?: boolean;
  enableColumnOrdering?: boolean;
  enableEditing?: boolean;
  enabledColumnFilterOptions?: MRT_FilterOption[] | null;
  filterFn?: MRT_FilterFn<D>;
  filterSelectOptions?: (string | { text: string; value: string })[];
  footer?: string;
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
  id?: LiteralUnion<string & keyof D>;
  muiTableBodyCellCopyButtonProps?:
    | ButtonProps
    | (({
        table,
        cell,
      }: {
        table: MRT_TableInstance<D>;
        cell: MRT_Cell<D>;
      }) => ButtonProps);
  muiTableBodyCellEditTextFieldProps?:
    | TextFieldProps
    | (({
        table,
        cell,
      }: {
        table: MRT_TableInstance<D>;
        cell: MRT_Cell<D>;
      }) => TextFieldProps);
  muiTableBodyCellProps?:
    | TableCellProps
    | (({
        table,
        cell,
      }: {
        table: MRT_TableInstance<D>;
        cell: MRT_Cell<D>;
      }) => TableCellProps);
  muiTableFooterCellProps?:
    | TableCellProps
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<D>;
        column: MRT_Column<D>;
      }) => TableCellProps);
  muiTableHeadCellColumnActionsButtonProps?:
    | IconButtonProps
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<D>;
        column: MRT_Column<D>;
      }) => IconButtonProps);
  muiTableHeadCellFilterTextFieldProps?:
    | TextFieldProps
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<D>;
        column: MRT_Column<D>;
      }) => TextFieldProps);
  muiTableHeadCellProps?:
    | TableCellProps
    | (({
        table,
        column,
      }: {
        table: MRT_TableInstance<D>;
        column: MRT_Column<D>;
      }) => TableCellProps);
  onCellEditBlur?: ({
    cell,
    event,
    table,
  }: {
    event: FocusEvent<HTMLInputElement>;
    cell: MRT_Cell<D>;
    table: MRT_TableInstance<D>;
  }) => void;
  onCellEditChange?: ({
    cell,
    event,
    table,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    cell: MRT_Cell<D>;
    table: MRT_TableInstance<D>;
  }) => void;
  sortingFn?: MRT_SortingFn;
};

export type MRT_DefinedColumnDef<D extends Record<string, any> = {}> = Omit<
  MRT_ColumnDef<D>,
  'id'
> & {
  id: string;
};

export type MRT_Column<D extends Record<string, any> = {}> = Omit<
  Column<D>,
  'header' | 'footer' | 'columns' | 'columnDef' | 'filterFn'
> & {
  columnDef: MRT_DefinedColumnDef<D>;
  columns?: MRT_Column<D>[];
  filterFn?: MRT_FilterFn<D>;
  footer: string;
  header: string;
};

export type MRT_Header<D extends Record<string, any> = {}> = Omit<
  Header<D>,
  'column'
> & {
  column: MRT_Column<D>;
};

export type MRT_HeaderGroup<D extends Record<string, any> = {}> = Omit<
  HeaderGroup<D>,
  'headers'
> & {
  headers: MRT_Header<D>[];
};

export type MRT_Row<D extends Record<string, any> = {}> = Omit<
  Row<D>,
  'getVisibleCells' | 'getAllCells' | 'subRows' | 'original' | '_valuesCache'
> & {
  getAllCells: () => MRT_Cell<D>[];
  getVisibleCells: () => MRT_Cell<D>[];
  subRows?: MRT_Row<D>[];
  original: D;
  _valuesCache?: D;
};

export type MRT_Cell<D extends Record<string, any> = {}> = Omit<
  Cell<D>,
  'column' | 'row'
> & {
  column: MRT_Column<D>;
  row: MRT_Row<D>;
};

export type MRT_SortingOption = keyof typeof MRT_SortingFns;

export type MRT_SortingFn<D extends Record<string, any> = {}> =
  | SortingFn<D>
  | MRT_SortingOption;

export type MRT_FilterOption = keyof typeof MRT_FilterFns;

export type MRT_FilterFn<D extends Record<string, any> = {}> =
  | FilterFn<D>
  | MRT_FilterOption;

export type MaterialReactTableProps<D extends Record<string, any> = {}> =
  MRT_TableOptions<D> & {
    editingMode?: 'table' | 'row' | 'cell';
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
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
    enableRowNumbers?: boolean;
    enableRowVirtualization?: boolean;
    enableSelectAll?: boolean;
    enableStickyHeader?: boolean;
    enableTableFooter?: boolean;
    enableTableHead?: boolean;
    enableToolbarBottom?: boolean;
    enableToolbarInternalActions?: boolean;
    enableToolbarTop?: boolean;
    enabledColumnFilterOptions?: (MRT_FilterOption | string)[] | null;
    enabledGlobalFilterOptions?: (MRT_FilterOption | string)[] | null;
    icons?: Partial<MRT_Icons>;
    localization?: Partial<MRT_Localization>;
    muiExpandAllButtonProps?:
      | IconButtonProps
      | (({ table }: { table: MRT_TableInstance<D> }) => IconButtonProps);
    muiExpandButtonProps?:
      | IconButtonProps
      | (({
          table,
        }: {
          table: MRT_TableInstance<D>;
          row: MRT_Row<D>;
        }) => IconButtonProps);
    muiLinearProgressProps?:
      | LinearProgressProps
      | (({ table }: { table: MRT_TableInstance<D> }) => LinearProgressProps);
    muiSearchTextFieldProps?:
      | TextFieldProps
      | (({ table }: { table: MRT_TableInstance<D> }) => TextFieldProps);
    muiSelectAllCheckboxProps?:
      | CheckboxProps
      | (({ table }: { table: MRT_TableInstance<D> }) => CheckboxProps);
    muiSelectCheckboxProps?:
      | CheckboxProps
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<D>;
          row: MRT_Row<D>;
        }) => CheckboxProps);
    muiTableBodyCellCopyButtonProps?:
      | ButtonProps
      | (({
          table,
          cell,
        }: {
          table: MRT_TableInstance<D>;
          cell: MRT_Cell<D>;
        }) => ButtonProps);
    muiTableBodyCellEditTextFieldProps?:
      | TextFieldProps
      | (({
          table,
          cell,
        }: {
          table: MRT_TableInstance<D>;
          cell: MRT_Cell<D>;
        }) => TextFieldProps);
    muiTableBodyCellProps?:
      | TableCellProps
      | (({
          table,
          cell,
        }: {
          table: MRT_TableInstance<D>;
          cell: MRT_Cell<D>;
        }) => TableCellProps);
    muiTableBodyCellSkeletonProps?:
      | SkeletonProps
      | (({
          table,
          cell,
        }: {
          table: MRT_TableInstance<D>;
          cell: MRT_Cell<D>;
        }) => SkeletonProps);
    muiTableBodyProps?:
      | TableBodyProps
      | (({ table }: { table: MRT_TableInstance<D> }) => TableBodyProps);
    muiTableBodyRowProps?:
      | TableRowProps
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<D>;
          row: MRT_Row<D>;
        }) => TableRowProps);
    muiTableContainerProps?:
      | TableContainerProps
      | (({ table }: { table: MRT_TableInstance<D> }) => TableContainerProps);
    muiTableDetailPanelProps?:
      | TableCellProps
      | (({
          table,
          row,
        }: {
          table: MRT_TableInstance<D>;
          row: MRT_Row<D>;
        }) => TableCellProps);
    muiTableFooterCellProps?:
      | TableCellProps
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<D>;
          column: MRT_Column<D>;
        }) => TableCellProps);
    muiTableFooterProps?:
      | TableFooterProps
      | (({ table }: { table: MRT_TableInstance<D> }) => TableFooterProps);
    muiTableFooterRowProps?:
      | TableRowProps
      | (({
          table,
          footerGroup,
        }: {
          table: MRT_TableInstance<D>;
          footerGroup: MRT_HeaderGroup<D>;
        }) => TableRowProps);
    muiTableHeadCellColumnActionsButtonProps?:
      | IconButtonProps
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<D>;
          column: MRT_Column<D>;
        }) => IconButtonProps);
    muiTableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<D>;
          column: MRT_Column<D>;
        }) => TextFieldProps);
    muiTableHeadCellProps?:
      | TableCellProps
      | (({
          table,
          column,
        }: {
          table: MRT_TableInstance<D>;
          column: MRT_Column<D>;
        }) => TableCellProps);
    muiTableHeadProps?:
      | TableHeadProps
      | (({ table }: { table: MRT_TableInstance<D> }) => TableHeadProps);
    muiTableHeadRowProps?:
      | TableRowProps
      | (({
          table,
          headerGroup,
        }: {
          table: MRT_TableInstance<D>;
          headerGroup: MRT_HeaderGroup<D>;
        }) => TableRowProps);
    muiTablePaginationProps?:
      | Partial<TablePaginationProps>
      | (({
          table,
        }: {
          table: MRT_TableInstance<D>;
        }) => Partial<TablePaginationProps>);
    muiTablePaperProps?:
      | PaperProps
      | (({ table }: { table: MRT_TableInstance<D> }) => PaperProps);
    muiTableProps?:
      | TableProps
      | (({ table }: { table: MRT_TableInstance<D> }) => TableProps);
    muiTableToolbarAlertBannerProps?:
      | AlertProps
      | (({ table }: { table: MRT_TableInstance<D> }) => AlertProps);
    muiTableToolbarBottomProps?:
      | ToolbarProps
      | (({ table }: { table: MRT_TableInstance<D> }) => ToolbarProps);
    muiTableToolbarTopProps?:
      | ToolbarProps
      | (({ table }: { table: MRT_TableInstance<D> }) => ToolbarProps);
    onCellEditBlur?: ({
      cell,
      event,
      table,
    }: {
      event: FocusEvent<HTMLInputElement>;
      cell: MRT_Cell<D>;
      table: MRT_TableInstance<D>;
    }) => void;
    onCellEditChange?: ({
      cell,
      event,
      table,
    }: {
      event: ChangeEvent<HTMLInputElement>;
      cell: MRT_Cell<D>;
      table: MRT_TableInstance<D>;
    }) => void;
    onCurrentEditingCellChange?: OnChangeFn<MRT_Cell>;
    onCurrentEditingRowChange?: OnChangeFn<MRT_Row>;
    onCurrentFilterFnsChange?: OnChangeFn<{ [key: string]: MRT_FilterOption }>;
    onCurrentGlobalFilterFnChange?: OnChangeFn<MRT_FilterOption>;
    onEditRowSubmit?: ({
      row,
      table,
    }: {
      row: MRT_Row<D>;
      table: MRT_TableInstance<D>;
    }) => Promise<void> | void;
    onDensityChange?: OnChangeFn<boolean>;
    onIsFullScreenChange?: OnChangeFn<boolean>;
    onShowAlertBannerChange?: OnChangeFn<boolean>;
    onShowFiltersChange?: OnChangeFn<boolean>;
    onShowGlobalFilterChange?: OnChangeFn<boolean>;
    positionActionsColumn?: 'first' | 'last';
    positionGlobalFilter?: 'left' | 'right';
    positionPagination?: 'bottom' | 'top' | 'both';
    positionToolbarAlertBanner?: 'bottom' | 'top';
    renderDetailPanel?: ({
      row,
      table,
    }: {
      row: MRT_Row<D>;
      table: MRT_TableInstance<D>;
    }) => ReactNode;
    renderRowActionMenuItems?: ({
      closeMenu,
      row,
      table,
    }: {
      closeMenu: () => void;
      row: MRT_Row<D>;
      table: MRT_TableInstance<D>;
    }) => ReactNode[];
    renderRowActions?: ({
      row,
      table,
    }: {
      row: MRT_Row<D>;
      table: MRT_TableInstance<D>;
    }) => ReactNode;
    renderToolbarBottomCustomActions?: ({
      table,
    }: {
      table: MRT_TableInstance<D>;
    }) => ReactNode;
    renderToolbarTopCustomActions?: ({
      table,
    }: {
      table: MRT_TableInstance<D>;
    }) => ReactNode;
    renderToolbarInternalActions?: ({
      table,
      MRT_ToggleGlobalFilterButton,
      MRT_ToggleFiltersButton,
      MRT_ShowHideColumnsButton,
      MRT_ToggleDensePaddingButton,
      MRT_FullScreenToggleButton,
    }: {
      table: MRT_TableInstance<D>;
      MRT_ToggleGlobalFilterButton: FC<
        IconButtonProps & { table: MRT_TableInstance<D> }
      >;
      MRT_ToggleFiltersButton: FC<
        IconButtonProps & { table: MRT_TableInstance<D> }
      >;
      MRT_ShowHideColumnsButton: FC<
        IconButtonProps & { table: MRT_TableInstance<D> }
      >;
      MRT_ToggleDensePaddingButton: FC<
        IconButtonProps & { table: MRT_TableInstance<D> }
      >;
      MRT_FullScreenToggleButton: FC<
        IconButtonProps & { table: MRT_TableInstance<D> }
      >;
    }) => ReactNode;
    rowCount?: number;
    rowNumberMode?: 'original' | 'static';
    selectAllMode?: 'all' | 'page';
    tableId?: string;
    virtualizerProps?: Partial<VirtualizerOptions<HTMLDivElement>>;
  };

export default <D extends Record<string, any> = {}>({
  autoResetExpanded = false,
  columnResizeMode = 'onEnd',
  defaultColumn = { minSize: 40, maxSize: 1000, size: 180 },
  editingMode = 'row',
  enableColumnActions = true,
  enableColumnFilterChangeMode = true,
  enableColumnFilters = true,
  enableColumnOrdering = false,
  enableColumnResizing = false,
  enableDensityToggle = true,
  enableExpandAll = true,
  enableFilters = true,
  enableFullScreenToggle = true,
  enableGlobalFilter = true,
  enableGlobalFilterChangeMode = true,
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
  enableToolbarBottom = true,
  enableToolbarInternalActions = true,
  enableToolbarTop = true,
  icons,
  localization,
  positionActionsColumn = 'first',
  positionGlobalFilter = 'right',
  positionPagination = 'bottom',
  positionToolbarAlertBanner = 'top',
  rowNumberMode = 'original',
  selectAllMode = 'all',
  ...rest
}: MaterialReactTableProps<D>) => (
  <MRT_TableRoot
    autoResetExpanded={autoResetExpanded}
    columnResizeMode={columnResizeMode}
    defaultColumn={defaultColumn}
    editingMode={editingMode}
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
    enableToolbarBottom={enableToolbarBottom}
    enableToolbarInternalActions={enableToolbarInternalActions}
    enableToolbarTop={enableToolbarTop}
    icons={{ ...MRT_Default_Icons, ...icons }}
    localization={{ ...MRT_DefaultLocalization_EN, ...localization }}
    positionActionsColumn={positionActionsColumn}
    positionGlobalFilter={positionGlobalFilter}
    positionPagination={positionPagination}
    positionToolbarAlertBanner={positionToolbarAlertBanner}
    rowNumberMode={rowNumberMode}
    selectAllMode={selectAllMode}
    {...rest}
  />
);
