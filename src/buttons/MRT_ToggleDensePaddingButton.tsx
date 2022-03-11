import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_ToggleDensePaddingButton: FC<Props> = ({ ...rest }) => {
  const {
    setDensePadding,
    localization,
    icons: { DensityMediumIcon, DensitySmallIcon },
    tableInstance: {
      state: { densePadding },
    },
  } = useMRT();

  return (
    <Tooltip arrow title={localization.toggleDensePadding}>
      <IconButton
        aria-label={localization.toggleDensePadding}
        onClick={() => setDensePadding(!densePadding)}
        size="small"
        {...rest}
      >
        {densePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};
