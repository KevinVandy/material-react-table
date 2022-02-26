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
  HeaderGroup,
  Row,
  TableInstance,
  TableOptions,
  UseExpandedOptions,
  UseFiltersOptions,
  UseGlobalFiltersOptions,
  UseGroupByOptions,
  UsePaginationOptions,
  UseResizeColumnsOptions,
  UseRowSelectOptions,
  UseRowStateOptions,
  UseSortByOptions,
  UseTableOptions,
} from 'react-table';
import { MaterialReactTableProvider } from './useMRT';
import { MRT_TableContainer } from './table/MRT_TableContainer';
import { MRT_ColumnInterface } from './@types/react-table-config';
import { MRT_Localization, MRT_DefaultLocalization_EN } from './localization';
import { MRT_Default_Icons, MRT_Icons } from './icons';

export type MaterialReactTableProps<D extends {} = {}> = TableOptions<D> &
  UseTableOptions<D> &
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
    defaultDensePadding?: boolean;
    defaultFullScreen?: boolean;
    defaultShowFilters?: boolean;
    defaultShowSearchTextField?: boolean;
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
      | ((cell?: Cell<D>) => TextFieldProps);
    muiTableBodyCellProps?:
      | TableCellProps
      | ((cell?: Cell<D>) => TableCellProps);
    muiTableBodyProps?: TableBodyProps;
    muiTableBodyRowProps?: TableRowProps | ((row: Row<D>) => TableRowProps);
    muiTableContainerProps?:
      | TableContainerProps
      | ((table: TableInstance<D>) => TableContainerProps);
    muiTableDetailPanelProps?:
      | TableCellProps
      | ((row: Row<D>) => TableCellProps);
    muiTableFooterCellProps?:
      | TableCellProps
      | ((column: Column<D>) => TableCellProps);
    muiTableFooterProps?: TableFooterProps;
    muiTableFooterRowProps?:
      | TableRowProps
      | ((footerGroup: HeaderGroup<D>) => TableRowProps);
    muiTableHeadCellFilterTextFieldProps?:
      | TextFieldProps
      | ((column: Column<D>) => TextFieldProps);
    muiTableHeadCellProps?:
      | TableCellProps
      | ((column: Column<D>) => TableCellProps);
    muiTableHeadProps?: TableHeadProps;
    muiTableHeadRowProps?:
      | TableRowProps
      | ((row: HeaderGroup<D>) => TableRowProps);
    muiTablePaginationProps?:
      | Partial<TablePaginationProps>
      | ((tableInstance: TableInstance<D>) => Partial<TablePaginationProps>);
    muiTableProps?: TableProps;
    muiTableToolbarAlertBannerProps?:
      | AlertProps
      | ((tableInstance: TableInstance<D>) => AlertProps);
    muiTableToolbarBottomProps?:
      | ToolbarProps
      | ((tableInstance: TableInstance<D>) => ToolbarProps);
    muiTableToolbarTopProps?:
      | ToolbarProps
      | ((tableInstance: TableInstance<D>) => ToolbarProps);
    onCellClick?: (
      event: MouseEvent<HTMLTableCellElement>,
      cell: Cell<D>,
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
      tableInstance: TableInstance<D>,
      closeMenu: () => void,
    ) => ReactNode[];
    renderRowActions?: (
      row: Row<D>,
      tableInstance: TableInstance<D>,
    ) => ReactNode;
    renderToolbarCustomActions?: (tableInstance: TableInstance<D>) => ReactNode;
    renderToolbarInternalActions?: (
      tableInstance: TableInstance<D>,
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
