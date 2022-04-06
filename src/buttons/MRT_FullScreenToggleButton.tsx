import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_FullScreenToggleButton: FC<Props> = ({ ...rest }) => {
  const {
    icons: { FullscreenExitIcon, FullscreenIcon },
    localization,
    setIsFullScreen,
    tableInstance: { getState },
  } = useMRT();

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
