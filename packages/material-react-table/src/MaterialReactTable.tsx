import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import { MRT_TablePaper } from './table/MRT_TablePaper';
import {
  type MaterialReactTableOptions,
  type MRT_TableInstance,
} from './types';
import { useMaterialReactTable } from './useMaterialReactTable';

type PropsWithTable<TData extends Record<string, any> = {}> = {
  table: MRT_TableInstance<TData>;
};

type PropsWithoutTable<TData extends Record<string, any> = {}> =
  MaterialReactTableOptions<TData>;

type Props<TData extends Record<string, any> = {}> =
  | PropsWithTable<TData>
  | PropsWithoutTable<TData>;

function isPropsWithTable<TData extends Record<string, any> = {}>(
  props: Props<TData>,
): props is PropsWithTable<TData> {
  return (props as PropsWithTable<TData>).table !== undefined;
}

export const MaterialReactTable = <TData extends Record<string, any> = {}>(
  props: Props<TData>,
) => {
  let table: MRT_TableInstance<TData>;

  if (isPropsWithTable(props)) {
    table = props.table;
  } else {
    table = useMaterialReactTable(props);
  }

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
