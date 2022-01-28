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
    disableExpandAll?: boolean;
    disableSelectAll?: boolean;
    disableSubRowTree?: boolean;
    disableDensePaddingToggle?: boolean;
    enableColumnGrouping?: boolean;
    enableColumnResizing?: boolean;
    enableSelection?: boolean;
    hideTableFooter?: boolean;
    hideTableHead?: boolean;
    hideToolbarTop?: boolean;
    hideToolbarBottom?: boolean;
    hideToolbarActions?: boolean;
    isFetching?: boolean;
    isLoading?: boolean;
    localization?: Partial<MRT_Localization>;
    muiSearchTextFieldProps?: TextFieldProps;
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
    muiTableHeadCellProps?:
      | TableCellProps
      | ((column: Column<D>) => TableCellProps);
    muiTableHeadProps?: TableHeadProps;
    muiTableHeadRowProps?:
      | TableRowProps
      | ((row: HeaderGroup<D>) => TableRowProps);
    muiTablePaginationProps?:
      | TablePaginationProps
      | ((tableInstance: TableInstance<D>) => TablePaginationProps);
    muiTableProps?: TableProps;
    muiTableTitleProps?: TypographyProps;
    muiTableToolbarTopProps?:
      | ToolbarProps
      | ((tableInstance: TableInstance<D>) => ToolbarProps);
    muiTableToolbarBottomProps?:
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
    onRowClick?: (event: MouseEvent<HTMLTableRowElement>, row: Row<D>) => void;
    onRowExpandChange?: (
      event: MouseEvent<HTMLButtonElement>,
      row: Row<D>,
    ) => void;
    onRowSelectChange?: (
      event: ChangeEvent,
      row: Row<D>,
      selectedRows: Row<D>[],
    ) => void;
    onGlobalFilterChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    positionPagination?: 'bottom' | 'top' | 'both';
    positionToolbarActions?: 'bottom' | 'top';
    renderDetailPanel?: (rowData: Row<D>) => ReactNode;
    title?: string | ReactNode;
  };

export default <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  localization = defaultLocalization,
  positionPagination = 'bottom',
  positionToolbarActions = 'top',
  ...rest
}: MaterialReactTableProps<D>) => (
  <MaterialReactTableProvider
    defaultColumn={defaultColumn}
    localization={{ ...defaultLocalization, ...localization }}
    positionPagination={positionPagination}
    positionToolbarActions={positionToolbarActions}
    {...rest}
  >
    <MRT_TableContainer />
  </MaterialReactTableProvider>
);
