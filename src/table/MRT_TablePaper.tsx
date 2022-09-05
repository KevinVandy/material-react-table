import React, { FC, useEffect } from 'react';
import { Paper } from '@mui/material';
import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TableContainer } from './MRT_TableContainer';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_TablePaper: FC<Props> = ({ table }) => {
  const {
    getState,
    options: { enableBottomToolbar, enableTopToolbar, muiTablePaperProps },
    refs: { tablePaperRef },
  } = table;
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
      ? muiTablePaperProps({ table })
      : muiTablePaperProps;

  return (
    <Paper
      elevation={2}
      {...tablePaperProps}
      ref={(ref: HTMLDivElement) => {
        tablePaperRef.current = ref;
        if (tablePaperProps?.ref) {
          //@ts-ignore
          tablePaperProps.ref.current = ref;
        }
      }}
      sx={(theme) => ({
        transition: 'all 0.2s ease-in-out',
        ...(tablePaperProps?.sx instanceof Function
          ? tablePaperProps?.sx(theme)
          : (tablePaperProps?.sx as any)),
      })}
      style={{
        ...tablePaperProps?.style,
        height: isFullScreen ? '100vh' : undefined,
        margin: isFullScreen ? '0' : undefined,
        maxHeight: isFullScreen ? '100vh' : undefined,
        maxWidth: isFullScreen ? '100vw' : undefined,
        padding: isFullScreen ? '0' : undefined,
        width: isFullScreen ? '100vw' : undefined,
      }}
    >
      {enableTopToolbar && <MRT_TopToolbar table={table} />}
      <MRT_TableContainer table={table} />
      {enableBottomToolbar && <MRT_BottomToolbar table={table} />}
    </Paper>
  );
};
