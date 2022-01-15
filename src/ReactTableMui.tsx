import React, { FC } from 'react';
import { Column } from 'react-table';
import { MuiTable } from './MuiTable';
import { ReactTableMuiProvider } from './useReactTableMui';

export interface ReactMuiTableProps {
  columns: Column[];
  data: any[];
}

export const ReactTableMui: FC<ReactMuiTableProps> = (props) => {
  return (
    <ReactTableMuiProvider {...props}>
      <MuiTable />
    </ReactTableMuiProvider>
  );
};
