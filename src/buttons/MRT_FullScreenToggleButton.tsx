import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  tableInstance: MRT_TableInstance;
}

export const MRT_FullScreenToggleButton: FC<Props> = ({
  tableInstance,
  ...rest
}) => {
  const {
    getState,
    options: {
      icons: { FullscreenExitIcon, FullscreenIcon },
      localization,
    },
    setIsFullScreen,
  } = tableInstance;

  const { isFullScreen } = getState();

  return (
    <Tooltip arrow title={localization.toggleFullScreen}>
      <IconButton
        aria-label={localization.showHideFilters}
        onClick={() => setIsFullScreen(!isFullScreen)}
        size="small"
        {...rest}
      >
        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};
