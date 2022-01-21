import React, { FC, MouseEvent, useState } from 'react';
import { IconButton as MuiIconButton, styled } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TableHeadCommandMenu } from '../menus/MRT_TableHeadCommandMenu';
import { HeaderGroup } from 'react-table';

const IconButton = styled(MuiIconButton)({
  opacity: 0.1,
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 1,
  },
});

interface Props {
  column: HeaderGroup;
}

export const MRT_ToggleHeadMenuButton: FC<Props> = ({ column }) => {
  const { localization } = useMaterialReactTable();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        aria-label={localization?.toggleTableHeadCommandMenuButtonTitle}
        title={localization?.toggleTableHeadCommandMenuButtonTitle}
        onClick={handleClick}
        size="small"
      >
        <MoreVertIcon />
      </IconButton>
      <MRT_TableHeadCommandMenu
        anchorEl={anchorEl}
        column={column}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};
