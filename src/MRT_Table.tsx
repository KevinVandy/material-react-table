import React, { FC } from 'react';
import { Table } from '@mui/material';
import { MRT_TableHead } from './MRT_TableHead';
import { MRT_TableBody } from './MRT_TableBody';
import { MRT_TableFooter } from './MRT_TableFooter';
import { useMaterialReactTable } from './useMaterialReactTable';

interface Props {}

export const MRT_Table: FC<Props> = () => {
  const { tableInstance, tableProps, options } = useMaterialReactTable();

  return (
    <Table stickyHeader {...tableProps} {...tableInstance.getTableProps()}>
      {options.showHead && <MRT_TableHead />}
      <MRT_TableBody />
      {options.showFooter && <MRT_TableFooter />}
    </Table>
  );
};
