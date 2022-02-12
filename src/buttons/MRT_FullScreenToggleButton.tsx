import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import FilterListIcon from '@mui/icons-material/Fullscreen';
import FilterListOffIcon from '@mui/icons-material/FullscreenExit';

type Props = {};

export const MRT_FullScreenToggleButton: FC<Props> = () => {
  const { localization, setFullScreen, fullScreen } = useMRT();

  return (
    <Tooltip arrow title={localization?.toggleFullScreenButtonTitle ?? ''}>
      <IconButton
        aria-label={localization?.toggleFilterButtonTitle}
        onClick={() => setFullScreen(!fullScreen)}
        size="small"
      >
        {fullScreen ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
