import React, { FC, useEffect } from 'react';
import { Paper } from '@mui/material';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MRT_ToolbarTop } from '../toolbar/MRT_ToolbarTop';
import { MRT_ToolbarBottom } from '../toolbar/MRT_ToolbarBottom';
import { MRT_TableContainer } from './MRT_TableContainer';
import type { MRT_TableInstance } from '..';

interface Props {
  instance: MRT_TableInstance;
}

export const MRT_TablePaper: FC<Props> = ({ instance }) => {
  const {
    getState,
    options: { enableToolbarBottom, enableToolbarTop, muiTablePaperProps },
  } = instance;

  const { isFullScreen } = getState();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isFullScreen) {
        document.body.style.height = '100vh';
      } else {
        document.body.style.height = 'auto';
      }
    }
  }, [isFullScreen]);

  const tablePaperProps =
    muiTablePaperProps instanceof Function
      ? muiTablePaperProps({ instance })
      : muiTablePaperProps;

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper
        elevation={2}
        {...tablePaperProps}
        sx={{
          transition: 'all 0.2s ease-in-out',
          ...tablePaperProps?.sx,
          height: isFullScreen ? '100vh' : undefined,
          margin: isFullScreen ? '0' : undefined,
          maxHeight: isFullScreen ? '100vh' : undefined,
          maxWidth: isFullScreen ? '100vw' : undefined,
          padding: isFullScreen ? '0' : undefined,
          width: isFullScreen ? '100vw' : undefined,
        }}
      >
        {enableToolbarTop && <MRT_ToolbarTop instance={instance} />}
        <MRT_TableContainer instance={instance} />
        {enableToolbarBottom && <MRT_ToolbarBottom instance={instance} />}
      </Paper>
    </DndProvider>
  );
};
