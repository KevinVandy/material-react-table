import React, { FC, useEffect } from 'react';
import { Paper, TableContainer, Box } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Table } from './MRT_Table';
import { MRT_ToolbarTop } from '../toolbar/MRT_ToolbarTop';
import { MRT_ToolbarBottom } from '../toolbar/MRT_ToolbarBottom';

interface Props {}

export const MRT_TableContainer: FC<Props> = () => {
  const {
    hideToolbarBottom,
    hideToolbarTop,
    muiTableContainerProps,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const fullScreen = getState().fullScreen;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (fullScreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }, [fullScreen]);

  const tableContainerProps =
    muiTableContainerProps instanceof Function
      ? muiTableContainerProps(tableInstance)
      : muiTableContainerProps;

  return (
    <TableContainer
      component={Paper}
      {...tableContainerProps}
      sx={{
        bottom: fullScreen ? '0' : undefined,
        height: fullScreen ? '100%' : undefined,
        left: fullScreen ? '0' : undefined,
        m: fullScreen ? '0' : undefined,
        overflowY: !fullScreen ? 'hidden' : undefined,
        position: fullScreen ? 'fixed' : undefined,
        right: fullScreen ? '0' : undefined,
        top: fullScreen ? '0' : undefined,
        transition: 'all 0.2s ease-in-out',
        width: fullScreen ? '100vw' : undefined,
        zIndex: fullScreen ? 1200 : 1,
        ...tableContainerProps?.sx,
      }}
    >
      {!hideToolbarTop && <MRT_ToolbarTop />}
      <Box
        sx={{
          maxWidth: '100%',
          overflowX: 'auto',
        }}
      >
        <MRT_Table />
      </Box>
      {!hideToolbarBottom && <MRT_ToolbarBottom />}
    </TableContainer>
  );
};
