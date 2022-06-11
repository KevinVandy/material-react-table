import React, { FC, RefObject } from 'react';
import { Table } from '@mui/material';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableInstance } from '..';

interface Props {
  tableContainerRef: RefObject<HTMLDivElement>;
  tableInstance: MRT_TableInstance;
}

export const MRT_Table: FC<Props> = ({ tableContainerRef, tableInstance }) => {
  const {
    getState,
    options: {
      enableColumnResizing,
      enableRowVirtualization,
      enableStickyHeader,
      enableTableFooter,
      enableTableHead,
      muiTableProps,
    },
  } = tableInstance;

  const { isFullScreen } = getState();

  const tableProps =
    muiTableProps instanceof Function
      ? muiTableProps({ tableInstance })
      : muiTableProps;

  return (
    <Table
      stickyHeader={
        enableStickyHeader || enableRowVirtualization || isFullScreen
      }
      {...tableProps}
      sx={{
        tableLayout:
          enableColumnResizing || enableRowVirtualization ? 'fixed' : 'auto',
        ...tableProps?.sx,
      }}
    >
      {enableTableHead && <MRT_TableHead tableInstance={tableInstance} />}
      <MRT_TableBody
        tableContainerRef={tableContainerRef}
        tableInstance={tableInstance}
      />
      {enableTableFooter && <MRT_TableFooter tableInstance={tableInstance} />}
    </Table>
  );
};
