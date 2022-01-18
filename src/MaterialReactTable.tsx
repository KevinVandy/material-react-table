import React, { ChangeEvent, MouseEvent, ReactNode } from 'react';
import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
  TextFieldProps,
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

export interface MaterialReactTableProps<D extends {} = {}> {
  columns: Column<D | {}>[];
  data: D[];
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
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
  showFooter?: boolean;
  showHead?: boolean;
  showToolbar?: boolean;
  tableContainerProps?: TableContainerProps;
  tableFooterProps?: TableFooterProps;
  tableHeadProps?: TableHeadProps;
  tablePaginationProps?: TablePaginationProps;
  tableProps?: TableProps;
  tableSearchTextfieldProps?: TextFieldProps;
  tableTitleProps?: TypographyProps;
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
  OverrideTableContainerComponent?(tableInstance: TableInstance<D>): ReactNode;
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
  OverrideTableHeadComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableHeadRowComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTablePaginationComponent?(tableInstance: TableInstance<D>): ReactNode;
  OverrideTableToolbarComponent?(tableInstance: TableInstance<D>): ReactNode;
}

export const MaterialReactTable = <D extends {}>({
  enablePagination = true,
  enableSearch = true,
  enableSorting = true,
  positionPagination = 'bottom',
  showFooter = true,
  showHead = true,
  ...rest
}: MaterialReactTableProps<D>) => {
  return (
    <MaterialReactTableProvider
      enablePagination={enablePagination}
      enableSearch={enableSearch}
      enableSorting={enableSorting}
      positionPagination={positionPagination}
      showFooter={showFooter}
      showHead={showHead}
      {...rest}
    >
      <MRT_TableContainer />
    </MaterialReactTableProvider>
  );
};
