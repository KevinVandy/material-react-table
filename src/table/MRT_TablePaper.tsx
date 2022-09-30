import React, { FC } from 'react';
import Paper from '@mui/material/Paper';
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
    options: {
      enableBottomToolbar,
      enableTopToolbar,
      muiTablePaperProps,
      renderBottomToolbar,
      renderTopToolbar,
    },
    refs: { tablePaperRef },
  } = table;
  const { isFullScreen } = getState();

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
        transition: 'all 150ms ease-in-out',
        ...(tablePaperProps?.sx instanceof Function
          ? tablePaperProps?.sx(theme)
          : (tablePaperProps?.sx as any)),
      })}
      style={{
        ...tablePaperProps?.style,
        ...(isFullScreen
          ? {
              height: '100vh',
              margin: 0,
              maxHeight: '100vh',
              maxWidth: '100vw',
              padding: 0,
              width: '100vw',
            }
          : {}),
      }}
    >
      {enableTopToolbar &&
        (renderTopToolbar instanceof Function
          ? renderTopToolbar({ table })
          : renderTopToolbar ?? <MRT_TopToolbar table={table} />)}
      <MRT_TableContainer table={table} />
      {enableBottomToolbar &&
        (renderBottomToolbar instanceof Function
          ? renderBottomToolbar({ table })
          : renderBottomToolbar ?? <MRT_BottomToolbar table={table} />)}
    </Paper>
  );
};
