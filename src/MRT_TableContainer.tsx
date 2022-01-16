import React, { FC } from 'react';
import { Paper, TableContainer } from '@mui/material';
import { useMaterialReactTable } from './useMaterialReactTable';
import { MRT_Table } from './MRT_Table';

interface Props {}

export const MRT_TableContainer: FC<Props> = () => {
  const { tableContainerProps } = useMaterialReactTable();

  return (
    <TableContainer component={Paper} {...tableContainerProps}>
      <MRT_Table />
    </TableContainer>
  );
};
