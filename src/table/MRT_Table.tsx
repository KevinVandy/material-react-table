import React, { FC } from 'react';
import { Table } from '@mui/material';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_Table: FC<Props> = () => {
  const { tableInstance, muiTableProps, hideTableHead, hideTableFooter } =
    useMRT();

  const mTableProps =
    muiTableProps instanceof Function
      ? muiTableProps(tableInstance)
      : muiTableProps;

  const tableProps = {
    ...mTableProps,
    ...tableInstance.getTableProps(),
  };

  return (
    <Table {...tableProps}>
      {!hideTableHead && <MRT_TableHead />}
      <MRT_TableBody />
      {!hideTableFooter && <MRT_TableFooter />}
    </Table>
  );
};
