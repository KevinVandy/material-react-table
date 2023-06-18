import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import { MRT_TablePaper } from './table/MRT_TablePaper';
import { type MRT_TableInstance } from './types';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MaterialReactTable = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    options: { enableRowVirtualization },
  } = table;

  return (
    <>
      <Dialog
        PaperComponent={Box}
        TransitionComponent={!enableRowVirtualization ? Grow : undefined}
        disablePortal
        fullScreen
        keepMounted={false}
        onClose={() => table.setIsFullScreen(false)}
        open={table.getState().isFullScreen}
        transitionDuration={400}
      >
        <MRT_TablePaper table={table as any} />
      </Dialog>
      {!table.getState().isFullScreen && (
        <MRT_TablePaper table={table as any} />
      )}
    </>
  );
};
