import React from 'react';
import Paper from '@mui/material/Paper';
import { TRT_TopToolbar } from '../toolbar/TRT_TopToolbar';
import { TRT_BottomToolbar } from '../toolbar/TRT_BottomToolbar';
import { TRT_TableContainer } from './TRT_TableContainer';
import type { TRT_TableInstance } from '..';

interface Props {
  table: TRT_TableInstance;
}

export const TRT_TablePaper = ({ table }: Props) => {
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
          : renderTopToolbar ?? <TRT_TopToolbar table={table} />)}
      <TRT_TableContainer table={table} />
      {enableBottomToolbar &&
        (renderBottomToolbar instanceof Function
          ? renderBottomToolbar({ table })
          : renderBottomToolbar ?? <TRT_BottomToolbar table={table} />)}
    </Paper>
  );
};
