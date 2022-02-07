import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';
import {
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
  TypographyProps,
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
} from 'react-table';
import { MaterialReactTableProvider } from './useMaterialReactTable';
import { MRT_TableContainer } from './table/MRT_TableContainer';
import { defaultLocalization, MRT_Localization } from './utils/localization';

export type MaterialReactTableProps<D extends {} = {}> = TableOptions<D> &
  UseExpandedOptions<D> &
  UseFiltersOptions<D> &
  UseGlobalFiltersOptions<D> &
  UseGroupByOptions<D> &
  UsePaginationOptions<D> &
  UseResizeColumnsOptions<D> &
  UseRowSelectOptions<D> &
  UseRowStateOptions<D> &
  UseSortByOptions<D> & {
    defaultDensePadding?: boolean;
    defaultShowFilters?: boolean;
    disableColumnActions?: boolean;
    disableColumnHiding?: boolean;
    disableDensePaddingToggle?: boolean;
    disableExpandAll?: boolean;
    disableSelectAll?: boolean;
    disableSubRowTree?: boolean;
    enableColumnGrouping?: boolean;
    enableColumnResizing?: boolean;
    enableRowActions?: boolean;
    enableRowEditing?: boolean;
    enableSelection?: boolean;
    hideTableFooter?: boolean;
    hideTableHead?: boolean;
    hideToolbarActions?: boolean;
    hideToolbarBottom?: boolean;
    hideToolbarTop?: boolean;
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
    muiTableContainerProps?: TableContainerProps;
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
    muiTableTitleProps?: TypographyProps;
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
    positionActionsColumn?: 'first' | 'last';
    positionPagination?: 'bottom' | 'top' | 'both';
    positionToolbarActions?: 'bottom' | 'top';
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
    title?: string | ReactNode;
  };

export default <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  localization = defaultLocalization,
  positionActionsColumn = 'first',
  positionPagination = 'bottom',
  positionToolbarActions = 'top',
  ...rest
}: MaterialReactTableProps<D>) => (
  <MaterialReactTableProvider
    defaultColumn={defaultColumn}
    localization={{ ...defaultLocalization, ...localization }}
    positionPagination={positionPagination}
    positionActionsColumn={positionActionsColumn}
    positionToolbarActions={positionToolbarActions}
    {...rest}
  >
    <MRT_TableContainer />
  </MaterialReactTableProvider>
);
