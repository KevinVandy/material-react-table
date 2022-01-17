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

export interface MaterialReactTableOptionalProps {
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

export interface MaterialReactTableProps
  extends MaterialReactTableOptionalProps {
  columns: Column[];
  data: any[];
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
