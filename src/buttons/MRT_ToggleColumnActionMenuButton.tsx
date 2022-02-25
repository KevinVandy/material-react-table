import React, { FC, MouseEvent, useState } from 'react';
import { IconButton as MuiIconButton, styled, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMRT } from '../useMRT';
import { MRT_ColumnActionMenu } from '../menus/MRT_ColumnActionMenu';
import { HeaderGroup } from 'react-table';

const IconButton = styled(MuiIconButton)({
  opacity: 0.5,
  transition: 'opacity 0.2s',
  marginRight: '2px',
  height: '1.6rem',
  width: '1.6rem',
  '&:hover': {
    opacity: 1,
  },
});

interface Props {
  column: HeaderGroup;
}

export const MRT_ToggleColumnActionMenuButton: FC<Props> = ({ column }) => {
  const { localization } = useMRT();

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
        title={localization?.columnActionMenuButtonTitle ?? ''}
      >
        <IconButton
          aria-label={localization?.columnActionMenuButtonTitle}
          onClick={handleClick}
          size="small"
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
