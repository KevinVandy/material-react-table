import React, { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';
import {
  AlertProps,
  ButtonProps,
  CheckboxProps,
  IconButtonProps,
  LinearProgressProps,
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
  FilterType,
  Header,
  HeaderGroup,
  Options,
  Please_use_the_create_table_column_utilities_to_define_columns,
  Row,
  TableInstance,
  TableState,
} from '@tanstack/react-table';
import { MaterialReactTableProvider } from './useMRT';
import { MRT_TableContainer } from './table/MRT_TableContainer';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_Default_Icons, MRT_Icons } from './icons';
import { MRT_FILTER_TYPE } from './enums';

export type MRT_TableOptions<D extends {} = {}> = Partial<
  Omit<Options<D>, 'columns' | 'data' | 'initialState' | 'state'>
> & {
  columns: MRT_ColumnInterface<D>[];
  data: D[];
  initialState?: Partial<MRT_TableState<D>>;
  state?: Partial<MRT_TableState<D>>;
};

export type MRT_TableInstance<D extends {} = {}> = Omit<
  TableInstance<D>,
  'getState' | 'getAllColumns'
> & {
  getState: () => MRT_TableState<D>;
  getAllColumns: () => MRT_ColumnInstance<D>[];
};

export type MRT_TableState<D extends {} = {}> = TableState & {
  currentEditingRow: MRT_Row<D> | null;
  currentFilterTypes: { [key: string]: MRT_FilterType };
  currentGlobalFilterType: MRT_FilterType;
  densePadding: boolean;
  fullScreen: boolean;
  showFilters: boolean;
  showSearch: boolean;
};

export type MRT_ColumnInterface<D extends {} = {}> = Omit<
  ColumnDef<D>,
  | 'header'
  | 'id'
  | 'footer'
  | typeof Please_use_the_create_table_column_utilities_to_define_columns
> & {
  Edit?: ({
    cell,
    onChange,
  }: {
    cell: MRT_Cell<D>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
  Filter?: ({ column }: { column: MRT_HeaderGroup<D> }) => ReactNode;
  Footer?: ReactNode;
  Header?: ReactNode;
  columnType?: 'group' | 'data' | 'display' | null;
  columns?: MRT_ColumnInterface<D>[];
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableEditing?: boolean;
  enableColumnFilters?: boolean;
  enableHiding?: boolean;
  enabledFilterTypes?: (MRT_FILTER_TYPE | string)[];
  filter?: MRT_FilterType | string | FilterType<D>;
  filterSelectOptions?: (string | { text: string; value: string })[];
  footer?: string;
  header: string;
  id: keyof D | string;
  muiTableBodyCellCopyButtonProps?:
    | ButtonProps
    | ((cell?: MRT_Cell<D>) => ButtonProps);
  muiTableBodyCellEditTextFieldProps?:
    | TextFieldProps
    | ((cell: MRT_Cell<D>) => TextFieldProps);
  muiTableBodyCellProps?:
    | TableCellProps
    | ((cell: MRT_Cell<D>) => TableCellProps);
  muiTableFooterCellProps?:
    | TableCellProps
    | ((column: MRT_ColumnInstance<D>) => TableCellProps);
  muiTableHeadCellColumnActionsButtonProps?:
    | IconButtonProps
    | ((column: MRT_ColumnInstance<D>) => IconButtonProps);
  muiTableHeadCellFilterTextFieldProps?:
    | TextFieldProps
    | ((column: MRT_ColumnInstance<D>) => TextFieldProps);
  muiTableHeadCellProps?:
    | TableCellProps
    | ((column: MRT_ColumnInstance<D>) => TableCellProps);
  onCellEditChange?: (
    event: ChangeEvent<HTMLInputElement>,
    cell: MRT_Cell<D>,
  ) => void;
  onFilterChange?: (
    event: ChangeEvent<HTMLInputElement>,
    filterValue: any,
  ) => void;
};

export type MRT_ColumnInstance<D extends {} = {}> = Omit<Column<D>, 'columns'> &
  MRT_ColumnInterface<D> & {
    columns?: MRT_ColumnInstance<D>[];
  };

export type MRT_Header<D extends {} = {}> = Omit<Header<D>, 'column'> & {
  column: MRT_ColumnInstance<D>;
};

export type MRT_HeaderGroup<D extends {} = {}> = Omit<
  HeaderGroup<D>,
  'headers'
> & {
  headers: MRT_Header<D>[];
};

export type MRT_Row<D extends {} = {}> = Omit<
  Row<D>,
  'getVisibleCells' | 'getAllCells' | 'id'
> & {
  getVisibleCells: () => MRT_Cell<D>[];
  getAllCells: () => MRT_Cell<D>[];
  id: string;
};

export type MRT_Cell<D extends {} = {}> = Omit<Cell<D>, 'column'> & {
  column: MRT_ColumnInstance<D>;
};

export type MRT_FilterType = MRT_FILTER_TYPE | Function;

export type MaterialReactTableProps<D extends {} = {}> = MRT_TableOptions<D> & {
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableColumnResizing?: boolean;
  enableDensePaddingToggle?: boolean;
  enableExpandAll?: boolean;
  enableFullScreenToggle?: boolean;
  enablePagination?: boolean;
  enableRowActions?: boolean;
  enableRowEditing?: boolean;
  enableRowNumbers?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSubRowTree?: boolean;
  enabledGlobalFilterTypes?: (MRT_FILTER_TYPE | string)[];
  filterTypes?: { [key in MRT_FILTER_TYPE]: any };
  hideTableFooter?: boolean;
  hideTableHead?: boolean;
  hideToolbarBottom?: boolean;
  hideToolbarInternalActions?: boolean;
  hideToolbarTop?: boolean;
  icons?: Partial<MRT_Icons>;
  idPrefix?: string;
  isFetching?: boolean;
  isLoading?: boolean;
  localization?: Partial<MRT_Localization>;
  muiLinearProgressProps?:
    | LinearProgressProps
    | ((tableInstance: MRT_TableInstance) => LinearProgressProps);
  muiSearchTextFieldProps?: TextFieldProps;
  muiSelectCheckboxProps?:
    | CheckboxProps
    | ((
        isSelectAll?: boolean,
        row?: MRT_Row<D>,
        tableInstance?: MRT_TableInstance<D>,
      ) => CheckboxProps);
  muiTableBodyCellCopyButtonProps?:
    | ButtonProps
    | ((cell?: MRT_Cell<D>) => ButtonProps);
  muiTableBodyCellEditTextFieldProps?:
    | TextFieldProps
    | ((cell?: MRT_Cell<D>) => TextFieldProps);
  muiTableBodyCellProps?:
    | TableCellProps
    | ((cell?: MRT_Cell<D>) => TableCellProps);
  muiTableBodyCellSkeletonProps?:
    | SkeletonProps
    | ((cell?: MRT_Cell<D>) => SkeletonProps);
  muiTableBodyProps?:
    | TableBodyProps
    | ((tableInstance: MRT_TableInstance<D>) => TableBodyProps);
  muiTableBodyRowProps?: TableRowProps | ((row: MRT_Row<D>) => TableRowProps);
  muiTableContainerProps?:
    | TableContainerProps
    | ((tableInstance: MRT_TableInstance<D>) => TableContainerProps);
  muiTableDetailPanelProps?:
    | TableCellProps
    | ((row: MRT_Row<D>) => TableCellProps);
  muiTableFooterCellProps?:
    | TableCellProps
    | ((column: MRT_ColumnInstance<D>) => TableCellProps);
  muiTableFooterProps?:
    | TableFooterProps
    | ((tableInstance: MRT_TableInstance<D>) => TableFooterProps);
  muiTableFooterRowProps?:
    | TableRowProps
    | ((footerGroup: MRT_HeaderGroup<D>) => TableRowProps);
  muiTableHeadCellColumnActionsButtonProps?:
    | IconButtonProps
    | ((column: MRT_ColumnInstance<D>) => IconButtonProps);
  muiTableHeadCellFilterTextFieldProps?:
    | TextFieldProps
    | ((column: MRT_ColumnInstance<D>) => TextFieldProps);
  muiTableHeadCellProps?:
    | TableCellProps
    | ((column: MRT_ColumnInstance<D>) => TableCellProps);
  muiTableHeadProps?:
    | TableHeadProps
    | ((tableInstance: MRT_TableInstance<D>) => TableHeadProps);
  muiTableHeadRowProps?:
    | TableRowProps
    | ((headerGroup: MRT_HeaderGroup<D>) => TableRowProps);
  muiTablePaginationProps?:
    | Partial<TablePaginationProps>
    | ((tableInstance: MRT_TableInstance<D>) => Partial<TablePaginationProps>);
  muiTableProps?:
    | TableProps
    | ((tableInstance: MRT_TableInstance<D>) => TableProps);
  muiTableToolbarAlertBannerProps?:
    | AlertProps
    | ((tableInstance: MRT_TableInstance<D>) => AlertProps);
  muiTableToolbarBottomProps?:
    | ToolbarProps
    | ((tableInstance: MRT_TableInstance<D>) => ToolbarProps);
  muiTableToolbarTopProps?:
    | ToolbarProps
    | ((tableInstance: MRT_TableInstance<D>) => ToolbarProps);
  onCellClick?: (
    event: MouseEvent<HTMLTableCellElement>,
    cell: MRT_Cell<D>,
  ) => void;
  onColumnHide?: (
    column: MRT_ColumnInstance<D>,
    hiddenColumns?: string[],
  ) => void;
  onDetailPanelClick?: (
    event: MouseEvent<HTMLTableCellElement>,
    row: MRT_Row<D>,
  ) => void;
  onGlobalFilterChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onRowClick?: (
    event: MouseEvent<HTMLTableRowElement>,
    row: MRT_Row<D>,
  ) => void;
  onRowEditSubmit?: (row: MRT_Row<D>) => Promise<void> | void;
  onRowExpandChange?: (
    event: MouseEvent<HTMLButtonElement>,
    row: MRT_Row<D>,
  ) => void;
  onSelectAllChange?: (event: ChangeEvent, selectedRows: MRT_Row<D>[]) => void;
  onSelectChange?: (
    event: ChangeEvent,
    row: MRT_Row<D>,
    selectedRows: MRT_Row<D>[],
  ) => void;
  positionActionsColumn?: 'first' | 'last';
  positionPagination?: 'bottom' | 'top' | 'both';
  positionToolbarActions?: 'bottom' | 'top';
  positionToolbarAlertBanner?: 'bottom' | 'top';
  renderDetailPanel?: (row: MRT_Row<D>) => ReactNode;
  renderRowActionMenuItems?: (
    rowData: MRT_Row<D>,
    tableInstance: MRT_TableInstance<D>,
    closeMenu: () => void,
  ) => ReactNode[];
  renderRowActions?: (
    row: MRT_Row<D>,
    tableInstance: MRT_TableInstance<D>,
  ) => ReactNode;
  renderToolbarCustomActions?: (
    tableInstance: MRT_TableInstance<D>,
  ) => ReactNode;
  renderToolbarInternalActions?: (
    tableInstance: MRT_TableInstance<D>,
    {
      MRT_ToggleSearchButton,
      MRT_ToggleFiltersButton,
      MRT_ShowHideColumnsButton,
      MRT_ToggleDensePaddingButton,
      MRT_FullScreenToggleButton,
    }: {
      MRT_ToggleSearchButton: FC<IconButtonProps>;
      MRT_ToggleFiltersButton: FC<IconButtonProps>;
      MRT_ShowHideColumnsButton: FC<IconButtonProps>;
      MRT_ToggleDensePaddingButton: FC<IconButtonProps>;
      MRT_FullScreenToggleButton: FC<IconButtonProps>;
    },
  ) => ReactNode;
};

export default <D extends {} = {}>({
  // defaultColumn = { minWidth: 50, maxWidth: 1000 },
  enableColumnActions = true,
  enableColumnFilters = true,
  enableDensePaddingToggle = true,
  enableFullScreenToggle = true,
  enableGlobalFilter = true,
  enableHiding = true,
  enablePagination = true,
  enableSorting = true,
  filterTypes,
  icons,
  localization,
  positionActionsColumn = 'first',
  positionPagination = 'bottom',
  positionToolbarActions = 'top',
  positionToolbarAlertBanner = 'top',
  ...rest
}: MaterialReactTableProps<D>) => (
  <MaterialReactTableProvider
    // defaultColumn={defaultColumn}
    enableColumnActions={enableColumnActions}
    enableColumnFilters={enableColumnFilters}
    enableDensePaddingToggle={enableDensePaddingToggle}
    enableFullScreenToggle={enableFullScreenToggle}
    enableGlobalFilter={enableGlobalFilter}
    enableHiding={enableHiding}
    enablePagination={enablePagination}
    enableSorting={enableSorting}
    // filterTypes={{ ...defaultFilterFNs, ...filterTypes }}
    icons={{ ...MRT_Default_Icons, ...icons }}
    localization={{ ...MRT_DefaultLocalization_EN, ...localization }}
    positionActionsColumn={positionActionsColumn}
    positionPagination={positionPagination}
    positionToolbarActions={positionToolbarActions}
    positionToolbarAlertBanner={positionToolbarAlertBanner}
    {...rest}
  >
    <MRT_TableContainer />
  </MaterialReactTableProvider>
);
