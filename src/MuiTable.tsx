import { Paper, Table, TableContainer } from '@mui/material';
import React, { FC } from 'react';
import { MuiTableBody } from './MuiTableBody';
import { MuiTableFooter } from './MuiTableFooter';
import { MuiTableHead } from './MuiTableHead';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const MuiTable: FC<Props> = () => {
  const { reactTable } = useReactTableMui();
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
