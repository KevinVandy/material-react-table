import React, { FC, useState } from 'react';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';
import { MRT_FilterTypeMenu } from './MRT_FilterTypeMenu';

const commonMenuItemStyles = {
  display: 'flex',
  alignItems: 'center',
};

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
      ArrowRightIcon,
      ClearAllIcon,
      DynamicFeedIcon,
      FilterListIcon,
      SortIcon,
      VisibilityOffIcon,
    },
    idPrefix,
    localization,
    setShowFilters,
    tableInstance,
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
      <MenuList dense={tableInstance.state.densePadding} disablePadding>
        {!disableSortBy &&
          column.canSort && [
            <MenuItem
              key={1}
              disabled={!column.isSorted}
              onClick={handleClearSort}
              sx={commonMenuItemStyles}
            >
              <ListItemIcon>
                <ClearAllIcon />
              </ListItemIcon>
              <ListItemText>
                {localization.columnActionMenuItemClearSort}
              </ListItemText>
            </MenuItem>,
            <MenuItem
              disabled={column.isSorted && !column.isSortedDesc}
              key={2}
              onClick={handleSortAsc}
              sx={commonMenuItemStyles}
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
              divider={
                !disableFilters || enableColumnGrouping || !disableColumnHiding
              }
              key={3}
              disabled={column.isSorted && column.isSortedDesc}
              onClick={handleSortDesc}
              sx={commonMenuItemStyles}
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
            <MenuItem
              divider={enableColumnGrouping || !disableColumnHiding}
              key={1}
              onClick={handleFilterByColumn}
              sx={commonMenuItemStyles}
            >
              <ListItemIcon>
                <FilterListIcon />
              </ListItemIcon>
              <ListItemText>
                {localization.filterTextFieldPlaceholder?.replace(
                  '{column}',
                  String(column.Header),
                )}
              </ListItemText>
              <IconButton
                onClick={handleOpenFilterModeMenu}
                onMouseEnter={handleOpenFilterModeMenu}
                size="small"
                sx={{ p: 0 }}
              >
                <ArrowRightIcon />
              </IconButton>
            </MenuItem>,
            <MRT_FilterTypeMenu
              anchorEl={filterMenuAnchorEl}
              column={column}
              key={2}
              setAnchorEl={setFilterMenuAnchorEl}
              onSelect={handleFilterByColumn}
            />,
          ]}
        {enableColumnGrouping &&
          column.canGroupBy && [
            <MenuItem
              divider={!disableColumnHiding}
              key={2}
              onClick={handleGroupByColumn}
              sx={commonMenuItemStyles}
            >
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
          <MenuItem
            key={1}
            onClick={handleHideColumn}
            sx={commonMenuItemStyles}
          >
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
