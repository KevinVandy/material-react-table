import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

interface Props {}

export const MRT_ToggleDensePaddingButton: FC<Props> = () => {
  const { densePadding, setDensePadding, localization } = useMRT();

  return (
    <Tooltip arrow title={localization?.toggleDensePaddingSwitchTitle ?? ''}>
      <IconButton
        aria-label={localization?.toggleDensePaddingSwitchTitle}
        onClick={() => setDensePadding(!densePadding)}
        size="small"
      >
        {densePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};
