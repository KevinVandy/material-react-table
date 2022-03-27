import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_FullScreenToggleButton: FC<Props> = ({ ...rest }) => {
  const {
    icons: { FullscreenExitIcon, FullscreenIcon },
    localization,
    setFullScreen,
    tableInstance: { getState },
  } = useMRT();

  return (
    <Tooltip arrow title={localization.toggleFullScreen}>
      <IconButton
        aria-label={localization.showHideFilters}
        onClick={() => setFullScreen(!getState().fullScreen)}
        size="small"
        {...rest}
      >
        {getState().fullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};
