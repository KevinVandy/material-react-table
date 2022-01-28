import React, { FC } from 'react';
import { Paper, TableContainer } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_Table } from './MRT_Table';
import { MRT_ToolbarTop } from '../toolbar/MRT_ToolbarTop';
import { MRT_ToolbarBottom } from '../toolbar/MRT_ToolbarBottom';

interface Props {}

export const MRT_TableContainer: FC<Props> = () => {
  const { muiTableContainerProps, hideToolbarTop, hideToolbarBottom } =
    useMaterialReactTable();

  return (
    <TableContainer component={Paper} {...muiTableContainerProps}>
      {!hideToolbarTop && <MRT_ToolbarTop />}
      <MRT_Table />
      {!hideToolbarBottom && <MRT_ToolbarBottom />}
    </TableContainer>
  );
};
