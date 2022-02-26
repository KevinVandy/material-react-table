import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_ToggleDensePaddingButton: FC<Props> = ({ ...rest }) => {
  const {
    densePadding,
    setDensePadding,
    localization,
    icons: { DensityMediumIcon, DensitySmallIcon },
  } = useMRT();

  return (
    <Tooltip arrow title={localization.toggleDensePaddingSwitchTitle}>
      <IconButton
        aria-label={localization.toggleDensePaddingSwitchTitle}
        onClick={() => setDensePadding(!densePadding)}
        size="small"
        {...rest}
      >
        {densePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};
