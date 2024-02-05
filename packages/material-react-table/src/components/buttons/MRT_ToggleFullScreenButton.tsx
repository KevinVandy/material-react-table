import { useState } from 'react';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_RowData, type MRT_TableInstance } from '../../types';

export interface MRT_ToggleFullScreenButtonProps<TData extends MRT_RowData>
  extends IconButtonProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFullScreenButton = <TData extends MRT_RowData>({
  table,
  ...rest
}: MRT_ToggleFullScreenButtonProps<TData>) => {
  const {
    getState,
    options: {
      icons: { FullscreenExitIcon, FullscreenIcon },
      localization,
    },
    setIsFullScreen,
  } = table;
  const { isFullScreen } = getState();

  const [tooltipOpened, setTooltipOpened] = useState(false);

  const handleToggleFullScreen = () => {
    setTooltipOpened(false);
    setIsFullScreen(!isFullScreen);
  };

  return (
    <Tooltip
      open={tooltipOpened}
      title={rest?.title ?? localization.toggleFullScreen}
    >
      <IconButton
        aria-label={localization.toggleFullScreen}
        onClick={handleToggleFullScreen}
        onMouseEnter={() => setTooltipOpened(true)}
        onMouseLeave={() => setTooltipOpened(false)}
        {...rest}
        title={undefined}
      >
        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};
