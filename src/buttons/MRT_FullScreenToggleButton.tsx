import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_FullScreenToggleButton: FC<Props> = ({ ...rest }) => {
  const {
    fullScreen,
    icons: { FullscreenExitIcon, FullscreenIcon },
    localization,
    setFullScreen,
  } = useMRT();

  return (
    <Tooltip arrow title={localization.toggleFullScreenButtonTitle}>
      <IconButton
        aria-label={localization.toggleFilterButtonTitle}
        onClick={() => setFullScreen(!fullScreen)}
        size="small"
        {...rest}
      >
        {fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};
