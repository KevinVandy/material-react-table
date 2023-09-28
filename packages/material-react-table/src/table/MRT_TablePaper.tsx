import Paper from '@mui/material/Paper';
import { MRT_TopToolbar } from '../toolbar/MRT_TopToolbar';
import { MRT_BottomToolbar } from '../toolbar/MRT_BottomToolbar';
import { MRT_TableContainer } from './MRT_TableContainer';
import { type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePaper = <TData extends Record<string, any>>({
  table,
}: Props<TData>) => {
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

  const tablePaperProps = parseFromValuesOrFunc(muiTablePaperProps, { table });

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
        overflow: 'hidden',
        transition: 'all 100ms ease-in-out',
        ...(parseFromValuesOrFunc(tablePaperProps?.sx, theme) as any),
      })}
      style={{
        ...tablePaperProps?.style,
        ...(isFullScreen
          ? {
              bottom: 0,
              height: '100vh',
              left: 0,
              margin: 0,
              maxHeight: '100vh',
              maxWidth: '100vw',
              padding: 0,
              position: 'fixed',
              right: 0,
              top: 0,
              width: '100vw',
              zIndex: 10,
            }
          : {}),
      }}
    >
      {enableTopToolbar &&
        (parseFromValuesOrFunc(renderTopToolbar, { table }) ?? (
          <MRT_TopToolbar table={table} />
        ))}
      <MRT_TableContainer table={table} />
      {enableBottomToolbar &&
        (parseFromValuesOrFunc(renderBottomToolbar, { table }) ?? (
          <MRT_BottomToolbar table={table} />
        ))}
    </Paper>
  );
};
