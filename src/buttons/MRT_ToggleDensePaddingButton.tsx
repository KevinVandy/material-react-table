import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';

interface Props extends IconButtonProps {}

export const MRT_ToggleDensePaddingButton: FC<Props> = ({ ...rest }) => {
  const { densePadding, setDensePadding, localization } = useMRT();

  return (
    <Tooltip arrow title={localization?.toggleDensePaddingSwitchTitle ?? ''}>
      <IconButton
        aria-label={localization?.toggleDensePaddingSwitchTitle}
        onClick={() => setDensePadding(!densePadding)}
        size="small"
        {...rest}
      >
        {densePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};
