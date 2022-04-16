import React, {
  ChangeEvent,
  Dispatch,
  FC,
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
  VisibilityState,
} from '@tanstack/react-table';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_Default_Icons, MRT_Icons } from './icons';
import { MRT_FILTER_TYPE } from './enums';
import { MRT_TableRoot } from './table/MRT_TableRoot';

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
  | 'options'
> & {
  getAllColumns: () => MRT_ColumnInstance<D>[];
  getAllLeafColumns: () => MRT_ColumnInstance<D>[];
  getExpandedRowModel: () => MRT_RowModel<D>;
  getPaginationRowModel: () => MRT_RowModel<D>;
  getPrePaginationRowModel: () => MRT_RowModel<D>;
  getRowModel: () => MRT_RowModel<D>;
  getSelectedRowModel: () => MRT_RowModel<D>;
  getState: () => MRT_TableState<D>;
  options: MaterialReactTableProps<D> & {
    icons: MRT_Icons;
    idPrefix: string;
    filterTypes: { [key in MRT_FILTER_TYPE]: any };
    localization: MRT_Localization;
    setCurrentEditingRow: Dispatch<SetStateAction<MRT_Row<D> | null>>;
    setCurrentFilterTypes: Dispatch<
      SetStateAction<{
        [key: string]: MRT_FilterType;
      }>
    >;
    setCurrentGlobalFilterType: Dispatch<SetStateAction<MRT_FILTER_TYPE>>;
    setIsDensePadding: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setShowFilters: Dispatch<SetStateAction<boolean>>;
    setShowSearch: Dispatch<SetStateAction<boolean>>;
  };
};

export type MRT_TableState<D extends Record<string, any> = {}> = Omit<
  TableState,
  'pagination'
> & {
  currentEditingRow: MRT_Row<D> | null;
  currentFilterTypes: Record<string, string | Function>;
  currentGlobalFilterType: Record<string, string | Function>;
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
  }: // onChange,
  {
    cell: MRT_Cell<D>;
    tableInstance: MRT_TableInstance<D>;
    // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }) => ReactNode;
  Filter?: ({
    // onChange,
    header,
    tableInstance,
  }: {
    // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    header: MRT_Header<D>;
    tableInstance: MRT_TableInstance<D>;
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
  id: keyof D | string;
  columns?: MRT_ColumnInterface<D>[];
  enableClickToCopy?: boolean;
  enableColumnActions?: boolean;
  enableEditing?: boolean;
  enabledFilterTypes?: (MRT_FILTER_TYPE | string)[];
  filter?: MRT_FilterType | string | FilterType<D>;
  filterSelectOptions?: (string | { text: string; value: string })[];
  footer?: string;
  header: string;
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
        column: MRT_ColumnInstance<D>;
      }) => TableCellProps);
  muiTableHeadCellColumnActionsButtonProps?:
    | IconButtonProps
    | (({
        tableInstance,
        column,
      }: {
        tableInstance: MRT_TableInstance;
        column: MRT_ColumnInstance<D>;
      }) => IconButtonProps);
  muiTableHeadCellFilterTextFieldProps?:
    | TextFieldProps
    | (({
        tableInstance,
        column,
      }: {
        tableInstance: MRT_TableInstance;
        column: MRT_ColumnInstance<D>;
      }) => TextFieldProps);
  muiTableHeadCellProps?:
    | TableCellProps
    | (({
        tableInstance,
        column,
      }: {
        tableInstance: MRT_TableInstance;
        column: MRT_ColumnInstance<D>;
      }) => TableCellProps);
  onCellEditChange?: ({
    cell,
    event,
    tableInstance,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    cell: MRT_Cell<D>;
    tableInstance: MRT_TableInstance<D>;
  }) => void;
  onColumnFilterValueChange?: ({
    event,
    filterValue,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    filterValue: any;
  }) => void;
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
    isReloading?: boolean;
    isLoading?: boolean;
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
          column: MRT_ColumnInstance<D>;
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
          column: MRT_ColumnInstance<D>;
        }) => IconButtonProps);
    muiTableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | (({
          tableInstance,
          column,
        }: {
          tableInstance: MRT_TableInstance;
          column: MRT_ColumnInstance<D>;
        }) => TextFieldProps);
    muiTableHeadCellProps?:
      | TableCellProps
      | (({
          tableInstance,
          column,
        }: {
          tableInstance: MRT_TableInstance;
          column: MRT_ColumnInstance<D>;
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
    muiTablePaperProps?:
      | PaperProps
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => PaperProps);
    muiTablePaginationProps?:
      | Partial<TablePaginationProps>
      | (({
          tableInstance,
        }: {
          tableInstance: MRT_TableInstance;
        }) => Partial<TablePaginationProps>);
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
    onCellClick?: ({
      cell,
      event,
      tableInstance,
    }: {
      cell: MRT_Cell<D>;
      tableInstance: MRT_TableInstance<D>;
      event: MouseEvent<HTMLTableCellElement>;
    }) => void;
    onColumnHide?: ({
      column,
      columnVisibility,
      tableInstance,
    }: {
      column: MRT_ColumnInstance<D>;
      columnVisibility: VisibilityState;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onDetailPanelClick?: ({
      event,
      row,
      tableInstance,
    }: {
      event: MouseEvent<HTMLTableCellElement>;
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onGlobalFilterChange?: ({
      event,
      tableInstance,
    }: {
      event: ChangeEvent<HTMLInputElement>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onRowClick?: ({
      event,
      row,
      tableInstance,
    }: {
      event: MouseEvent<HTMLTableRowElement>;
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onRowEditSubmit?: ({
      row,
      tableInstance,
    }: {
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => Promise<void> | void;
    onRowExpandChange?: ({
      event,
      row,
    }: {
      event: MouseEvent<HTMLButtonElement>;
      row: MRT_Row<D>;
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onSelectAllChange?: ({
      event,
      selectedRows,
      tableInstance,
    }: {
      event: ChangeEvent;
      selectedRows: MRT_Row<D>[];
      tableInstance: MRT_TableInstance<D>;
    }) => void;
    onSelectChange?: ({
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
    positionActionsColumn?: 'first' | 'last';
    positionPagination?: 'bottom' | 'top' | 'both';
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
      MRT_ToggleSearchButton,
      MRT_ToggleFiltersButton,
      MRT_ShowHideColumnsButton,
      MRT_ToggleDensePaddingButton,
      MRT_FullScreenToggleButton,
    }: {
      tableInstance: MRT_TableInstance<D>;
      MRT_ToggleSearchButton: FC<
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
  <MRT_TableRoot
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
    icons={{ ...MRT_Default_Icons, ...icons }}
    localization={{ ...MRT_DefaultLocalization_EN, ...localization }}
    positionActionsColumn={positionActionsColumn}
    positionPagination={positionPagination}
    positionToolbarActions={positionToolbarActions}
    positionToolbarAlertBanner={positionToolbarAlertBanner}
    {...rest}
  />
);
