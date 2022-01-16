import React, { FC } from 'react';
import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
} from '@mui/material';
import { Column } from 'react-table';
import { MaterialReactTableProvider } from './useMaterialReactTable';
import { MRT_TableContainer } from './MRT_TableContainer';
import { defaultOptions } from './defaults';

export interface MaterialReactTableOptions {
  enableFilters: boolean;
  enablePagination: boolean | 'top' | 'bottom' | 'both' | 'none';
  enableSearch: boolean;
  enableSorting: boolean;
  showFooter: boolean;
  showHead: boolean;
  showToolbar: boolean;
}

export interface MaterialReactTableOptionalProps {
  options?: Partial<MaterialReactTableOptions>;
  tableContainerProps?: TableContainerProps;
  tableFooterProps?: TableFooterProps;
  tableHeadProps?: TableHeadProps;
  tablePaginationProps?: TablePaginationProps;
  tableProps?: TableProps;
  renderDetailPanel?: (rowData: any) => React.ReactNode;
}

export interface MaterialReactTableProps extends MaterialReactTableOptionalProps {
  columns: Column[];
  data: any[];
}

export const MaterialReactTable: FC<MaterialReactTableProps> = ({
  options = defaultOptions,
  ...rest
}) => {
  return (
    <MaterialReactTableProvider options={options} {...rest}>
      <MRT_TableContainer />
    </MaterialReactTableProvider>
  );
};
