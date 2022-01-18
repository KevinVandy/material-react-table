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
import { Column, Row, UseRowStateLocalState } from 'react-table';
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
  tableSearchTextfieldProps?: TextFieldProps;
  tableProps?: TableProps;
  tableTitleProps?: TypographyProps;
  title?: string | ReactNode;
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
