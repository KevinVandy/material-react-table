import React, { FC } from 'react';
import { Collapse, LinearProgress } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  alignTo: 'bottom' | 'top';
  instance: MRT_TableInstance;
}

export const MRT_LinearProgressBar: FC<Props> = ({ alignTo, instance }) => {
  const {
    options: { muiLinearProgressProps },
    getState,
  } = instance;

  const { isLoading, showProgressBars } = getState();

  const linearProgressProps =
    muiLinearProgressProps instanceof Function
      ? muiLinearProgressProps({ instance })
      : muiLinearProgressProps;

  return (
    <Collapse
      in={isLoading || showProgressBars}
      mountOnEnter
      unmountOnExit
      sx={{
        bottom: alignTo === 'bottom' ? 0 : undefined,
        position: 'absolute',
        top: alignTo === 'top' ? 0 : undefined,
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
