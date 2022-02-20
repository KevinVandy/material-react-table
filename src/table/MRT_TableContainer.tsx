import React, { FC, useEffect } from 'react';
import {
  CircularProgress,
  LinearProgress,
  Paper,
  TableContainer as MuiTableContainer,
  alpha,
  styled,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Table } from './MRT_Table';
import { MRT_ToolbarTop } from '../toolbar/MRT_ToolbarTop';
import { MRT_ToolbarBottom } from '../toolbar/MRT_ToolbarBottom';

const TableContainer = styled(MuiTableContainer, {
  shouldForwardProp: (prop) => prop !== 'fullScreen',
})<{ fullScreen?: boolean, component: any }>(({ fullScreen }) => ({
  bottom: fullScreen ? '0' : undefined,
  height: fullScreen ? '100%' : undefined,
  left: fullScreen ? '0' : undefined,
  margin: fullScreen ? '0' : undefined,
  position: fullScreen ? 'absolute' : undefined,
  right: fullScreen ? '0' : undefined,
  top: fullScreen ? '0' : undefined,
  transition: 'all 0.2s ease-in-out',
  width: fullScreen ? '100vw' : undefined,
  zIndex: fullScreen ? 1200 : 1,
}));

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
  const {
    fullScreen,
    hideToolbarBottom,
    hideToolbarTop,
    isFetching,
    isLoading,
    muiTableContainerProps,
    tableInstance,
  } = useMRT();

  useEffect(() => {
    if(fullScreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [fullScreen]);

  const tableContainerProps =
    muiTableContainerProps instanceof Function
      ? muiTableContainerProps(tableInstance)
      : muiTableContainerProps;

  return (
    <TableContainer
      component={Paper}
      fullScreen={fullScreen}
      {...tableContainerProps}
    >
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
