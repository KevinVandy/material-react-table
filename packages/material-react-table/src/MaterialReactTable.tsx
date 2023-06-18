import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import { MRT_TablePaper } from './table/MRT_TablePaper';
import {
  type MaterialReactTableOptions,
  type MRT_TableInstance,
} from './types';
import { useMaterialReactTable } from './useMaterialReactTable';

type TableInstanceProp<TData extends Record<string, any>> = {
  table: MRT_TableInstance<TData>;
};

type Props<TData extends Record<string, any>> =
  | TableInstanceProp<TData>
  | MaterialReactTableOptions<TData>;

const isTableInstanceProp = <TData extends Record<string, any>>(
  props: Props<TData>,
): props is TableInstanceProp<TData> =>
  (props as TableInstanceProp<TData>).table !== undefined;

export const MaterialReactTable = <TData extends Record<string, any>>(
  props: Props<TData>,
) => {
  let table: MRT_TableInstance<TData>;

  if (isTableInstanceProp(props)) {
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
