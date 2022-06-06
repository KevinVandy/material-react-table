import React, { FC } from 'react';
import { Collapse, LinearProgress } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  alignTo: 'bottom' | 'top';
  tableInstance: MRT_TableInstance;
}

export const MRT_LinearProgressBar: FC<Props> = ({
  alignTo,
  tableInstance,
}) => {
  const {
    options: { muiLinearProgressProps },
    getState,
  } = tableInstance;

  const { isLoading, showProgressBars } = getState();

  const linearProgressProps =
    muiLinearProgressProps instanceof Function
      ? muiLinearProgressProps({ tableInstance })
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
