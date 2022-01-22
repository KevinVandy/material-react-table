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
  Theme,
  ToolbarProps,
  TypographyProps,
} from '@mui/material';
import {
  Cell,
  Column,
  HeaderGroup,
  Row,
  TableInstance,
  UseRowStateLocalState,
} from 'react-table';
import { MaterialReactTableProvider } from './useMaterialReactTable';
import { MRT_TableContainer } from './table/MRT_TableContainer';
import { defaultLocalization, MRT_Localization } from './utils/localization';

export interface MaterialReactTableProps<D extends {} = {}> {
  columns: Column<D | {}>[];
  data: D[];
  enableColumnActions?: boolean;
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
  isLoading?: boolean;
  isReloading?: boolean;
  localization?: MRT_Localization;
  onRowClick?: (
    event: MouseEvent<HTMLTableRowElement>,
    rowData: Row<D>,
  ) => void;
  onRowSelectChange?: (
    event: ChangeEvent,
    rowState: UseRowStateLocalState<D, unknown>,
    selectedRows: Row<D>[],
  ) => void;
  positionPagination?: 'bottom' | 'top' | 'both';
  renderDetailPanel?: (rowData: Row<D>) => ReactNode;
  showFiltersInColumnHead?: boolean;
  showFooter?: boolean;
  showHead?: boolean;
  showToolbar?: boolean;
  surpressOverrideWarnings?: boolean;
  tableBodyProps?: TableBodyProps;
  tableContainerProps?: TableContainerProps;
  tableDetailPanelProps?: TableCellProps;
  tableFooterProps?: TableFooterProps;
  tableToolbarProps?: ToolbarProps;
  tableHeadProps?: TableHeadProps;
  tablePaginationProps?: TablePaginationProps;
  tableProps?: TableProps;
  tableSearchTextfieldProps?: TextFieldProps;
  tableTitleProps?: TypographyProps;
  theme?: Theme;
  title?: string | ReactNode;
  OverrideTableBodyCellComponent?(
    cell: Cell<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableBodyComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableBodyRowComponent?(
    row: Row<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableDetailPanelComponent?(
    row: Row<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableFooterComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableFooterCellComponent?(
    column: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableFooterRowComponent?(
    footerGroup: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableHeadCellComponent?(
    column: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTableHeadComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableHeadRowComponent?(
    headerGroup: HeaderGroup<D>,
    tableInstance: TableInstance<D>,
  ): ReactNode;
  OverrideTablePaginationComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableToolbarComponent?(tableInstance: TableInstance<D>): ReactNode;
}

export const MaterialReactTable = <D extends {}>({
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
