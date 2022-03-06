import React, { FC, MouseEvent, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_ColumnActionMenu } from '../menus/MRT_ColumnActionMenu';
import { MRT_HeaderGroup } from '..';

interface Props {
  column: MRT_HeaderGroup;
}

export const MRT_ToggleColumnActionMenuButton: FC<Props> = ({ column }) => {
  const {
    localization,
    icons: { MoreVertIcon },
  } = useMRT();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip
        arrow
        enterDelay={1000}
        enterNextDelay={1000}
        title={localization.columnActionMenuButtonTitle}
      >
        <IconButton
          aria-label={localization.columnActionMenuButtonTitle}
          onClick={handleClick}
          size="small"
          sx={{
            height: '2rem',
            mr: '2px',
            mt: '-0.2rem',
            opacity: 0.5,
            transition: 'opacity 0.2s',
            width: '2rem',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <MRT_ColumnActionMenu
        anchorEl={anchorEl}
        column={column}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};
