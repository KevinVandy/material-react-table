import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import FilterListIcon from '@mui/icons-material/Fullscreen';
import FilterListOffIcon from '@mui/icons-material/FullscreenExit';

interface Props extends IconButtonProps {}

export const MRT_FullScreenToggleButton: FC<Props> = ({ ...rest }) => {
  const { localization, setFullScreen, fullScreen } = useMRT();

  return (
    <Tooltip arrow title={localization?.toggleFullScreenButtonTitle ?? ''}>
      <IconButton
        aria-label={localization?.toggleFilterButtonTitle}
        onClick={() => setFullScreen(!fullScreen)}
        size="small"
        {...rest}
      >
        {fullScreen ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
