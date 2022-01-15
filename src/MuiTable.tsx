import React, { FC } from 'react';
import { Paper, Table, TableContainer } from '@mui/material';
import { MuiTableHead } from './MuiTableHead';
import { MuiTableBody } from './MuiTableBody';
import { MuiTableFooter } from './MuiTableFooter';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const MuiTable: FC<Props> = () => {
  const { tableInstance } = useReactTableMui();

  return (
    <TableContainer component={Paper}>
      <Table {...tableInstance.getTableProps()}>
        <MuiTableHead />
        <MuiTableBody />
        <MuiTableFooter />
      </Table>
    </TableContainer>
  );
};
