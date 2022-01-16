import React, { FC } from 'react';
import {
  TableContainerProps,
  TableFooterProps,
  TableHeadProps,
  TablePaginationProps,
  TableProps,
} from '@mui/material';
import { Column } from 'react-table';
import { ReactTableMuiProvider } from './useReactTableMui';
import { RTM_TableContainer } from './RTM_TableContainer';
import { defaultOptions } from './defaults';

export interface ReactTableMuiOptions {
  enableFilters: boolean;
  enablePagination: boolean | 'top' | 'bottom' | 'both' | 'none';
  enableSearch: boolean;
  enableSorting: boolean;
  showFooter: boolean;
  showHead: boolean;
  showToolbar: boolean;
}

export interface ReactTableMuiOptionalProps {
  options?: Partial<ReactTableMuiOptions>;
  tableContainerProps?: TableContainerProps;
  tableFooterProps?: TableFooterProps;
  tableHeadProps?: TableHeadProps;
  tablePaginationProps?: TablePaginationProps;
  tableProps?: TableProps;
  renderDetailPanel?: (rowData: any) => React.ReactNode;
}

export interface ReactTableMuiProps extends ReactTableMuiOptionalProps {
  columns: Column[];
  data: any[];
}

export const ReactTableMui: FC<ReactTableMuiProps> = ({
  options = defaultOptions,
  ...rest
}) => {
  return (
    <ReactTableMuiProvider options={options} {...rest}>
      <RTM_TableContainer />
    </ReactTableMuiProvider>
  );
};
