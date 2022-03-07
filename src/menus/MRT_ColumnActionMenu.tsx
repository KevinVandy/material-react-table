import React, { FC, useState } from 'react';
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';
import { MRT_FilterMenu } from './MRT_FilterMenu';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface Props {
  anchorEl: HTMLElement | null;
  column: MRT_HeaderGroup;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export const MRT_ColumnActionMenu: FC<Props> = ({
  anchorEl,
  column,
  setAnchorEl,
}) => {
  const {
    disableColumnHiding,
    disableFilters,
    disableSortBy,
    enableColumnGrouping,
    icons: {
      ClearAllIcon,
      DynamicFeedIcon,
      FilterListIcon,
      SortIcon,
      VisibilityOffIcon,
    },
    idPrefix,
    localization,
    setShowFilters,
  } = useMRT();

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] =
    useState<null | HTMLElement>(null);

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

  const handleFilterByColumn = () => {
    setShowFilters(true);
    setTimeout(
      () =>
        document
          .getElementById(
            // @ts-ignore
            column.muiTableHeadCellFilterTextFieldProps?.id ??
              `mrt-${idPrefix}-${column.id}-filter-text-field`,
          )
          ?.focus(),
      200,
    );
    setAnchorEl(null);
  };

  const handleOpenFilterModeMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setFilterMenuAnchorEl(event.currentTarget);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      <MenuList>
        {!disableSortBy &&
          column.canSort && [
            <MenuItem
              key={1}
              disabled={!column.isSorted}
              onClick={handleClearSort}
            >
              <ListItemIcon>
                <ClearAllIcon />
              </ListItemIcon>
              <ListItemText>
                {localization.columnActionMenuItemClearSort}
              </ListItemText>
            </MenuItem>,
            <MenuItem
              key={2}
              disabled={column.isSorted && !column.isSortedDesc}
              onClick={handleSortAsc}
            >
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              <ListItemText>
                {localization.columnActionMenuItemSortAsc?.replace(
                  '{column}',
                  String(column.Header),
                )}
              </ListItemText>
            </MenuItem>,
            <MenuItem
              key={3}
              disabled={column.isSorted && column.isSortedDesc}
              onClick={handleSortDesc}
            >
              <ListItemIcon>
                <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
              </ListItemIcon>
              <ListItemText>
                {localization.columnActionMenuItemSortDesc?.replace(
                  '{column}',
                  String(column.Header),
                )}
              </ListItemText>
            </MenuItem>,
          ]}
        {!disableFilters &&
          column.canFilter && [
            <Divider key={0} />,
            <MenuItem key={1} onClick={handleFilterByColumn}>
              <ListItemIcon>
                <FilterListIcon />
              </ListItemIcon>
              <ListItemText>
                {localization.filterTextFieldPlaceholder?.replace(
                  '{column}',
                  String(column.Header),
                )}
              </ListItemText>
              <IconButton size="small" onMouseEnter={handleOpenFilterModeMenu}>
                <ArrowRightIcon />
              </IconButton>
            </MenuItem>,
            <MRT_FilterMenu
              anchorEl={filterMenuAnchorEl}
              column={column}
              key={2}
              setAnchorEl={setFilterMenuAnchorEl}
              onSelect={handleFilterByColumn}
            />,
          ]}
        {enableColumnGrouping &&
          column.canGroupBy && [
            <Divider key={1} />,
            <MenuItem key={2} onClick={handleGroupByColumn}>
              <ListItemIcon>
                <DynamicFeedIcon />
              </ListItemIcon>
              <ListItemText>
                {localization[
                  column.isGrouped
                    ? 'columnActionMenuItemUnGroupBy'
                    : 'columnActionMenuItemGroupBy'
                ]?.replace('{column}', String(column.Header))}
              </ListItemText>
            </MenuItem>,
          ]}
        {!disableColumnHiding && [
          <Divider key={0} />,
          <MenuItem key={1} onClick={handleHideColumn}>
            <ListItemIcon>
              <VisibilityOffIcon />
            </ListItemIcon>
            <ListItemText>
              {localization.columnActionMenuItemHideColumn?.replace(
                '{column}',
                String(column.Header),
              )}
            </ListItemText>
          </MenuItem>,
        ]}
      </MenuList>
    </Menu>
  );
};
