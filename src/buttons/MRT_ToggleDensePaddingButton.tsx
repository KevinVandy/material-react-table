import React from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends IconButtonProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleDensePaddingButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { DensityLargeIcon, DensityMediumIcon, DensitySmallIcon },
      localization,
    },
    setDensity,
  } = table;
  const { density } = getState();

  const handleToggleDensePadding = () => {
    const nextDensity =
      density === 'comfortable'
        ? 'compact'
        : density === 'compact'
        ? 'spacious'
        : 'comfortable';
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
