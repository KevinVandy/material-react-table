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
      icons: { DensityLargeIcon, DensityMediumIcon, DensitySmallIcon },
      localization,
      onDensityChanged,
    },
    setDensity,
  } = instance;

  const { density } = getState();

  const handleToggleDensePadding = (event: MouseEvent<HTMLButtonElement>) => {
    const nextDensity =
      density === 'comfortable'
        ? 'compact'
        : density === 'compact'
        ? 'spacious'
        : 'comfortable';
    onDensityChanged?.({
      event,
      density: nextDensity,
      instance,
    });
    setDensity(nextDensity);
  };

  return (
    <Tooltip arrow title={localization.toggleDensity}>
      <IconButton
        aria-label={localization.toggleDensity}
        onClick={handleToggleDensePadding}
        {...rest}
      >
        {density === 'compact' ? (
          <DensitySmallIcon />
        ) : density === 'comfortable' ? (
          <DensityMediumIcon />
        ) : (
          <DensityLargeIcon />
        )}
      </IconButton>
    </Tooltip>
  );
};
