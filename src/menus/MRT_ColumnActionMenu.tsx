import React, { FC, useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_HeaderGroup } from '..';
import { MRT_FilterTypeMenu } from './MRT_FilterTypeMenu';
import { MRT_ShowHideColumnsMenu } from './MRT_ShowHideColumnsMenu';

export const commonMenuItemStyles = {
  py: '6px',
  my: 0,
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const commonListItemStyles = {
  display: 'flex',
  gap: '0.75rem',
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
      ViewColumnIcon,
      DynamicFeedIcon,
      FilterListIcon,
      FilterListOffIcon,
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

  const [showHideColumnsMenuAnchorEl, setShowHideColumnsMenuAnchorEl] =
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

  const handleClearFilter = () => {
    column.setFilter('');
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

  const handleOpenShowHideColumnsMenu = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    event.stopPropagation();
    setShowHideColumnsMenuAnchorEl(event.currentTarget);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      MenuListProps={{
        dense: tableInstance.state.densePadding,
      }}
    >
      {!disableSortBy &&
        column.canSort && [
          <MenuItem
            disabled={!column.isSorted}
            key={1}
            onClick={handleClearSort}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ClearAllIcon />
              {localization.clearSort}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={column.isSorted && !column.isSortedDesc}
            key={2}
            onClick={handleSortAsc}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <SortIcon />
              {localization.sortByColumnAsc?.replace(
                '{column}',
                String(column.Header),
              )}
            </Box>
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
            <Box sx={commonListItemStyles}>
              <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
              {localization.sortByColumnDesc?.replace(
                '{column}',
                String(column.Header),
              )}
            </Box>
          </MenuItem>,
        ]}
      {!disableFilters &&
        column.canFilter && [
          <MenuItem
            disabled={!column.filterValue}
            key={0}
            onClick={handleClearFilter}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <FilterListOffIcon />
              {localization.clearFilter}
            </Box>
          </MenuItem>,
          <MenuItem
            divider={enableColumnGrouping || !disableColumnHiding}
            key={1}
            onClick={handleFilterByColumn}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <FilterListIcon />
              {localization.filterByColumn?.replace(
                '{column}',
                String(column.Header),
              )}
            </Box>
            {!column.filterSelectOptions && (
              <IconButton
                onClick={handleOpenFilterModeMenu}
                onMouseEnter={handleOpenFilterModeMenu}
                size="small"
                sx={{ p: 0 }}
              >
                <ArrowRightIcon />
              </IconButton>
            )}
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
            <Box sx={commonListItemStyles}>
              <DynamicFeedIcon />
              {localization[
                column.isGrouped ? 'ungroupByColumn' : 'groupByColumn'
              ]?.replace('{column}', String(column.Header))}
            </Box>
          </MenuItem>,
        ]}
      {!disableColumnHiding && [
        <MenuItem key={1} onClick={handleHideColumn} sx={commonMenuItemStyles}>
          <Box sx={commonListItemStyles}>
            <VisibilityOffIcon />
            {localization.hideColumn?.replace(
              '{column}',
              String(column.Header),
            )}
          </Box>
        </MenuItem>,
        <MenuItem
          key={1}
          // onClick={handleShowColumnsMenu}
          sx={commonMenuItemStyles}
        >
          <Box sx={commonListItemStyles}>
            <ViewColumnIcon />

            {localization.showHideColumns?.replace(
              '{column}',
              String(column.Header),
            )}
          </Box>
          {!column.filterSelectOptions && (
            <IconButton
              onClick={handleOpenShowHideColumnsMenu}
              onMouseEnter={handleOpenShowHideColumnsMenu}
              size="small"
              sx={{ p: 0 }}
            >
              <ArrowRightIcon />
            </IconButton>
          )}
        </MenuItem>,
        <MRT_ShowHideColumnsMenu
          anchorEl={showHideColumnsMenuAnchorEl}
          isSubMenu
          key={2}
          setAnchorEl={setShowHideColumnsMenuAnchorEl}
        />,
      ]}
    </Menu>
  );
};
