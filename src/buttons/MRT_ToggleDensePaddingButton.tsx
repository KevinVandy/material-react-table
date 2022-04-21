import React, { FC, MouseEvent } from 'react';
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
      onToggleDensePadding,
    },
    setIsDensePadding,
  } = tableInstance;

  const { isDensePadding } = getState();

  const handleToggleDensePadding = (event: MouseEvent<HTMLButtonElement>) => {
    onToggleDensePadding?.({
      event,
      isDensePadding: !isDensePadding,
      tableInstance,
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
