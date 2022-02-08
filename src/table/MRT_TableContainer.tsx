import React, { FC } from 'react';
import {
  alpha,
  CircularProgress,
  LinearProgress,
  Paper,
  styled,
  TableContainer,
} from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_Table } from './MRT_Table';
import { MRT_ToolbarTop } from '../toolbar/MRT_ToolbarTop';
import { MRT_ToolbarBottom } from '../toolbar/MRT_ToolbarBottom';

const CircularProgressWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  display: 'grid',
  height: '100%',
  justifyContent: 'center',
  margin: 'auto',
  position: 'absolute',
  width: 'calc(100% - 2rem)',
}));

interface Props {}

export const MRT_TableContainer: FC<Props> = () => {
  const { muiTableContainerProps, hideToolbarTop, hideToolbarBottom, isLoading, isFetching } =
    useMaterialReactTable();

  return (
    <TableContainer component={Paper} {...muiTableContainerProps}>
      {!hideToolbarTop && <MRT_ToolbarTop />}
      {isFetching && <LinearProgress />}
      {isLoading && (
        <CircularProgressWrapper>
          <CircularProgress aria-busy="true" aria-label="Loading data" />
        </CircularProgressWrapper>
      )}
      <MRT_Table />
      {!hideToolbarBottom && <MRT_ToolbarBottom />}
    </TableContainer>
  );
};
