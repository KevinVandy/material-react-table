import React, { FC } from 'react';
import { Collapse, LinearProgress } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_LinearProgressBar: FC<Props> = () => {
  const { muiLinearProgressProps, isFetching, isLoading, tableInstance } =
    useMRT();

  const linearProgressProps =
    muiLinearProgressProps instanceof Function
      ? muiLinearProgressProps(tableInstance)
      : muiLinearProgressProps;

  return (
    <Collapse in={isFetching || isLoading} unmountOnExit>
      <LinearProgress
        aria-label="Loading"
        aria-busy="true"
        {...linearProgressProps}
      />
    </Collapse>
  );
};
