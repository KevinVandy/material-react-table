import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_FullScreenToggleButton: FC<Props> = ({ ...rest }) => {
  const {
    icons: { FullscreenExitIcon, FullscreenIcon },
    localization,
    setFullScreen,
    tableInstance: {
      state: { fullScreen },
    },
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
