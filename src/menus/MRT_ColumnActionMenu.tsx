import React, { FC, useState } from 'react';
import { Box, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Header } from '..';
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
  alignItems: 'center',
};

interface Props {
  anchorEl: HTMLElement | null;
  header: MRT_Header;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export const MRT_ColumnActionMenu: FC<Props> = ({
  anchorEl,
  header,
  setAnchorEl,
}) => {
  const {
    disableColumnHiding,
    enableColumnFilters,
    enableSorting,
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
    tableInstance: { getState },
  } = useMRT();

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const [showHideColumnsMenuAnchorEl, setShowHideColumnsMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleClearSort = () => {
    tableInstance.resetSorting();
    setAnchorEl(null);
  };

  const handleSortAsc = () => {
    header.column.toggleSorting(false);
    setAnchorEl(null);
  };

  const handleSortDesc = () => {
    header.column.toggleSorting(true);
    setAnchorEl(null);
  };

  const handleHideColumn = () => {
    header.column.toggleVisibility(false);
    setAnchorEl(null);
  };

  const handleGroupByColumn = () => {
    header.column.toggleGrouping();
    setAnchorEl(null);
  };

  const handleClearFilter = () => {
    header.column.setColumnFilterValue('');
    setAnchorEl(null);
  };

  const handleFilterByColumn = () => {
    setShowFilters(true);
    setTimeout(
      () =>
        document
          .getElementById(
            // @ts-ignore
            header.muiTableHeadCellFilterTextFieldProps?.id ??
              `mrt-${idPrefix}-${header.id}-filter-text-field`,
          )
          ?.focus(),
      200,
    );
    setAnchorEl(null);
  };

  const handleShowAllColumns = () => {
    tableInstance.toggleAllColumnsVisible(true);
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
        dense: getState().densePadding,
      }}
    >
      {enableSorting &&
        header.column.getCanSort() && [
          <MenuItem
            disabled={!header.column.getIsSorted()}
            key={0}
            onClick={handleClearSort}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <ClearAllIcon />
              </ListItemIcon>
              {localization.clearSort}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={header.column.getIsSorted() === 'asc'}
            key={1}
            onClick={handleSortAsc}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              {localization.sortByColumnAsc?.replace(
                '{column}',
                String(header.column.header),
              )}
            </Box>
          </MenuItem>,
          <MenuItem
            divider={
              enableColumnFilters ||
              enableColumnGrouping ||
              !disableColumnHiding
            }
            key={2}
            disabled={header.column.getIsSorted() === 'desc'}
            onClick={handleSortDesc}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
              </ListItemIcon>
              {localization.sortByColumnDesc?.replace(
                '{column}',
                String(header.column.header),
              )}
            </Box>
          </MenuItem>,
        ]}
      {enableColumnFilters &&
        header.column.getCanColumnFilter() && [
          <MenuItem
            disabled={!header.column.getColumnFilterValue()}
            key={0}
            onClick={handleClearFilter}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <FilterListOffIcon />
              </ListItemIcon>
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
              <ListItemIcon>
                <FilterListIcon />
              </ListItemIcon>
              {localization.filterByColumn?.replace(
                '{column}',
                String(header.column.header),
              )}
            </Box>
            {!header.column.filterSelectOptions && (
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
            header={header}
            key={2}
            setAnchorEl={setFilterMenuAnchorEl}
            onSelect={handleFilterByColumn}
          />,
        ]}
      {enableColumnGrouping &&
        header.column.getCanGroup() && [
          <MenuItem
            divider={!disableColumnHiding}
            key={0}
            onClick={handleGroupByColumn}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <DynamicFeedIcon />
              </ListItemIcon>
              {localization[
                header.column.getIsGrouped() ? 'ungroupByColumn' : 'groupByColumn'
              ]?.replace('{column}', String(header.column.header))}
            </Box>
          </MenuItem>,
        ]}
      {!disableColumnHiding && [
        <MenuItem
          disabled={header.column.disableColumnHiding}
          key={0}
          onClick={handleHideColumn}
          sx={commonMenuItemStyles}
        >
          <Box sx={commonListItemStyles}>
            <ListItemIcon>
              <VisibilityOffIcon />
            </ListItemIcon>
            {localization.hideColumn?.replace(
              '{column}',
              String(header.column.header),
            )}
          </Box>
        </MenuItem>,
        <MenuItem
          disabled={!getState().columnVisibility?.length} //TODO
          key={1}
          onClick={handleShowAllColumns}
          sx={commonMenuItemStyles}
        >
          <Box sx={commonListItemStyles}>
            <ListItemIcon>
              <ViewColumnIcon />
            </ListItemIcon>
            {localization.showAllColumns?.replace(
              '{column}',
              String(header.column.header),
            )}
          </Box>
          {!header.column.filterSelectOptions && (
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
