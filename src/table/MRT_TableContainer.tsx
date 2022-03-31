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

  const { isFullScreen } = getState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isFullScreen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }, [isFullScreen]);

  const tableContainerProps =
    muiTableContainerProps instanceof Function
      ? muiTableContainerProps(tableInstance)
      : muiTableContainerProps;

  return (
    <TableContainer
      component={Paper}
      {...tableContainerProps}
      sx={{
        bottom: isFullScreen ? '0' : undefined,
        height: isFullScreen ? '100%' : undefined,
        left: isFullScreen ? '0' : undefined,
        m: isFullScreen ? '0' : undefined,
        overflowY: !isFullScreen ? 'hidden' : undefined,
        position: isFullScreen ? 'fixed' : undefined,
        right: isFullScreen ? '0' : undefined,
        top: isFullScreen ? '0' : undefined,
        transition: 'all 0.2s ease-in-out',
        width: isFullScreen ? '100vw' : undefined,
        zIndex: isFullScreen ? 1200 : 1,
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
