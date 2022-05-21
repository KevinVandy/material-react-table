import React, { FC } from 'react';
import { Collapse, LinearProgress } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_LinearProgressBar: FC<Props> = ({ tableInstance }) => {
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
    <Collapse in={isLoading || showProgressBars} mountOnEnter unmountOnExit>
      <LinearProgress
        aria-label="Loading"
        aria-busy="true"
        {...linearProgressProps}
      />
    </Collapse>
  );
};
