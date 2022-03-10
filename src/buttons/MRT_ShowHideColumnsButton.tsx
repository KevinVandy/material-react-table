import React, { FC, MouseEvent, useState } from 'react';
import { IconButton, Tooltip, IconButtonProps } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';

interface Props extends IconButtonProps {}

export const MRT_ShowHideColumnsButton: FC<Props> = ({ ...rest }) => {
  const {
    icons: { ViewColumnIcon },
    localization,
  } = useMRT();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization.showHideColumnsButtonTitle}>
        <IconButton
          aria-label={localization.showHideColumnsButtonTitle}
          onClick={handleClick}
          size="small"
          {...rest}
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <MRT_ShowHideColumnsMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};
