import React, { FC, RefObject } from 'react';
import { Table } from '@mui/material';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableInstance } from '..';

interface Props {
  tableContainerRef: RefObject<HTMLDivElement>;
  instance: MRT_TableInstance;
}

export const MRT_Table: FC<Props> = ({ tableContainerRef, instance }) => {
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
  } = instance;

  const { isFullScreen } = getState();

  const tableProps =
    muiTableProps instanceof Function
      ? muiTableProps({ instance })
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
      {enableTableHead && <MRT_TableHead instance={instance} />}
      <MRT_TableBody
        tableContainerRef={tableContainerRef}
        instance={instance}
      />
      {enableTableFooter && <MRT_TableFooter instance={instance} />}
    </Table>
  );
};
