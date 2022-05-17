import React, { FC } from 'react';
import { Table } from '@mui/material';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_Table: FC<Props> = ({ tableInstance }) => {
  const {
    options: {
      enableStickyHeader,
      enableTableFooter,
      enableTableHead,
      muiTableProps,
    },
  } = tableInstance;

  const tableProps =
    muiTableProps instanceof Function
      ? muiTableProps({ tableInstance })
      : muiTableProps;

  return (
    <Table stickyHeader={enableStickyHeader} {...tableProps}>
      {enableTableHead && <MRT_TableHead tableInstance={tableInstance} />}
      <MRT_TableBody tableInstance={tableInstance} />
      {enableTableFooter && <MRT_TableFooter tableInstance={tableInstance} />}
    </Table>
  );
};
