import React from 'react';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.d';

interface Props<TData extends Record<string, any> = {}> {
  isTopToolbar: boolean;
  table: TRT_TableInstance<TData>;
}

export const TRT_LinearProgressBar = <TData extends Record<string, any> = {}>({
  isTopToolbar,
  table,
}: Props<TData>) => {
  const { getState } = table;
  const { isLoading, showProgressBars } = getState();

  let {
    options: { linearProgressProps },
  } = table;
  linearProgressProps =
    linearProgressProps instanceof Function
      ? linearProgressProps({ isTopToolbar, table })
      : linearProgressProps;

  return (
    <Collapse
      in={isLoading || showProgressBars}
      mountOnEnter
      unmountOnExit
      sx={{
        bottom: isTopToolbar ? 0 : undefined,
        position: 'absolute',
        top: !isTopToolbar ? 0 : undefined,
        width: '100%',
      }}
    >
      <LinearProgress
        aria-label="Loading"
        aria-busy="true"
        sx={{ position: 'relative' }}
        {...linearProgressProps}
      />
    </Collapse>
  );
};
