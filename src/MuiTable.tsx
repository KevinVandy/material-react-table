import { Paper, Table, TableContainer } from '@mui/material';
import React, { FC } from 'react';
import { TableInstance } from 'react-table';
import { MuiTableBody } from './MuiTableBody';
import { MuiTableFooter } from './MuiTableFooter';
import { MuiTableHead } from './MuiTableHead';

interface Props {
  reactTable: TableInstance<object>;
}

export const MuiTable: FC<Props> = ({ reactTable }) => {
  const { getTableProps } = reactTable;
  
  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <MuiTableHead reactTable={reactTable} />
        <MuiTableBody reactTable={reactTable} />
        <MuiTableFooter />
      </Table>
    </TableContainer>
  );
};
