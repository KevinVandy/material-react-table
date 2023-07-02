import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import { useMaterialReactTable } from './useMaterialReactTable';
import { MRT_TablePaper } from './table/MRT_TablePaper';
import { type MRT_TableOptions, type MRT_TableInstance } from './types';

type Prettify<T> = { [K in keyof T]: T[K] } & unknown;

type Xor<A, B> =
  | Prettify<A & { [k in keyof B]?: never }>
  | Prettify<B & { [k in keyof A]?: never }>;

type TableInstanceProp<TData extends Record<string, any>> = {
  table: MRT_TableInstance<TData>;
};

type Props<TData extends Record<string, any>> = Xor<
  TableInstanceProp<TData>,
  MRT_TableOptions<TData>
>;

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

  const { enableRowVirtualization } = table.options;

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
