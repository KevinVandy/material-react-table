import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  tableInstance: MRT_TableInstance;
}

export const MRT_ToggleDensePaddingButton: FC<Props> = ({
  tableInstance,
  ...rest
}) => {
  const {
    getState,
    options: {
      icons: { DensityMediumIcon, DensitySmallIcon },
      localization,
    },
    setIsDensePadding,
  } = tableInstance;

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
