import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  isTopToolbar: boolean;
  table: MRT_TableInstance<TData>;
}

export const MRT_LinearProgressBar = <TData extends Record<string, any>>({
  isTopToolbar,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { muiLinearProgressProps },
  } = table;
  const { showProgressBars } = getState();

  const linearProgressProps = parseFromValuesOrFunc(muiLinearProgressProps, {
    isTopToolbar,
    table,
  });

  return (
    <Collapse
      in={showProgressBars}
      mountOnEnter
      sx={{
        bottom: isTopToolbar ? 0 : undefined,
        position: 'absolute',
        top: !isTopToolbar ? 0 : undefined,
        width: '100%',
      }}
      unmountOnExit
    >
      <LinearProgress
        aria-busy="true"
        aria-label="Loading"
        sx={{ position: 'relative' }}
        {...linearProgressProps}
      />
    </Collapse>
  );
};
