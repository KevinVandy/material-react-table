import React, { FC } from 'react';
import { Divider, Menu, MenuItem as MuiMenuItem, styled } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { ColumnInstance } from 'react-table';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const MenuItem = styled(MuiMenuItem)({
  display: 'flex',
  gap: '0.75rem',
});

interface Props {
  anchorEl: HTMLElement | null;
  column: ColumnInstance;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export const MRT_ColumnActionMenu: FC<Props> = ({
  anchorEl,
  column,
  setAnchorEl,
}) => {
  const { enableColumnHiding, enableSorting, localization } =
    useMaterialReactTable();

  const handleSortAsc = () => {
    column.toggleSortBy(false);
    setAnchorEl(null);
  };

  const handleSortDesc = () => {
    column.toggleSortBy(true);
    setAnchorEl(null);
  };

  const handleHideColumn = () => {
    column.toggleHidden();
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {enableSorting && (
        <>
          <MenuItem onClick={handleSortAsc}>
            <SortIcon /> {localization?.columnActionMenuItemSortAsc}
          </MenuItem>
          <MenuItem onClick={handleSortDesc}>
            <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />{' '}
            {localization?.columnActionMenuItemSortDesc}
          </MenuItem>
          <Divider />
        </>
      )}
      {enableColumnHiding && (
        <MenuItem onClick={handleHideColumn}>
          <VisibilityOffIcon /> {localization?.columnActionMenuItemHideColumn}
        </MenuItem>
      )}
    </Menu>
  );
};
