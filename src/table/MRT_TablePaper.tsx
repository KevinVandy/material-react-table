import React, { FC, useEffect } from 'react';
import { Paper } from '@mui/material';
import { MRT_ToolbarTop } from '../toolbar/MRT_ToolbarTop';
import { MRT_ToolbarBottom } from '../toolbar/MRT_ToolbarBottom';
import { MRT_TableContainer } from './MRT_TableContainer';
import { MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_TablePaper: FC<Props> = ({ tableInstance }) => {
  const {
    getState,
    options: { hideToolbarBottom, hideToolbarTop, muiTablePaperProps },
  } = tableInstance;

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
      {!hideToolbarTop && <MRT_ToolbarTop tableInstance={tableInstance} />}
      <MRT_TableContainer tableInstance={tableInstance} />
      {!hideToolbarBottom && (
        <MRT_ToolbarBottom tableInstance={tableInstance} />
      )}
    </Paper>
  );
};
