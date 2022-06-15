import React, { FC, MouseEvent } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  instance: MRT_TableInstance;
}

export const MRT_ToggleDensePaddingButton: FC<Props> = ({
  instance,
  ...rest
}) => {
  const {
    getState,
    options: {
      icons: { DensityMediumIcon, DensitySmallIcon },
      localization,
      onHandleToggleDensePadding,
    },
    setIsDensePadding,
  } = instance;

  const { isDensePadding } = getState();

  const handleToggleDensePadding = (event: MouseEvent<HTMLButtonElement>) => {
    onHandleToggleDensePadding?.({
      event,
      isDensePadding: !isDensePadding,
      instance,
    });
    setIsDensePadding(!isDensePadding);
  };

  return (
    <Tooltip arrow title={localization.toggleDensePadding}>
      <IconButton
        aria-label={localization.toggleDensePadding}
        onClick={handleToggleDensePadding}
        {...rest}
      >
        {isDensePadding ? <DensitySmallIcon /> : <DensityMediumIcon />}
      </IconButton>
    </Tooltip>
  );
};
