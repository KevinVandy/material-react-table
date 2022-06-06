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
  FilterFn,
  FilterFnOption,
  Header,
  HeaderGroup,
  Overwrite,
  ReactTableGenerics,
  Row,
  TableGenerics,
  TableInstance,
  TableState,
  UseTableInstanceOptions,
  VisibilityState,
} from '@tanstack/react-table';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_Default_Icons, MRT_Icons } from './icons';
import { MRT_FILTER_OPTION } from './enums';
import { MRT_TableRoot } from './table/MRT_TableRoot';

export type MRT_TableOptions<D extends Record<string, any> = {}> = Partial<
  Omit<
    UseTableInstanceOptions<ReactTableGenerics>,
    'columns' | 'data' | 'initialState' | 'state' | 'expandRowsFn' | 'filterFns'
  >
> & {
  columns: MRT_ColumnDef<D>[];
  data: D[];
  expandRowsFn?: (dataRow: D) => D[];
  filterFns?: MRT_FILTER_OPTION | FilterFn<D> | string | number | symbol;
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
  setCurrentGlobalFilterFn: Dispatch<SetStateAction<MRT_FilterFn<D>>>;
  setIsDensePadding: Dispatch<SetStateAction<boolean>>;
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setShowGlobalFilter: Dispatch<SetStateAction<boolean>>;
};

export type MRT_TableState<D extends Record<string, any> = {}> = TableState & {
  currentEditingCell: MRT_Cell<D> | null;
  currentEditingRow: MRT_Row<D> | null;
  currentFilterFns: Record<string, string | Function>;
  currentGlobalFilterFn: Record<string, string | Function>;
  isDensePadding: boolean;
  isLoading: boolean;
  isFullScreen: boolean;
  showFilters: boolean;
  showGlobalFilter: boolean;
  showProgressBars: boolean;
  showSkeletons: boolean;
};

export type MRT_ColumnDef<D extends Record<string, any> = {}> = Omit<
  ColumnDef<D>,
  'accessorFN' | 'header' | 'footer' | 'columns' | 'filterFn'
> & {
  Cell?: ({
    cell,
    tableInstance,
  }: {
    cell: MRT_Cell<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => ReactNode;
  Edit?: ({
    cell,
    tableInstance,
  }: {
    cell: MRT_Cell<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => ReactNode;
  Filter?: ({
    header,
    tableInstance,
  }: {
    header: MRT_Header<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => ReactNode;
  Footer?:
    | ReactNode
    | (({
        footer,
        tableInstance,
      }: {
        footer: MRT_Header<D>;
        tableInstance: MRT_TableInstance<D>;
      }) => ReactNode);
  Header?:
    | ReactNode
    | (({
        header,
        tableInstance,
      }: {
        header: MRT_Header<D>;
        tableInstance: MRT_TableInstance<D>;
      }) => ReactNode);
  accessorFN?: (row: D) => any;
  columns?: MRT_ColumnDef<D>[];
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnOrdering?: boolean;
  enableEditing?: boolean;
  enabledColumnFilterOptions?: (MRT_FILTER_OPTION | string)[];
  filterFn?: MRT_FilterFn;
  filterSelectOptions?: (string | { text: string; value: string })[];
  footer?: string;
  header: string;
  id: keyof D | string;
  muiTableBodyCellCopyButtonProps?:
    | ButtonProps
    | (({
        tableInstance,
        cell,
      }: {
        tableInstance: MRT_TableInstance;
        cell: MRT_Cell<D>;
      }) => ButtonProps);
  muiTableBodyCellEditTextFieldProps?:
    | TextFieldProps
    | (({
        tableInstance,
        cell,
      }: {
        tableInstance: MRT_TableInstance;
        cell: MRT_Cell<D>;
      }) => TextFieldProps);
  muiTableBodyCellProps?:
    | TableCellProps
    | (({
        tableInstance,
        cell,
      }: {
        tableInstance: MRT_TableInstance;
        cell: MRT_Cell<D>;
      }) => TableCellProps);
  muiTableFooterCellProps?:
    | TableCellProps
    | (({
        tableInstance,
        column,
      }: {
        tableInstance: MRT_TableInstance;
        column: MRT_Column<D>;
      }) => TableCellProps);
  muiTableHeadCellColumnActionsButtonProps?:
    | IconButtonProps
    | (({
        tableInstance,
        column,
      }: {
        tableInstance: MRT_TableInstance;
        column: MRT_Column<D>;
      }) => IconButtonProps);
  muiTableHeadCellFilterTextFieldProps?:
    | TextFieldProps
    | (({
        tableInstance,
        column,
      }: {
        tableInstance: MRT_TableInstance;
        column: MRT_Column<D>;
      }) => TextFieldProps);
  muiTableHeadCellProps?:
    | TableCellProps
    | (({
        tableInstance,
        column,
      }: {
        tableInstance: MRT_TableInstance;
        column: MRT_Column<D>;
      }) => TableCellProps);
  onMrtCellEditBlur?: ({
    cell,
    event,
    tableInstance,
  }: {
    event: FocusEvent<HTMLInputElement>;
    cell: MRT_Cell<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => void;
  onMrtCellEditChange?: ({
    cell,
    event,
    tableInstance,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    cell: MRT_Cell<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => void;
  onMrtFilterValueChange?: ({
    column,
    event,
    filterValue,
  }: {
    column: MRT_Column<D>;
    event: ChangeEvent<HTMLInputElement>;
    filterValue: any;
  }) => void;
};

export type MRT_Column<D extends Record<string, any> = {}> = Omit<
  Column<D>,
  'header' | 'footer' | 'columns'
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

export type MRT_FilterFn<D extends Record<string, any> = {}> =
  | FilterFn<TableGenerics>
  | FilterFnOption<D>
  | MRT_FILTER_OPTION
  | number
  | string
  | symbol;

export type MaterialReactTableProps<D extends Record<string, any> = {}> =
  MRT_TableOptions<D> & {
    editingMode?: 'table' | 'row' | 'cell';
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
    enableColumnOrdering?: boolean;
    enableDensePaddingToggle?: boolean;
    enableEditing?: boolean;
    enableExpandAll?: boolean;
    enableFullScreenToggle?: boolean;
    enablePagination?: boolean;
    enablePersistentState?: boolean;
    enableRowActions?: boolean;
    enableRowNumbers?: boolean;
    enableSelectAll?: boolean;
    enableStickyHeader?: boolean;
    enableTableFooter?: boolean;
    enableTableHead?: boolean;
    enableToolbarBottom?: boolean;
    enableToolbarInternalActions?: boolean;
    enableToolbarTop?: boolean;
    enabledColumnFilterOptions?: (MRT_FILTER_OPTION | string)[];
    enabledGlobalFilterOptions?: (MRT_FILTER_OPTION | string)[];
    icons?: Partial<MRT_Icons>;
    localization?: Partial<MRT_Localization>;
    muiLinearProgressProps?:
      | LinearProgressProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => LinearProgressProps);
    muiSearchTextFieldProps?:
      | TextFieldProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => TextFieldProps);
    muiSelectCheckboxProps?:
      | CheckboxProps
      | (({
          tableInstance,
          isSelectAll,
          row,
        }: {
          tableInstance: MRT_TableInstance;
          isSelectAll: boolean;
          row?: MRT_Row<D>;
        }) => CheckboxProps);
    muiTableBodyCellCopyButtonProps?:
      | ButtonProps
      | (({
          tableInstance,
          cell,
        }: {
          tableInstance: MRT_TableInstance;
          cell: MRT_Cell<D>;
        }) => ButtonProps);
    muiTableBodyCellEditTextFieldProps?:
      | TextFieldProps
      | (({
          tableInstance,
          cell,
        }: {
          tableInstance: MRT_TableInstance;
          cell: MRT_Cell<D>;
        }) => TextFieldProps);
    muiTableBodyCellProps?:
      | TableCellProps
      | (({
          tableInstance,
          cell,
        }: {
          tableInstance: MRT_TableInstance;
          cell: MRT_Cell<D>;
        }) => TableCellProps);
    muiTableBodyCellSkeletonProps?:
      | SkeletonProps
      | (({
          tableInstance,
          cell,
        }: {
          tableInstance: MRT_TableInstance;
          cell: MRT_Cell<D>;
        }) => SkeletonProps);
    muiTableBodyProps?:
      | TableBodyProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => TableBodyProps);
    muiTableBodyRowProps?:
      | TableRowProps
      | (({
          tableInstance,
          row,
        }: {
          tableInstance: MRT_TableInstance;
          row: MRT_Row<D>;
        }) => TableRowProps);
    muiTableContainerProps?:
      | TableContainerProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => TableContainerProps);
    muiTableDetailPanelProps?:
      | TableCellProps
      | (({
          tableInstance,
          row,
        }: {
          tableInstance: MRT_TableInstance;
          row: MRT_Row<D>;
        }) => TableCellProps);
    muiTableFooterCellProps?:
      | TableCellProps
      | (({
          tableInstance,
          column,
        }: {
          tableInstance: MRT_TableInstance;
          column: MRT_Column<D>;
        }) => TableCellProps);
    muiTableFooterProps?:
      | TableFooterProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => TableFooterProps);
    muiTableFooterRowProps?:
      | TableRowProps
      | (({
          tableInstance,
          footerGroup,
        }: {
          tableInstance: MRT_TableInstance;
          footerGroup: MRT_HeaderGroup<D>;
        }) => TableRowProps);
    muiTableHeadCellColumnActionsButtonProps?:
      | IconButtonProps
      | (({
          tableInstance,
          column,
        }: {
          tableInstance: MRT_TableInstance;
          column: MRT_Column<D>;
        }) => IconButtonProps);
    muiTableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | (({
          tableInstance,
          column,
        }: {
          tableInstance: MRT_TableInstance;
          column: MRT_Column<D>;
        }) => TextFieldProps);
    muiTableHeadCellProps?:
      | TableCellProps
      | (({
          tableInstance,
          column,
        }: {
          tableInstance: MRT_TableInstance;
          column: MRT_Column<D>;
        }) => TableCellProps);
    muiTableHeadProps?:
      | TableHeadProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => TableHeadProps);
    muiTableHeadRowProps?:
      | TableRowProps
      | (({
          tableInstance,
          headerGroup,
        }: {
          tableInstance: MRT_TableInstance;
          headerGroup: MRT_HeaderGroup<D>;
        }) => TableRowProps);
    muiTablePaginationProps?:
      | Partial<TablePaginationProps>
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => Partial<TablePaginationProps>);
    muiTablePaperProps?:
      | PaperProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => PaperProps);
    muiTableProps?:
      | TableProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => TableProps);
    muiTableToolbarAlertBannerProps?:
      | AlertProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => AlertProps);
    muiTableToolbarBottomProps?:
      | ToolbarProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => ToolbarProps);
    muiTableToolbarTopProps?:
      | ToolbarProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => ToolbarProps);
    onMrtCellClick?: ({
      cell,
      event,
      tableInstance,
    }: {
      cell: MRT_Cell<D>;
      tableInstance: MRT_TableInstance<D>;
      event: MouseEvent<HTMLTableCellElement>;
    }) => void;
    onMrtCellEditBlur?: ({
      cell,
      event,
      tableInstance,
    }: {
      event: FocusEvent<HTMLInputElement>;
      cell: MRT_Cell<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtCellEditChange?: ({
      cell,
      event,
      tableInstance,
    }: {
      event: ChangeEvent<HTMLInputElement>;
      cell: MRT_Cell<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtDetailPanelClick?: ({
      event,
      row,
      tableInstance,
    }: {
      event: MouseEvent<HTMLTableCellElement>;
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtEditRowSubmit?: ({
      row,
      tableInstance,
    }: {
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => Promise<void> | void;
    onMrtFilterValueChange?: ({
      column,
      event,
      filterValue,
    }: {
      column: MRT_Column<D>;
      event: ChangeEvent<HTMLInputElement>;
      filterValue: any;
    }) => void;
    onMrtGlobalFilterValueChange?: ({
      event,
      tableInstance,
    }: {
      event: ChangeEvent<HTMLInputElement>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtRowClick?: ({
      event,
      row,
      tableInstance,
    }: {
      event: MouseEvent<HTMLTableRowElement>;
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtRowExpandChange?: ({
      event,
      row,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtSelectAllChange?: ({
      event,
      selectedRows,
      tableInstance,
    }: {
      event: ChangeEvent;
      selectedRows: MRT_Row<D>[];
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtSelectRowChange?: ({
      event,
      row,
      selectedRows,
      tableInstance,
    }: {
      event: ChangeEvent;
      row: MRT_Row<D>;
      selectedRows: MRT_Row<D>[];
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtToggleColumnVisibility?: ({
      column,
      columnVisibility,
      tableInstance,
    }: {
      column: MRT_Column<D>;
      columnVisibility: VisibilityState;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtToggleDensePadding?: ({
      event,
      isDensePadding,
      tableInstance,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      isDensePadding: boolean;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtToggleFullScreen?: ({
      event,
      isFullScreen,
      tableInstance,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      isFullScreen: boolean;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtToggleShowFilters?: ({
      event,
      showFilters,
      tableInstance,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      showFilters: boolean;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onMrtToggleShowGlobalFilter?: ({
      event,
      showGlobalFilter,
      tableInstance,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      showGlobalFilter: boolean;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    persistentStateMode?: 'localStorage' | 'sessionStorage';
    positionActionsColumn?: 'first' | 'last';
    positionPagination?: 'bottom' | 'top' | 'both';
    positionGlobalFilter?: 'left' | 'right';
    positionToolbarActions?: 'bottom' | 'top';
    positionToolbarAlertBanner?: 'bottom' | 'top';
    renderDetailPanel?: ({
      row,
      tableInstance,
    }: {
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => ReactNode;
    renderRowActionMenuItems?: ({
      closeMenu,
      row,
      tableInstance,
    }: {
      closeMenu: () => void;
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => ReactNode[];
    renderRowActions?: ({
      row,
      tableInstance,
    }: {
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => ReactNode;
    renderToolbarCustomActions?: ({
      tableInstance,
    }: {
      tableInstance: MRT_TableInstance<D>;
    }) => ReactNode;
    renderToolbarInternalActions?: ({
      tableInstance,
      MRT_ToggleGlobalFilterButton,
      MRT_ToggleFiltersButton,
      MRT_ShowHideColumnsButton,
      MRT_ToggleDensePaddingButton,
      MRT_FullScreenToggleButton,
    }: {
      tableInstance: MRT_TableInstance<D>;
      MRT_ToggleGlobalFilterButton: FC<
        IconButtonProps & { tableInstance: MRT_TableInstance<D> }
      >;
      MRT_ToggleFiltersButton: FC<
        IconButtonProps & { tableInstance: MRT_TableInstance<D> }
      >;
      MRT_ShowHideColumnsButton: FC<
        IconButtonProps & { tableInstance: MRT_TableInstance<D> }
      >;
      MRT_ToggleDensePaddingButton: FC<
        IconButtonProps & { tableInstance: MRT_TableInstance<D> }
      >;
      MRT_FullScreenToggleButton: FC<
        IconButtonProps & { tableInstance: MRT_TableInstance<D> }
      >;
    }) => ReactNode;
    selectAllMode?: 'all' | 'page';
    tableId?: string;
  };

export default <D extends Record<string, any> = {}>({
  autoResetExpanded = false,
  columnResizeMode = 'onEnd',
  defaultColumn = { minSize: 50, maxSize: 1000, size: 150 },
  editingMode = 'row',
  enableColumnActions = true,
  enableColumnFilters = true,
  enableColumnOrdering = false,
  enableColumnResizing = false,
  enableDensePaddingToggle = true,
  enableExpandAll = true,
  enableFilters = true,
  enableFullScreenToggle = true,
  enableGlobalFilter = true,
  enableGrouping = false,
  enableHiding = true,
  enableMultiRowSelection = true,
  enablePagination = true,
  enablePinning = false,
  enableSelectAll = true,
  enableSorting = true,
  enableStickyHeader = true,
  enableTableFooter = true,
  enableTableHead = true,
  enableToolbarBottom = true,
  enableToolbarInternalActions = true,
  enableToolbarTop = true,
  icons,
  localization,
  persistentStateMode = 'sessionStorage',
  positionActionsColumn = 'first',
  positionPagination = 'bottom',
  positionGlobalFilter = 'right',
  positionToolbarActions = 'top',
  positionToolbarAlertBanner = 'top',
  selectAllMode = 'all',
  ...rest
}: MaterialReactTableProps<D>) => (
  <MRT_TableRoot
    autoResetExpanded={autoResetExpanded}
    columnResizeMode={columnResizeMode}
    defaultColumn={defaultColumn}
    editingMode={editingMode}
    enableColumnActions={enableColumnActions}
    enableColumnFilters={enableColumnFilters}
    enableColumnOrdering={enableColumnOrdering}
    enableColumnResizing={enableColumnResizing}
    enableDensePaddingToggle={enableDensePaddingToggle}
    enableExpandAll={enableExpandAll}
    enableFilters={enableFilters}
    enableFullScreenToggle={enableFullScreenToggle}
    enableGlobalFilter={enableGlobalFilter}
    enableGrouping={enableGrouping}
    enableHiding={enableHiding}
    enableMultiRowSelection={enableMultiRowSelection}
    enablePagination={enablePagination}
    enablePinning={enablePinning}
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
    persistentStateMode={persistentStateMode}
    positionActionsColumn={positionActionsColumn}
    positionGlobalFilter={positionGlobalFilter}
    positionPagination={positionPagination}
    positionToolbarActions={positionToolbarActions}
    positionToolbarAlertBanner={positionToolbarAlertBanner}
    selectAllMode={selectAllMode}
    {...rest}
  />
);
