import React, { FC } from 'react';
import { Table } from '@mui/material';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {}

export const MRT_Table: FC<Props> = () => {
  const { tableInstance, muiTableProps, hideHead, hideFooter } =
    useMaterialReactTable();

  return (
    <Table {...muiTableProps} {...tableInstance.getTableProps()}>
      {!hideHead && <MRT_TableHead />}
      <MRT_TableBody />
      {!hideFooter && <MRT_TableFooter />}
    </Table>
  );
};
