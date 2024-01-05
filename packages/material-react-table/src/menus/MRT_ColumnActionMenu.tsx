import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu, { type MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MRT_FilterOptionMenu } from './MRT_FilterOptionMenu';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

export const commonMenuItemStyles = {
  alignItems: 'center',
  justifyContent: 'space-between',
  my: 0,
  py: '6px',
};

export const commonListItemStyles = {
  alignItems: 'center',
  display: 'flex',
};

interface Props<TData extends MRT_RowData> extends Partial<MenuProps> {
  anchorEl: HTMLElement | null;
  header: MRT_Header<TData>;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  table: MRT_TableInstance<TData>;
}

export const MRT_ColumnActionMenu = <TData extends MRT_RowData>({
  anchorEl,
  header,
  setAnchorEl,
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      columnFilterDisplayMode,
      columnFilterModeOptions,
      enableColumnFilterModes,
      enableColumnFilters,
      enableColumnPinning,
      enableColumnResizing,
      enableGrouping,
      enableHiding,
      enableSorting,
      enableSortingRemoval,
      icons: {
        ArrowRightIcon,
        ClearAllIcon,
        DynamicFeedIcon,
        FilterListIcon,
        FilterListOffIcon,
        PushPinIcon,
        RestartAltIcon,
        SortIcon,
        ViewColumnIcon,
        VisibilityOffIcon,
      },
      localization,
      renderColumnActionsMenuItems,
    },
    refs: { filterInputRefs },
    setColumnFilterFns,
    setColumnOrder,
    setColumnSizingInfo,
    setShowColumnFilters,
    toggleAllColumnsVisible,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { columnSizing, columnVisibility, density, showColumnFilters } =
    getState();
  const columnFilterValue = column.getFilterValue();

  const [filterMenuAnchorEl, setFilterMenuAnchorEl] =
    useState<HTMLElement | null>(null);

  const handleClearSort = () => {
    column.clearSorting();
    setAnchorEl(null);
  };

  const handleSortAsc = () => {
    column.toggleSorting(false);
    setAnchorEl(null);
  };

  const handleSortDesc = () => {
    column.toggleSorting(true);
    setAnchorEl(null);
  };

  const handleResetColumnSize = () => {
    setColumnSizingInfo((old) => ({ ...old, isResizingColumn: false }));
    column.resetSize();
    setAnchorEl(null);
  };

  const handleHideColumn = () => {
    column.toggleVisibility(false);
    setAnchorEl(null);
  };

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
    setAnchorEl(null);
  };

  const handleGroupByColumn = () => {
    column.toggleGrouping();
    setColumnOrder((old: any) => ['mrt-row-expand', ...old]);
    setAnchorEl(null);
  };

  const handleClearFilter = () => {
    column.setFilterValue(undefined);
    setAnchorEl(null);
    if (['empty', 'notEmpty'].includes(columnDef._filterFn)) {
      setColumnFilterFns((prev) => ({
        ...prev,
        [header.id]: allowedColumnFilterOptions?.[0] ?? 'fuzzy',
      }));
    }
  };

  const handleFilterByColumn = () => {
    setShowColumnFilters(true);
    queueMicrotask(() => filterInputRefs.current[`${column.id}-0`]?.focus());
    setAnchorEl(null);
  };

  const handleShowAllColumns = () => {
    toggleAllColumnsVisible(true);
    setAnchorEl(null);
  };

  const handleOpenFilterModeMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setFilterMenuAnchorEl(event.currentTarget);
  };

  const isSelectFilter = !!columnDef.filterSelectOptions;

  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;

  const showFilterModeSubMenu =
    enableColumnFilterModes &&
    columnDef.enableColumnFilterModes !== false &&
    !isSelectFilter &&
    (allowedColumnFilterOptions === undefined ||
      !!allowedColumnFilterOptions?.length);

  const internalColumnMenuItems = [
    ...(enableSorting && column.getCanSort()
      ? [
          enableSortingRemoval !== false && (
            <MenuItem
              disabled={!column.getIsSorted()}
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
            </MenuItem>
          ),
          <MenuItem
            disabled={column.getIsSorted() === 'asc'}
            key={1}
            onClick={handleSortAsc}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />
              </ListItemIcon>
              {localization.sortByColumnAsc?.replace(
                '{column}',
                String(columnDef.header),
              )}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={column.getIsSorted() === 'desc'}
            divider={enableColumnFilters || enableGrouping || enableHiding}
            key={2}
            onClick={handleSortDesc}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <SortIcon />
              </ListItemIcon>
              {localization.sortByColumnDesc?.replace(
                '{column}',
                String(columnDef.header),
              )}
            </Box>
          </MenuItem>,
        ]
      : []),
    ...(enableColumnFilters && column.getCanFilter()
      ? [
          <MenuItem
            disabled={
              !columnFilterValue ||
              (Array.isArray(columnFilterValue) &&
                !columnFilterValue.filter((value) => value).length)
            }
            key={3}
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
          columnFilterDisplayMode === 'subheader' && (
            <MenuItem
              disabled={showColumnFilters && !enableColumnFilterModes}
              divider={enableGrouping || enableHiding}
              key={4}
              onClick={
                showColumnFilters
                  ? handleOpenFilterModeMenu
                  : handleFilterByColumn
              }
              sx={commonMenuItemStyles}
            >
              <Box sx={commonListItemStyles}>
                <ListItemIcon>
                  <FilterListIcon />
                </ListItemIcon>
                {localization.filterByColumn?.replace(
                  '{column}',
                  String(columnDef.header),
                )}
              </Box>
              {showFilterModeSubMenu && (
                <IconButton
                  onClick={handleOpenFilterModeMenu}
                  onMouseEnter={handleOpenFilterModeMenu}
                  size="small"
                  sx={{ p: 0 }}
                >
                  <ArrowRightIcon />
                </IconButton>
              )}
            </MenuItem>
          ),
          showFilterModeSubMenu && (
            <MRT_FilterOptionMenu
              anchorEl={filterMenuAnchorEl}
              header={header}
              key={5}
              onSelect={handleFilterByColumn}
              setAnchorEl={setFilterMenuAnchorEl}
              table={table}
            />
          ),
        ].filter(Boolean)
      : []),
    ...(enableGrouping && column.getCanGroup()
      ? [
          <MenuItem
            divider={enableColumnPinning}
            key={6}
            onClick={handleGroupByColumn}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <DynamicFeedIcon />
              </ListItemIcon>
              {localization[
                column.getIsGrouped() ? 'ungroupByColumn' : 'groupByColumn'
              ]?.replace('{column}', String(columnDef.header))}
            </Box>
          </MenuItem>,
        ]
      : []),
    ...(enableColumnPinning && column.getCanPin()
      ? [
          <MenuItem
            disabled={column.getIsPinned() === 'left' || !column.getCanPin()}
            key={7}
            onClick={() => handlePinColumn('left')}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <PushPinIcon style={{ transform: 'rotate(90deg)' }} />
              </ListItemIcon>
              {localization.pinToLeft}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={column.getIsPinned() === 'right' || !column.getCanPin()}
            key={8}
            onClick={() => handlePinColumn('right')}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <PushPinIcon style={{ transform: 'rotate(-90deg)' }} />
              </ListItemIcon>
              {localization.pinToRight}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={!column.getIsPinned()}
            divider={enableHiding}
            key={9}
            onClick={() => handlePinColumn(false)}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <PushPinIcon />
              </ListItemIcon>
              {localization.unpin}
            </Box>
          </MenuItem>,
        ]
      : []),
    ...(enableColumnResizing && column.getCanResize()
      ? [
          <MenuItem
            disabled={!columnSizing[column.id]}
            key={10}
            onClick={handleResetColumnSize}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <RestartAltIcon />
              </ListItemIcon>
              {localization.resetColumnSize}
            </Box>
          </MenuItem>,
        ]
      : []),
    ...(enableHiding
      ? [
          <MenuItem
            disabled={!column.getCanHide()}
            key={11}
            onClick={handleHideColumn}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <VisibilityOffIcon />
              </ListItemIcon>
              {localization.hideColumn?.replace(
                '{column}',
                String(columnDef.header),
              )}
            </Box>
          </MenuItem>,
          <MenuItem
            disabled={
              !Object.values(columnVisibility).filter((visible) => !visible)
                .length
            }
            key={12}
            onClick={handleShowAllColumns}
            sx={commonMenuItemStyles}
          >
            <Box sx={commonListItemStyles}>
              <ListItemIcon>
                <ViewColumnIcon />
              </ListItemIcon>
              {localization.showAllColumns?.replace(
                '{column}',
                String(columnDef.header),
              )}
            </Box>
          </MenuItem>,
        ]
      : []),
  ].filter(Boolean);

  return (
    <Menu
      MenuListProps={{
        dense: density === 'compact',
      }}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      {...rest}
    >
      {columnDef.renderColumnActionsMenuItems?.({
        closeMenu: () => setAnchorEl(null),
        column,
        internalColumnMenuItems,
        table,
      }) ??
        renderColumnActionsMenuItems?.({
          closeMenu: () => setAnchorEl(null),
          column,
          internalColumnMenuItems,
          table,
        }) ??
        internalColumnMenuItems}
    </Menu>
  );
};
