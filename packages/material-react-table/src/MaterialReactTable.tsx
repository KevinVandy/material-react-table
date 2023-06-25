import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import { MRT_TablePaper } from './table/MRT_TablePaper';
import { useMaterialReactTable } from './useMaterialReactTable';
import { type MRT_TableOptions, type MRT_TableInstance } from './types';
import { useEffect, useRef } from 'react';

type TableInstanceProp<TData extends Record<string, any>> = {
  table: MRT_TableInstance<TData>;
};

type Props<TData extends Record<string, any>> =
  | TableInstanceProp<TData>
  | MRT_TableOptions<TData>;

const isTableInstanceProp = <TData extends Record<string, any>>(
  props: Props<TData>,
): props is TableInstanceProp<TData> =>
  (props as TableInstanceProp<TData>).table !== undefined;

export const MaterialReactTable = <TData extends Record<string, any>>(
  props: Props<TData>,
) => {
  'use client';
  let table: MRT_TableInstance<TData>;

  if (isTableInstanceProp(props)) {
    table = props.table;
  } else {
    table = useMaterialReactTable(props);
  }

  const {
    options: { enableRowVirtualization },
  } = table;

  const initialBodyHeight = useRef<string>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initialBodyHeight.current = document.body.style.height;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (table.getState().isFullScreen) {
        document.body.style.height = '100vh';
      } else {
        document.body.style.height = initialBodyHeight.current as string;
      }
    }
  }, [table.getState().isFullScreen]);

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
