import React, { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';
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
  DefaultGenerics,
  FilterType,
  Header,
  HeaderGroup,
  Options,
  Overwrite,
  PaginationState,
  Row,
  TableInstance,
  TableState,
} from '@tanstack/react-table';
import { MaterialReactTableProvider } from './useMRT';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_Default_Icons, MRT_Icons } from './icons';
import { MRT_FILTER_TYPE } from './enums';
import { MRT_TablePaper } from './table/MRT_TablePaper';

export type MRT_TableOptions<D extends Record<string, any> = {}> = Partial<
  Omit<
    Options<D>,
    'columns' | 'data' | 'initialState' | 'state' | 'expandRowsFn'
  >
> & {
  columns: MRT_ColumnInterface<D>[];
  data: D[];
  initialState?: Partial<MRT_TableState<D>>;
  state?: Partial<MRT_TableState<D>>;
  expandRowsFn?: (dataRow: D) => D[];
};

export interface MRT_RowModel<D extends Record<string, any> = {}> {
  flatRows: MRT_Row<D>[];
  rows: MRT_Row<D>[];
  rowsById: { [key: string]: MRT_Row<D> };
}

export type MRT_TableInstance<D extends Record<string, any> = {}> = Omit<
  TableInstance<
    Overwrite<
      Partial<DefaultGenerics>,
      {
        Row: D;
      }
    >
  >,
  | 'getAllColumns'
  | 'getAllLeafColumns'
  | 'getExpandedRowModel'
  | 'getPaginationRowModel'
  | 'getPrePaginationRowModel'
  | 'getRowModel'
  | 'getSelectedRowModel'
  | 'getState'
> & {
  getAllColumns: () => MRT_ColumnInstance<D>[];
  getAllLeafColumns: () => MRT_ColumnInstance<D>[];
  getExpandedRowModel: () => MRT_RowModel;
  getPaginationRowModel: () => MRT_RowModel;
  getPrePaginationRowModel: () => MRT_RowModel;
  getRowModel: () => MRT_RowModel;
  getSelectedRowModel: () => MRT_RowModel;
  getState: () => MRT_TableState<D>;
};

export type MRT_TableState<D extends Record<string, any> = {}> = Omit<
  TableState,
  'pagination'
> & {
  currentEditingRow: MRT_Row<D> | null;
  isDensePadding: boolean;
  isFullScreen: boolean;
  showFilters: boolean;
  showSearch: boolean;
  pagination: Partial<PaginationState>;
};

export type MRT_ColumnInterface<D extends Record<string, any> = {}> = Omit<
  ColumnDef<D>,
  'header' | 'footer' | 'columns'
> & {
  Edit?: ({
    cell,
    tableInstance,
    onChange,
  }: {
    cell: MRT_Cell<D>;
    tableInstance: MRT_TableInstance<D>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
  Filter?: ({
    header,
    tableInstance,
    onChange,
  }: {
    header: MRT_Header<D>;
    tableInstance: MRT_TableInstance<D>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
  Footer?: ({
    footer,
    tableInstance,
  }: {
    footer: MRT_Header<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => ReactNode;
  Header?: ({
    header,
    tableInstance,
  }: {
    header: MRT_Header<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => ReactNode;
  Cell?: ({
    cell,
    tableInstance,
  }: {
    cell: MRT_Cell<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => ReactNode;
  isDisplayColumn?: boolean;
  id: keyof D | string;
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

export type MRT_ColumnInstance<D extends Record<string, any> = {}> = Omit<
  Column<D>,
  'header' | 'footer' | 'columns'
> &
  MRT_ColumnInterface<D> & {
    columns?: MRT_ColumnInstance<D>[];
  };

export type MRT_Header<D extends Record<string, any> = {}> = Omit<
  Header<D>,
  'column'
> & {
  column: MRT_ColumnInstance<D>;
};

export type MRT_HeaderGroup<D extends Record<string, any> = {}> = Omit<
  HeaderGroup<D>,
  'headers'
> & {
  headers: MRT_Header<D>[];
};

export type MRT_Row<D extends Record<string, any> = {}> = Omit<
  Row<D>,
  | 'getVisibleCells'
  | 'getAllCells'
  | 'subRows'
  | 'original'
  | 'getLeftVisibleCells'
  | 'getRightVisibleCells'
  | 'getCenterVisibleCells'
> & {
  getAllCells: () => MRT_Cell<D>[];
  getCenterVisibleCells: () => MRT_Cell<D>[];
  getLeftVisibleCells: () => MRT_Cell<D>[];
  getRightVisibleCells: () => MRT_Cell<D>[];
  getVisibleCells: () => MRT_Cell<D>[];
  subRows?: MRT_Row<D>[];
  original: D;
};

export type MRT_Cell<D extends Record<string, any> = {}> = Omit<
  Cell<D>,
  'column' | 'row'
> & {
  column: MRT_ColumnInstance<D>;
  row: MRT_Row<D>;
};

export type MRT_FilterType = MRT_FILTER_TYPE | Function;

export type MaterialReactTableProps<D extends Record<string, any> = {}> =
  MRT_TableOptions<D> & {
    enableClickToCopy?: boolean;
    enableColumnActions?: boolean;
    enableColumnPinning?: boolean;
    enableDensePaddingToggle?: boolean;
    enableExpandAll?: boolean;
    enableFullScreenToggle?: boolean;
    enablePagination?: boolean;
    enableRowActions?: boolean;
    enableStickyHeader?: boolean;
    enableRowEditing?: boolean;
    enableRowNumbers?: boolean;
    enableSelectAll?: boolean;
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
    muiTablePaperProps?:
      | PaperProps
      | ((tableInstance: MRT_TableInstance<D>) => PaperProps);
    muiTablePaginationProps?:
      | Partial<TablePaginationProps>
      | ((
          tableInstance: MRT_TableInstance<D>,
        ) => Partial<TablePaginationProps>);
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
    onSelectAllChange?: (
      event: ChangeEvent,
      selectedRows: MRT_Row<D>[],
    ) => void;
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

export default <D extends Record<string, any> = {}>({
  enableColumnActions = true,
  enableColumnFilters = true,
  enableDensePaddingToggle = true,
  enableExpandAll = true,
  enableFullScreenToggle = true,
  enableGlobalFilter = true,
  enableHiding = true,
  enablePagination = true,
  enableSelectAll = true,
  enableSorting = true,
  enableStickyHeader = true,
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
    enableColumnActions={enableColumnActions}
    enableColumnFilters={enableColumnFilters}
    enableDensePaddingToggle={enableDensePaddingToggle}
    enableExpandAll={enableExpandAll}
    enableFullScreenToggle={enableFullScreenToggle}
    enableGlobalFilter={enableGlobalFilter}
    enableHiding={enableHiding}
    enablePagination={enablePagination}
    enableSelectAll={enableSelectAll}
    enableSorting={enableSorting}
    enableStickyHeader={enableStickyHeader}
    // filterTypes={{ ...defaultFilterFNs, ...filterTypes }}
    icons={{ ...MRT_Default_Icons, ...icons }}
    localization={{ ...MRT_DefaultLocalization_EN, ...localization }}
    positionActionsColumn={positionActionsColumn}
    positionPagination={positionPagination}
    positionToolbarActions={positionToolbarActions}
    positionToolbarAlertBanner={positionToolbarAlertBanner}
    {...rest}
  >
    <MRT_TablePaper />
  </MaterialReactTableProvider>
);
