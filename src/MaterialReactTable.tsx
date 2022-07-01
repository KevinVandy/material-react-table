import React, {
  ChangeEvent,
  Dispatch,
  FC,
  FocusEvent,
  MouseEvent,
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
  ColumnOrderState,
  ColumnPinningState,
  FilterFn,
  FilterFnOption,
  Header,
  HeaderGroup,
  OnChangeFn,
  Overwrite,
  ReactTableGenerics,
  Row,
  SortingFn,
  SortingFnOption,
  TableGenerics,
  TableInstance,
  TableState,
  UseTableInstanceOptions,
  VisibilityState,
} from '@tanstack/react-table';
import { Options as VirtualizerOptions } from 'react-virtual';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_Default_Icons, MRT_Icons } from './icons';
import { MRT_TableRoot } from './table/MRT_TableRoot';

export type MRT_TableOptions<D extends Record<string, any> = {}> = Partial<
  Omit<
    UseTableInstanceOptions<ReactTableGenerics>,
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
  TableInstance<
    Overwrite<
      Partial<TableGenerics>,
      {
        Row: D;
      }
    >
  >,
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
      [key: string]: MRT_FilterFn;
    }>
  >;
  setCurrentGlobalFilterFn: Dispatch<SetStateAction<MRT_FilterFn>>;
  setDensity: Dispatch<SetStateAction<'comfortable' | 'compact' | 'spacious'>>;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
};

export type MRT_TableState<D extends Record<string, any> = {}> = TableState & {
  currentEditingCell: MRT_Cell<D> | null;
  currentEditingRow: MRT_Row<D> | null;
  currentFilterFns: Record<string, string | Function>;
  currentGlobalFilterFn: Record<string, string | Function>;
  density: 'comfortable' | 'compact' | 'spacious';
  isLoading: boolean;
  isFullScreen: boolean;
  showFilters: boolean;
  showGlobalFilter: boolean;
  showProgressBars: boolean;
  showSkeletons: boolean;
};

export type MRT_ColumnDef<D extends Record<string, any> = {}> = Omit<
  ColumnDef<D>,
  | 'accessorFn'
  | 'aggregatedCell'
  | 'cell'
  | 'columns'
  | 'filterFn'
  | 'footer'
  | 'header'
  | 'sortingFn'
> & {
  AggregatedCell?: ({
    cell,
    instance,
  }: {
    cell: MRT_Cell<D>;
    instance: MRT_TableInstance<D>;
  }) => ReactNode;
  Cell?: ({
    cell,
    instance,
  }: {
    cell: MRT_Cell<D>;
    instance: MRT_TableInstance<D>;
  }) => ReactNode;
  Edit?: ({
    cell,
    instance,
  }: {
    cell: MRT_Cell<D>;
    instance: MRT_TableInstance<D>;
  }) => ReactNode;
  Filter?: ({
    header,
    instance,
  }: {
    header: MRT_Header<D>;
    instance: MRT_TableInstance<D>;
  }) => ReactNode;
  Footer?:
    | ReactNode
    | (({
        footer,
        instance,
      }: {
        footer: MRT_Header<D>;
        instance: MRT_TableInstance<D>;
      }) => ReactNode);
  Header?:
    | ReactNode
    | (({
        header,
        instance,
      }: {
        header: MRT_Header<D>;
        instance: MRT_TableInstance<D>;
      }) => ReactNode);
  accessorFn?: (row: D) => any;
  columns?: MRT_ColumnDef<D>[];
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnFilterChangeMode?: boolean;
  enableColumnOrdering?: boolean;
  enableEditing?: boolean;
  enabledColumnFilterOptions?: (MRT_FILTER_OPTION | string)[] | null;
  filterFn?: MRT_FilterFn;
  filterSelectOptions?: (string | { text: string; value: string })[];
  footer?: string;
  header: string;
  id: keyof D | string;
  muiTableBodyCellCopyButtonProps?:
    | ButtonProps
    | (({
        instance,
        cell,
      }: {
        instance: MRT_TableInstance<D>;
        cell: MRT_Cell<D>;
      }) => ButtonProps);
  muiTableBodyCellEditTextFieldProps?:
    | TextFieldProps
    | (({
        instance,
        cell,
      }: {
        instance: MRT_TableInstance<D>;
        cell: MRT_Cell<D>;
      }) => TextFieldProps);
  muiTableBodyCellProps?:
    | TableCellProps
    | (({
        instance,
        cell,
      }: {
        instance: MRT_TableInstance<D>;
        cell: MRT_Cell<D>;
      }) => TableCellProps);
  muiTableFooterCellProps?:
    | TableCellProps
    | (({
        instance,
        column,
      }: {
        instance: MRT_TableInstance<D>;
        column: MRT_Column<D>;
      }) => TableCellProps);
  muiTableHeadCellColumnActionsButtonProps?:
    | IconButtonProps
    | (({
        instance,
        column,
      }: {
        instance: MRT_TableInstance<D>;
        column: MRT_Column<D>;
      }) => IconButtonProps);
  muiTableHeadCellFilterTextFieldProps?:
    | TextFieldProps
    | (({
        instance,
        column,
      }: {
        instance: MRT_TableInstance<D>;
        column: MRT_Column<D>;
      }) => TextFieldProps);
  muiTableHeadCellProps?:
    | TableCellProps
    | (({
        instance,
        column,
      }: {
        instance: MRT_TableInstance<D>;
        column: MRT_Column<D>;
      }) => TableCellProps);
  onCellEditBlur?: ({
    cell,
    event,
    instance,
  }: {
    event: FocusEvent<HTMLInputElement>;
    cell: MRT_Cell<D>;
    instance: MRT_TableInstance<D>;
  }) => void;
  onCellEditChanged?: ({
    cell,
    event,
    instance,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    cell: MRT_Cell<D>;
    instance: MRT_TableInstance<D>;
  }) => void;
  onColumnFilterValueChanged?: ({
    column,
    event,
    filterValue,
    instance,
  }: {
    column: MRT_Column<D>;
    event: ChangeEvent<HTMLInputElement>;
    filterValue: any;
    instance: MRT_TableInstance<D>;
  }) => void;
  onColumnFilterValueChangedDebounced?: ({
    column,
    event,
    filterValue,
    instance,
  }: {
    column: MRT_Column<D>;
    event: ChangeEvent<HTMLInputElement>;
    filterValue: any;
    instance: MRT_TableInstance<D>;
  }) => void;
  sortingFn?: MRT_SortingFn;
};

export type MRT_Column<D extends Record<string, any> = {}> = Omit<
  Column<D>,
  'header' | 'footer' | 'columns' | 'columnDef'
> & {
  columns?: MRT_Column<D>[];
  columnDef: MRT_ColumnDef<D>;
  header: string;
  footer: string;
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

export type MRT_SortingOption = SortingFnOption<TableGenerics> | 'fuzzy';

export type MRT_SortingFn = SortingFn<TableGenerics> | MRT_SortingOption;

export type MRT_FILTER_OPTION =
  | 'between'
  | 'contains'
  | 'empty'
  | 'endsWith'
  | 'equals'
  | 'fuzzy'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'notEmpty'
  | 'notEquals'
  | 'startsWith'
  | FilterFnOption<TableGenerics>;

export type MRT_FilterFn = FilterFn<TableGenerics> | MRT_FILTER_OPTION;

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
    enabledColumnFilterOptions?: (MRT_FILTER_OPTION | string)[] | null;
    enabledGlobalFilterOptions?: (MRT_FILTER_OPTION | string)[] | null;
    icons?: Partial<MRT_Icons>;
    localization?: Partial<MRT_Localization>;
    muiExpandAllButtonProps?:
      | IconButtonProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => IconButtonProps);
    muiExpandButtonProps?:
      | IconButtonProps
      | (({
          instance,
        }: {
          instance: MRT_TableInstance<D>;
          row: MRT_Row<D>;
        }) => IconButtonProps);
    muiLinearProgressProps?:
      | LinearProgressProps
      | (({
          instance,
        }: {
          instance: MRT_TableInstance<D>;
        }) => LinearProgressProps);
    muiSearchTextFieldProps?:
      | TextFieldProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => TextFieldProps);
    muiSelectAllCheckboxProps?:
      | CheckboxProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => CheckboxProps);
    muiSelectCheckboxProps?:
      | CheckboxProps
      | (({
          instance,
          row,
        }: {
          instance: MRT_TableInstance<D>;
          row: MRT_Row<D>;
        }) => CheckboxProps);
    muiTableBodyCellCopyButtonProps?:
      | ButtonProps
      | (({
          instance,
          cell,
        }: {
          instance: MRT_TableInstance<D>;
          cell: MRT_Cell<D>;
        }) => ButtonProps);
    muiTableBodyCellEditTextFieldProps?:
      | TextFieldProps
      | (({
          instance,
          cell,
        }: {
          instance: MRT_TableInstance<D>;
          cell: MRT_Cell<D>;
        }) => TextFieldProps);
    muiTableBodyCellProps?:
      | TableCellProps
      | (({
          instance,
          cell,
        }: {
          instance: MRT_TableInstance<D>;
          cell: MRT_Cell<D>;
        }) => TableCellProps);
    muiTableBodyCellSkeletonProps?:
      | SkeletonProps
      | (({
          instance,
          cell,
        }: {
          instance: MRT_TableInstance<D>;
          cell: MRT_Cell<D>;
        }) => SkeletonProps);
    muiTableBodyProps?:
      | TableBodyProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => TableBodyProps);
    muiTableBodyRowProps?:
      | TableRowProps
      | (({
          instance,
          row,
        }: {
          instance: MRT_TableInstance<D>;
          row: MRT_Row<D>;
        }) => TableRowProps);
    muiTableContainerProps?:
      | TableContainerProps
      | (({
          instance,
        }: {
          instance: MRT_TableInstance<D>;
        }) => TableContainerProps);
    muiTableDetailPanelProps?:
      | TableCellProps
      | (({
          instance,
          row,
        }: {
          instance: MRT_TableInstance<D>;
          row: MRT_Row<D>;
        }) => TableCellProps);
    muiTableFooterCellProps?:
      | TableCellProps
      | (({
          instance,
          column,
        }: {
          instance: MRT_TableInstance<D>;
          column: MRT_Column<D>;
        }) => TableCellProps);
    muiTableFooterProps?:
      | TableFooterProps
      | (({
          instance,
        }: {
          instance: MRT_TableInstance<D>;
        }) => TableFooterProps);
    muiTableFooterRowProps?:
      | TableRowProps
      | (({
          instance,
          footerGroup,
        }: {
          instance: MRT_TableInstance<D>;
          footerGroup: MRT_HeaderGroup<D>;
        }) => TableRowProps);
    muiTableHeadCellColumnActionsButtonProps?:
      | IconButtonProps
      | (({
          instance,
          column,
        }: {
          instance: MRT_TableInstance<D>;
          column: MRT_Column<D>;
        }) => IconButtonProps);
    muiTableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | (({
          instance,
          column,
        }: {
          instance: MRT_TableInstance<D>;
          column: MRT_Column<D>;
        }) => TextFieldProps);
    muiTableHeadCellProps?:
      | TableCellProps
      | (({
          instance,
          column,
        }: {
          instance: MRT_TableInstance<D>;
          column: MRT_Column<D>;
        }) => TableCellProps);
    muiTableHeadProps?:
      | TableHeadProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => TableHeadProps);
    muiTableHeadRowProps?:
      | TableRowProps
      | (({
          instance,
          headerGroup,
        }: {
          instance: MRT_TableInstance<D>;
          headerGroup: MRT_HeaderGroup<D>;
        }) => TableRowProps);
    muiTablePaginationProps?:
      | Partial<TablePaginationProps>
      | (({
          instance,
        }: {
          instance: MRT_TableInstance<D>;
        }) => Partial<TablePaginationProps>);
    muiTablePaperProps?:
      | PaperProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => PaperProps);
    muiTableProps?:
      | TableProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => TableProps);
    muiTableToolbarAlertBannerProps?:
      | AlertProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => AlertProps);
    muiTableToolbarBottomProps?:
      | ToolbarProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => ToolbarProps);
    muiTableToolbarTopProps?:
      | ToolbarProps
      | (({ instance }: { instance: MRT_TableInstance<D> }) => ToolbarProps);
    onCellClick?: ({
      cell,
      event,
      instance,
    }: {
      cell: MRT_Cell<D>;
      instance: MRT_TableInstance<D>;
      event: MouseEvent<HTMLTableCellElement>;
    }) => void;
    onCellEditBlur?: ({
      cell,
      event,
      instance,
    }: {
      event: FocusEvent<HTMLInputElement>;
      cell: MRT_Cell<D>;
      instance: MRT_TableInstance<D>;
    }) => void;
    onCellEditChanged?: ({
      cell,
      event,
      instance,
    }: {
      event: ChangeEvent<HTMLInputElement>;
      cell: MRT_Cell<D>;
      instance: MRT_TableInstance<D>;
    }) => void;
    onColumnFilterValueChanged?: ({
      column,
      event,
      filterValue,
      instance,
    }: {
      column: MRT_Column<D>;
      event: ChangeEvent<HTMLInputElement>;
      filterValue: any;
      instance: MRT_TableInstance<D>;
    }) => void;
    onColumnFilterValueChangedDebounced?: ({
      column,
      event,
      filterValue,
      instance,
    }: {
      column: MRT_Column<D>;
      event: ChangeEvent<HTMLInputElement>;
      filterValue: any;
      instance: MRT_TableInstance<D>;
    }) => void;
    onColumnOrderChanged?: ({
      columnOrder,
      instance,
    }: {
      columnOrder: ColumnOrderState;
      instance: MRT_TableInstance<D>;
    }) => void;
    onColumnPinningChanged?: ({
      columnPinning,
      instance,
    }: {
      columnPinning: ColumnPinningState;
      instance: MRT_TableInstance<D>;
    }) => void;
    onColumnVisibilityChanged?: ({
      column,
      columnVisibility,
      instance,
    }: {
      column: MRT_Column<D>;
      columnVisibility: VisibilityState;
      instance: MRT_TableInstance<D>;
    }) => void;
    onCurrentEditingCellChange?: OnChangeFn<MRT_Cell>;
    onCurrentEditingRowChange?: OnChangeFn<MRT_Row>;
    onCurrentFilterFnsChange?: OnChangeFn<{ [key: string]: MRT_FilterFn }>;
    onCurrentGlobalFilterFnChange?: OnChangeFn<MRT_FilterFn>;
    onDetailPanelClick?: ({
      event,
      row,
      instance,
    }: {
      event: MouseEvent<HTMLTableCellElement>;
      row: MRT_Row<D>;
      instance: MRT_TableInstance<D>;
    }) => void;
    onEditRowSubmit?: ({
      row,
      instance,
    }: {
      row: MRT_Row<D>;
      instance: MRT_TableInstance<D>;
    }) => Promise<void> | void;
    onExpandChanged?: ({
      event,
      row,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      row: MRT_Row<D>;
      instance: MRT_TableInstance<D>;
    }) => void;
    onGlobalFilterValueChanged?: ({
      event,
      instance,
    }: {
      event: ChangeEvent<HTMLInputElement>;
      instance: MRT_TableInstance<D>;
    }) => void;
    onGlobalFilterValueChangedDebounced?: ({
      event,
      instance,
    }: {
      event: ChangeEvent<HTMLInputElement>;
      instance: MRT_TableInstance<D>;
    }) => void;
    onDensityChange?: OnChangeFn<boolean>;
    onDensityChanged?: ({
      event,
      density,
      instance,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      density: 'comfortable' | 'compact' | 'spacious';
      instance: MRT_TableInstance<D>;
    }) => void;
    onIsFullScreenChange?: OnChangeFn<boolean>;
    onIsFullScreenChanged?: ({
      event,
      isFullScreen,
      instance,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      isFullScreen: boolean;
      instance: MRT_TableInstance<D>;
    }) => void;
    onRowClick?: ({
      event,
      row,
      instance,
    }: {
      event: MouseEvent<HTMLTableRowElement>;
      row: MRT_Row<D>;
      instance: MRT_TableInstance<D>;
    }) => void;
    onRowSelectAllChanged?: ({
      event,
      selectedRows,
      instance,
    }: {
      event: ChangeEvent;
      selectedRows: MRT_Row<D>[];
      instance: MRT_TableInstance<D>;
    }) => void;
    onRowSelectionChanged?: ({
      event,
      row,
      selectedRows,
      instance,
    }: {
      event: ChangeEvent;
      row: MRT_Row<D>;
      selectedRows: MRT_Row<D>[];
      instance: MRT_TableInstance<D>;
    }) => void;
    onShowFiltersChange?: OnChangeFn<boolean>;
    onShowFiltersChanged?: ({
      event,
      instance,
      showFilters,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      instance: MRT_TableInstance<D>;
      showFilters: boolean;
    }) => void;
    onShowGlobalFilterChange?: OnChangeFn<boolean>;
    onShowGlobalFilterChanged?: ({
      event,
      instance,
      showGlobalFilter,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      instance: MRT_TableInstance<D>;
      showGlobalFilter: boolean;
    }) => void;
    positionActionsColumn?: 'first' | 'last';
    positionGlobalFilter?: 'left' | 'right';
    positionPagination?: 'bottom' | 'top' | 'both';
    positionToolbarAlertBanner?: 'bottom' | 'top';
    renderDetailPanel?: ({
      row,
      instance,
    }: {
      row: MRT_Row<D>;
      instance: MRT_TableInstance<D>;
    }) => ReactNode;
    renderRowActionMenuItems?: ({
      closeMenu,
      row,
      instance,
    }: {
      closeMenu: () => void;
      row: MRT_Row<D>;
      instance: MRT_TableInstance<D>;
    }) => ReactNode[];
    renderRowActions?: ({
      row,
      instance,
    }: {
      row: MRT_Row<D>;
      instance: MRT_TableInstance<D>;
    }) => ReactNode;
    renderToolbarBottomCustomActions?: ({
      instance,
    }: {
      instance: MRT_TableInstance<D>;
    }) => ReactNode;
    renderToolbarTopCustomActions?: ({
      instance,
    }: {
      instance: MRT_TableInstance<D>;
    }) => ReactNode;
    renderToolbarInternalActions?: ({
      instance,
      MRT_ToggleGlobalFilterButton,
      MRT_ToggleFiltersButton,
      MRT_ShowHideColumnsButton,
      MRT_ToggleDensePaddingButton,
      MRT_FullScreenToggleButton,
    }: {
      instance: MRT_TableInstance<D>;
      MRT_ToggleGlobalFilterButton: FC<
        IconButtonProps & { instance: MRT_TableInstance<D> }
      >;
      MRT_ToggleFiltersButton: FC<
        IconButtonProps & { instance: MRT_TableInstance<D> }
      >;
      MRT_ShowHideColumnsButton: FC<
        IconButtonProps & { instance: MRT_TableInstance<D> }
      >;
      MRT_ToggleDensePaddingButton: FC<
        IconButtonProps & { instance: MRT_TableInstance<D> }
      >;
      MRT_FullScreenToggleButton: FC<
        IconButtonProps & { instance: MRT_TableInstance<D> }
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
