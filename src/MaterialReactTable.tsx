import React, { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';
import {
  AlertProps,
  IconButtonProps,
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
  ColumnInstance,
  // ColumnInterface,
  HeaderGroup,
  Row,
  TableInstance,
  TableOptions,
  TableState,
  UseColumnOrderInstanceProps,
  UseColumnOrderState,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  UseExpandedState,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseFiltersInstanceProps,
  UseFiltersOptions,
  UseFiltersState,
  UseGlobalFiltersColumnOptions,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseGroupByCellProps,
  UseGroupByColumnOptions,
  UseGroupByColumnProps,
  UseGroupByInstanceProps,
  UseGroupByOptions,
  UseGroupByRowProps,
  UseGroupByState,
  UsePaginationInstanceProps,
  UsePaginationOptions,
  UsePaginationState,
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseRowStateCellProps,
  UseRowStateInstanceProps,
  UseRowStateOptions,
  UseRowStateRowProps,
  UseRowStateState,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByInstanceProps,
  UseSortByOptions,
  UseSortByState,
  UseTableHeaderGroupProps,
  UseTableInstanceProps,
  UseTableOptions,
} from 'react-table';
import { MaterialReactTableProvider } from './useMRT';
import { MRT_TableContainer } from './table/MRT_TableContainer';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_Default_Icons, MRT_Icons } from './icons';

export type MRT_TableOptions<D extends {} = {}> = TableOptions<D> &
  UseExpandedOptions<D> &
  UseFiltersOptions<D> &
  UseGlobalFiltersOptions<D> &
  UseGroupByOptions<D> &
  UsePaginationOptions<D> &
  UseResizeColumnsOptions<D> &
  UseRowSelectOptions<D> &
  UseRowStateOptions<D> &
  UseSortByOptions<D> & {
    columns: (Column<D> & MRT_ColumnInterface)[];
    data: D[];
    initialState?: Partial<MRT_TableState>;
  };

export type MRT_TableInstance<D extends {} = {}> = TableInstance<D> &
  UseTableInstanceProps<D> &
  UseColumnOrderInstanceProps<D> &
  UseExpandedInstanceProps<D> &
  UseFiltersInstanceProps<D> &
  UseGlobalFiltersInstanceProps<D> &
  UseGroupByInstanceProps<D> &
  UsePaginationInstanceProps<D> &
  UseRowSelectInstanceProps<D> &
  UseRowStateInstanceProps<D> &
  UseSortByInstanceProps<D> & {
    columns: (Column<D> & MRT_ColumnInstance<D>)[];
    headerGroups: MRT_HeaderGroup<D>[];
    footerGroups: MRT_HeaderGroup<D>[];
    state: MRT_TableState<D>;
    rows: MRT_Row<D>[];
    page: MRT_Row<D>[];
    resetResizing: () => void;
    getToggleAllRowsExpandedProps: () => void;
  };

export type MRT_ColumnInterface<D extends {} = {}> =
  // ColumnInterface<D> &
  UseFiltersColumnOptions<D> &
    UseGlobalFiltersColumnOptions<D> &
    UseGroupByColumnOptions<D> &
    UseResizeColumnsColumnOptions<D> &
    UseSortByColumnOptions<D> & {
      Edit?: ({
        cell,
        onChange,
      }: {
        cell: MRT_Cell<D>;
        onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
      }) => ReactNode;
      Filter?: ({ column }: { column: MRT_HeaderGroup<D> }) => ReactNode;
      Footer?: string;
      Header?: string;
      disableFilters?: boolean;
      editable?: boolean;
      muiTableBodyCellEditTextFieldProps?:
        | TextFieldProps
        | ((cell: MRT_Cell<D>) => TextFieldProps);
      muiTableBodyCellProps?:
        | TableCellProps
        | ((cell: MRT_Cell<D>) => TableCellProps);
      muiTableFooterCellProps?:
        | TableCellProps
        | ((column: Column<D>) => TableCellProps);
      muiTableHeadCellFilterTextFieldProps?:
        | TextFieldProps
        | ((column: Column<D>) => TextFieldProps);
      muiTableHeadCellProps?:
        | TableCellProps
        | ((column: Column<D>) => TableCellProps);
      onCellEditChange?: (
        event: ChangeEvent<HTMLInputElement>,
        cell: MRT_Cell<D>,
      ) => void;
      onFilterChange?: (
        event: ChangeEvent<HTMLInputElement>,
        filterValue: any,
      ) => void;
    };

export type MRT_ColumnInstance<D extends {} = {}> = ColumnInstance<D> &
  UseFiltersColumnProps<D> &
  UseGroupByColumnProps<D> &
  UseResizeColumnsColumnProps<D> &
  UseSortByColumnProps<D> & {
    columns?: MRT_ColumnInstance<D>[];
  };

export type MRT_HeaderGroup<D extends {} = {}> = HeaderGroup<D> &
  MRT_ColumnInstance<D> &
  UseTableHeaderGroupProps<D> & {
    headers: MRT_HeaderGroup<D>[];
  };

export type MRT_Row<D extends {} = {}> = Row<D> &
  UseExpandedRowProps<D> &
  UseGroupByRowProps<D> &
  UseRowSelectRowProps<D> &
  UseRowStateRowProps<D> & {
    cells: MRT_Cell<D>[];
  };

export type MRT_Cell<D extends {} = {}, _V = any> = Cell<D> &
  UseGroupByCellProps<D> &
  UseRowStateCellProps<D> & {};

export type MRT_TableState<D extends {} = {}> = TableState<D> &
  UseColumnOrderState<D> &
  UseExpandedState<D> &
  UseFiltersState<D> &
  UseGlobalFiltersState<D> &
  UseGroupByState<D> &
  UsePaginationState<D> &
  UseResizeColumnsState<D> &
  UseRowSelectState<D> &
  UseRowStateState<D> &
  UseSortByState<D> & {
    currentEditingRow: MRT_Row<D> | null;
    densePadding: boolean;
    fullScreen: boolean;
    showFilters: boolean;
    showSearch: boolean;
  };

export type MaterialReactTableProps<D extends {} = {}> = UseTableOptions<D> &
  UseExpandedOptions<D> &
  UseFiltersOptions<D> &
  UseGlobalFiltersOptions<D> &
  UseGroupByOptions<D> &
  UsePaginationOptions<D> &
  UseResizeColumnsOptions<D> &
  UseRowSelectOptions<D> &
  UseRowStateOptions<D> &
  UseSortByOptions<D> &
  MRT_TableOptions<D> & {
    disableColumnActions?: boolean;
    disableColumnHiding?: boolean;
    disableDensePaddingToggle?: boolean;
    disableExpandAll?: boolean;
    disableFullScreenToggle?: boolean;
    disableSelectAll?: boolean;
    disableSubRowTree?: boolean;
    enableColumnGrouping?: boolean;
    enableColumnResizing?: boolean;
    enableRowActions?: boolean;
    enableRowEditing?: boolean;
    enableRowNumbers?: boolean;
    enableSelection?: boolean;
    hideTableFooter?: boolean;
    hideTableHead?: boolean;
    hideToolbarBottom?: boolean;
    hideToolbarInternalActions?: boolean;
    hideToolbarTop?: boolean;
    icons?: Partial<MRT_Icons>;
    isFetching?: boolean;
    isLoading?: boolean;
    localization?: Partial<MRT_Localization>;
    muiSearchTextFieldProps?: TextFieldProps;
    muiTableBodyCellEditTextFieldProps?:
      | TextFieldProps
      | ((cell?: MRT_Cell<D>) => TextFieldProps);
    muiTableBodyCellProps?:
      | TableCellProps
      | ((cell?: MRT_Cell<D>) => TableCellProps);
    muiTableBodyProps?: TableBodyProps;
    muiTableBodyRowProps?: TableRowProps | ((row: Row<D>) => TableRowProps);
    muiTableContainerProps?:
      | TableContainerProps
      | ((table: MRT_TableInstance<D>) => TableContainerProps);
    muiTableDetailPanelProps?:
      | TableCellProps
      | ((row: Row<D>) => TableCellProps);
    muiTableFooterCellProps?:
      | TableCellProps
      | ((column: Column<D>) => TableCellProps);
    muiTableFooterProps?: TableFooterProps;
    muiTableFooterRowProps?:
      | TableRowProps
      | ((footerGroup: MRT_HeaderGroup<D>) => TableRowProps);
    muiTableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | ((column: Column<D>) => TextFieldProps);
    muiTableHeadCellProps?:
      | TableCellProps
      | ((column: Column<D>) => TableCellProps);
    muiTableHeadProps?: TableHeadProps;
    muiTableHeadRowProps?:
      | TableRowProps
      | ((row: MRT_HeaderGroup<D>) => TableRowProps);
    muiTablePaginationProps?:
      | Partial<TablePaginationProps>
      | ((
          tableInstance: MRT_TableInstance<D>,
        ) => Partial<TablePaginationProps>);
    muiTableProps?: TableProps;
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
    onColumnHide?: (column: Column<D>, visibleColumns: Column<D>[]) => void;
    onDetailPanelClick?: (
      event: MouseEvent<HTMLTableCellElement>,
      row: Row<D>,
    ) => void;
    onGlobalFilterChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    onRowClick?: (event: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
    onRowEditSubmit?: (row: Row<D>) => Promise<void> | void;
    onRowExpandChange?: (
      event: MouseEvent<HTMLButtonElement>,
      row: Row<D>,
    ) => void;
    onRowSelectChange?: (
      event: ChangeEvent,
      row: Row<D>,
      selectedRows: Row<D>[],
    ) => void;
    onSelectAllChange?: (event: ChangeEvent, selectedRows: Row<D>[]) => void;
    positionActionsColumn?: 'first' | 'last';
    positionPagination?: 'bottom' | 'top' | 'both';
    positionToolbarActions?: 'bottom' | 'top';
    positionToolbarAlertBanner?: 'bottom' | 'top';
    renderDetailPanel?: (row: Row<D>) => ReactNode;
    renderRowActionMenuItems?: (
      rowData: Row<D>,
      tableInstance: MRT_TableInstance<D>,
      closeMenu: () => void,
    ) => ReactNode[];
    renderRowActions?: (
      row: Row<D>,
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

export default <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  icons,
  localization,
  positionActionsColumn = 'first',
  positionPagination = 'bottom',
  positionToolbarActions = 'top',
  positionToolbarAlertBanner = 'top',
  ...rest
}: MaterialReactTableProps<D>) => (
  <MaterialReactTableProvider
    defaultColumn={defaultColumn}
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
