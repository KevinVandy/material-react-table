import React, { FC } from 'react';
import { Divider, Menu, MenuItem as MuiMenuItem, styled } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { ColumnInstance } from 'react-table';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';

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
  const {
    enableColumnHiding,
    enableColumnGrouping,
    disableSortBy,
    localization,
  } = useMaterialReactTable();

  const handleClearSort = () => {
    column.clearSortBy();
    setAnchorEl(null);
  };

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

  const handleGroupByColumn = () => {
    column.toggleGroupBy();
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {!disableSortBy && [
        <MenuItem key={1} disabled={!column.isSorted} onClick={handleClearSort}>
          <ClearAllIcon /> {localization?.columnActionMenuItemClearSort}
        </MenuItem>,
        <MenuItem
          key={2}
          disabled={column.isSorted && !column.isSortedDesc}
          onClick={handleSortAsc}
        >
          <SortIcon /> {localization?.columnActionMenuItemSortAsc}
        </MenuItem>,
        <MenuItem
          key={3}
          disabled={column.isSorted && column.isSortedDesc}
          onClick={handleSortDesc}
        >
          <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />{' '}
          {localization?.columnActionMenuItemSortDesc}
        </MenuItem>,
        <Divider key={4} />,
      ]}
      {enableColumnHiding && (
        <MenuItem onClick={handleHideColumn}>
          <VisibilityOffIcon /> {localization?.columnActionMenuItemHideColumn}
        </MenuItem>
      )}
      {enableColumnGrouping && column.canGroupBy && (
        <MenuItem disabled={column.isGrouped} onClick={handleGroupByColumn}>
          <DynamicFeedIcon /> {localization?.columnActionMenuItemGroupBy}
        </MenuItem>
      )}
      {enableColumnGrouping && column.canGroupBy && (
        <MenuItem disabled={!column.isGrouped} onClick={handleGroupByColumn}>
          <DynamicFeedIcon /> {localization?.columnActionMenuItemUnGroupBy}
        </MenuItem>
      )}
    </Menu>
  );
};
