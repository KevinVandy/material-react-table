import React, { FC, useEffect } from 'react';
import { Paper } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_ToolbarTop } from '../toolbar/MRT_ToolbarTop';
import { MRT_ToolbarBottom } from '../toolbar/MRT_ToolbarBottom';
import { MRT_TableContainer } from './MRT_TableContainer';

interface Props {}

export const MRT_TablePaper: FC<Props> = () => {
  const {
    hideToolbarBottom,
    hideToolbarTop,
    muiTablePaperProps,
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

  const tablePaperProps =
    muiTablePaperProps instanceof Function
      ? muiTablePaperProps(tableInstance)
      : muiTablePaperProps;

  return (
    <Paper
      elevation={2}
      {...tablePaperProps}
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
        ...tablePaperProps?.sx,
      }}
    >
      {!hideToolbarTop && <MRT_ToolbarTop />}
      <MRT_TableContainer />
      {!hideToolbarBottom && <MRT_ToolbarBottom />}
    </Paper>
  );
};
