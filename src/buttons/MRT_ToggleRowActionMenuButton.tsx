import React, { FC, MouseEvent, useState } from 'react';
import { IconButton as MuiIconButton, styled } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { Row } from 'react-table';
import { MRT_RowActionMenu } from '../menus/MRT_RowActionMenu';
import { MRT_EditActionButtons } from './MRT_EditActionButtons';

const IconButton = styled(MuiIconButton)({
  opacity: 0.5,
  transition: 'opacity 0.2s',
  marginRight: '2px',
  height: '2rem',
  width: '2rem',
  '&:hover': {
    opacity: 1,
  },
});

interface Props {
  row: Row;
}

export const MRT_ToggleRowActionMenuButton: FC<Props> = ({ row }) => {
  const { localization, currentEditingRow, renderRowActions, tableInstance } =
    useMaterialReactTable();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenRowActionMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  if (renderRowActions) {
    return <>{renderRowActions(row, tableInstance)}</>;
  }

  if (row.id === currentEditingRow?.id) {
    return <MRT_EditActionButtons row={row} />;
  }

  return (
    <>
      <IconButton
        aria-label={localization?.rowActionMenuButtonTitle}
        title={localization?.rowActionMenuButtonTitle}
        onClick={handleOpenRowActionMenu}
        size="small"
      >
        <MoreHorizIcon />
      </IconButton>
      <MRT_RowActionMenu
        anchorEl={anchorEl}
        row={row}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};
