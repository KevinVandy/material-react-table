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
  HeaderGroup,
  Row,
  TableInstance,
  TableOptions,
} from 'react-table';
import { MaterialReactTableProvider } from './useMaterialReactTable';
import { MRT_TableContainer } from './table/MRT_TableContainer';
import { defaultLocalization, MRT_Localization } from './utils/localization';

export interface MaterialReactTableProps<D extends {} = {}>
  extends TableOptions<D> {
  enableColumnActions?: boolean;
  enableColumnGrouping?: boolean;
  enableColumnHiding?: boolean;
  enableColumnReordering?: boolean;
  enableColumnResizing?: boolean;
  enableExpandAll?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  enableSubRowTree?: boolean;
  isFetching?: boolean;
  isLoading?: boolean;
  localization?: Partial<MRT_Localization>;
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
  overrideTableBodyCellComponent?(
    cell: Cell<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  overrideTableBodyComponent?(tableInstance: TableInstance<D>): ReactNode;
  overrideTableBodyRowComponent?(
    row: Row<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  overrideTableDetailPanelComponent?(
    row: Row<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  overrideTableFooterCellComponent?(
    column: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  overrideTableFooterComponent?(tableInstance: TableInstance<D>): ReactNode;
  overrideTableFooterRowComponent?(
    footerGroup: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  overrideTableHeadCellComponent?(
    column: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  overrideTableHeadComponent?(tableInstance: TableInstance<D>): ReactNode;
  overrideTableHeadRowComponent?(
    headerGroup: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  overrideTablePaginationComponent?(tableInstance: TableInstance<D>): ReactNode;
  overrideTableToolbarComponent?(tableInstance: TableInstance<D>): ReactNode;
  positionPagination?: 'bottom' | 'top' | 'both';
  renderDetailPanel?: (rowData: Row<D>) => ReactNode;
  showFiltersInColumnHead?: boolean;
  showFooter?: boolean;
  showHead?: boolean;
  showToolbar?: boolean;
  surpressoverrideWarnings?: boolean;
  tableBodyProps?: TableBodyProps;
  tableContainerProps?: TableContainerProps;
  tableDetailPanelProps?: TableCellProps;
  tableFooterProps?: TableFooterProps;
  tableHeadProps?: TableHeadProps;
  tablePaginationProps?: TablePaginationProps;
  tableProps?: TableProps;
  tableSearchTextfieldProps?: TextFieldProps;
  tableTitleProps?: TypographyProps;
  tableToolbarProps?: ToolbarProps;
  title?: string | ReactNode;
}

export const MaterialReactTable = <D extends {}>({
  defaultColumn = { minWidth: 50, maxWidth: 1000 },
  enablePagination = true,
  enableSorting = true,
  enableSubRowTree = true,
  localization = defaultLocalization,
  positionPagination = 'bottom',
  showFiltersInColumnHead = true,
  showFooter = true,
  showHead = true,
  showToolbar = true,
  ...rest
}: MaterialReactTableProps<D>) => (
  <MaterialReactTableProvider
    defaultColumn={defaultColumn}
    enablePagination={enablePagination}
    enableSorting={enableSorting}
    enableSubRowTree={enableSubRowTree}
    localization={{ ...defaultLocalization, ...localization }}
    positionPagination={positionPagination}
    showFiltersInColumnHead={showFiltersInColumnHead}
    showFooter={showFooter}
    showHead={showHead}
    showToolbar={showToolbar}
    {...rest}
  >
    <MRT_TableContainer />
  </MaterialReactTableProvider>
);
