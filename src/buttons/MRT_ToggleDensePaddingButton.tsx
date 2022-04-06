import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_ToggleDensePaddingButton: FC<Props> = ({ ...rest }) => {
  const {
    setIsDensePadding,
    localization,
    icons: { DensityMediumIcon, DensitySmallIcon },
    tableInstance: { getState },
  } = useMRT();

  const { isDensePadding } = getState();

  return (
    <Tooltip arrow title={localization.toggleDensePadding}>
      <IconButton
        aria-label={localization.toggleDensePadding}
        onClick={() => setIsDensePadding(!isDensePadding)}
        size="small"
        {...rest}
      >
        {isDensePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};
