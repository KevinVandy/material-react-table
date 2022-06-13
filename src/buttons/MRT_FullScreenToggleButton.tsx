import React, { FC, MouseEvent } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  instance: MRT_TableInstance;
}

export const MRT_FullScreenToggleButton: FC<Props> = ({
  instance,
  ...rest
}) => {
  const {
    getState,
    options: {
      icons: { FullscreenExitIcon, FullscreenIcon },
      localization,
      onMrtToggleFullScreen,
    },
    setIsFullScreen,
  } = instance;

  const { isFullScreen } = getState();

  const handleToggleFullScreen = (event: MouseEvent<HTMLButtonElement>) => {
    onMrtToggleFullScreen?.({
      event,
      isFullScreen: !isFullScreen,
      instance,
    });
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Tooltip arrow title={localization.toggleFullScreen}>
      <IconButton
        aria-label={localization.showHideFilters}
        onClick={handleToggleFullScreen}
        {...rest}
      >
        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};
