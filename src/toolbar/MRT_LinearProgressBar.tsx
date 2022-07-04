import React, { FC } from 'react';
import { Collapse, LinearProgress } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  alignTo: 'bottom' | 'top';
  table: MRT_TableInstance;
}

export const MRT_LinearProgressBar: FC<Props> = ({ alignTo, table }) => {
  const {
    options: { muiLinearProgressProps },
    getState,
  } = table;
  const { isLoading, showProgressBars } = getState();

  const linearProgressProps =
    muiLinearProgressProps instanceof Function
      ? muiLinearProgressProps({ table })
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
