import React, { FC, MouseEvent, useState } from 'react';
import { IconButton, Tooltip, IconButtonProps } from '@mui/material';
import { MRT_ShowHideColumnsMenu } from '../menus/MRT_ShowHideColumnsMenu';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  instance: MRT_TableInstance;
}

export const MRT_ShowHideColumnsButton: FC<Props> = ({ instance, ...rest }) => {
  const {
    options: {
      icons: { ViewColumnIcon },
      localization,
    },
  } = instance;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip arrow title={localization.showHideColumns}>
        <IconButton
          aria-label={localization.showHideColumns}
          onClick={handleClick}
          {...rest}
        >
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <MRT_ShowHideColumnsMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        instance={instance}
      />
    </>
  );
};
