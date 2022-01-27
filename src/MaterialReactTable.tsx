import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';
import {
  TableBodyProps,
  TableCellProps,
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TextFieldProps,
  ToolbarProps,
  TypographyProps,
} from '@mui/material';
import {
  Cell,
  Row,
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

export interface MaterialReactTableProps<D extends {} = {}>
  extends TableOptions<D>,
    UseExpandedOptions<D>,
    UseFiltersOptions<D>,
    UseGlobalFiltersOptions<D>,
    UseGroupByOptions<D>,
    UsePaginationOptions<D>,
    UseResizeColumnsOptions<D>,
    UseRowSelectOptions<D>,
    UseRowStateOptions<D>,
    UseSortByOptions<D> {
  defaultShowFilters?: boolean;
  disableColumnActions?: boolean;
  disableColumnHiding?: boolean;
  disableExpandAll?: boolean;
  disableSelectAll?: boolean;
  disableSubRowTree?: boolean;
  enableColumnGrouping?: boolean;
  enableColumnResizing?: boolean;
  enableSelection?: boolean;
  hideFooter?: boolean;
  hideHead?: boolean;
  hideToolbar?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  localization?: Partial<MRT_Localization>;
  muiSearchTextFieldProps?: TextFieldProps;
  muiTableBodyProps?: TableBodyProps;
  muiTableContainerProps?: TableContainerProps;
  muiTableDetailPanelProps?: TableCellProps;
  muiTableFooterProps?: TableFooterProps;
  muiTableHeadProps?: TableHeadProps;
  muiTablePaginationProps?: TablePaginationProps;
  muiTableProps?: TableProps;
  muiTableTitleProps?: TypographyProps;
  muiTableToolbarProps?: ToolbarProps;
  onCellClick?: (
    event: MouseEvent<HTMLTableCellElement>,
    cell: Cell<D>,
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
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  positionPagination?: 'bottom' | 'top' | 'both';
  renderDetailPanel?: (rowData: Row<D>) => ReactNode;
  title?: string | ReactNode;
}

export default <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  localization = defaultLocalization,
  positionPagination = 'bottom',
  ...rest
}: MaterialReactTableProps<D>) => (
  <MaterialReactTableProvider
    defaultColumn={defaultColumn}
    localization={{ ...defaultLocalization, ...localization }}
    positionPagination={positionPagination}
    {...rest}
  >
    <MRT_TableContainer />
  </MaterialReactTableProvider>
);
