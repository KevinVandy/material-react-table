import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_ToggleDensePaddingButton: FC<Props> = ({ ...rest }) => {
  const {
    setDensePadding,
    localization,
    icons: { DensityMediumIcon, DensitySmallIcon },
    tableInstance: { getState },
  } = useMRT();

  return (
    <Tooltip arrow title={localization.toggleDensePadding}>
      <IconButton
        aria-label={localization.toggleDensePadding}
        onClick={() => setDensePadding(!getState().densePadding)}
        size="small"
        {...rest}
      >
        {getState().densePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};
