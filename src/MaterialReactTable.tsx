import React, { ChangeEvent, FC, MouseEvent, ReactNode } from 'react';
import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
} from '@mui/material';
import { Column, Row, UseRowStateLocalState } from 'react-table';
import { MaterialReactTableProvider } from './useMaterialReactTable';
import { MRT_TableContainer } from './table/MRT_TableContainer';

export interface MaterialReactTableProps {
  columns: Column[];
  data: any[];
  enableFilters?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  enableSelectAll?: boolean;
  enableSelection?: boolean;
  enableSorting?: boolean;
  onRowClick?: (
    event: MouseEvent<HTMLTableRowElement>,
    rowData: Row<object>,
  ) => void;
  onRowSelectChange?: (
    event: ChangeEvent,
    rowState: UseRowStateLocalState<object, unknown>,
    selectedRows: Row<object>[],
  ) => void;
  positionPagination?: 'bottom' | 'top' | 'both';
  renderDetailPanel?: (rowData: Row<object>) => ReactNode;
  showFooter?: boolean;
  showHead?: boolean;
  showToolbar?: boolean;
  tableContainerProps?: TableContainerProps;
  tableFooterProps?: TableFooterProps;
  tableHeadProps?: TableHeadProps;
  tablePaginationProps?: TablePaginationProps;
  tableProps?: TableProps;
}

export const MaterialReactTable: FC<MaterialReactTableProps> = ({
  enableFilters = true,
  enablePagination = true,
  enableSearch = true,
  enableSorting = true,
  positionPagination = 'bottom',
  showFooter = true,
  showHead = true,
  ...rest
}) => {
  return (
    <MaterialReactTableProvider
      enableFilters={enableFilters}
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
