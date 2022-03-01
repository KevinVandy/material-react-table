import React, { FC } from 'react';
import { Divider, Menu, MenuItem } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';

const commonMenuItemStyles = {
  display: 'flex',
  gap: '0.75rem',
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
    localization,
    setShowFilters,
    icons: {
      FilterListIcon,
      SortIcon,
      ClearAllIcon,
      DynamicFeedIcon,
      VisibilityOffIcon,
    },
  } = useMRT();

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
              `filter-${column.id}-column`,
          )
          ?.focus(),
      200,
    );
    setAnchorEl(null);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
    >
      {!disableSortBy &&
        column.canSort && [
          <MenuItem
            key={1}
            disabled={!column.isSorted}
            onClick={handleClearSort}
            sx={commonMenuItemStyles}
          >
            <ClearAllIcon /> {localization.columnActionMenuItemClearSort}
          </MenuItem>,
          <MenuItem
            key={2}
            disabled={column.isSorted && !column.isSortedDesc}
            onClick={handleSortAsc}
            sx={commonMenuItemStyles}
          >
            <SortIcon />{' '}
            {localization.columnActionMenuItemSortAsc?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
          <MenuItem
            key={3}
            disabled={column.isSorted && column.isSortedDesc}
            onClick={handleSortDesc}
            sx={commonMenuItemStyles}
          >
            <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />{' '}
            {localization.columnActionMenuItemSortDesc?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
        ]}
      {!disableFilters &&
        column.canFilter && [
          <Divider key={0} />,
          <MenuItem
            key={1}
            onClick={handleFilterByColumn}
            sx={commonMenuItemStyles}
          >
            <FilterListIcon />{' '}
            {localization.filterTextFieldPlaceholder?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
        ]}
      {enableColumnGrouping &&
        column.canGroupBy && [
          <Divider key={1} />,
          <MenuItem
            key={2}
            onClick={handleGroupByColumn}
            sx={commonMenuItemStyles}
          >
            <DynamicFeedIcon />{' '}
            {localization[
              column.isGrouped
                ? 'columnActionMenuItemUnGroupBy'
                : 'columnActionMenuItemGroupBy'
            ]?.replace('{column}', String(column.Header))}
          </MenuItem>,
        ]}
      {!disableColumnHiding && [
        <Divider key={0} />,
        <MenuItem key={1} onClick={handleHideColumn} sx={commonMenuItemStyles}>
          <VisibilityOffIcon />{' '}
          {localization.columnActionMenuItemHideColumn?.replace(
            '{column}',
            String(column.Header),
          )}
        </MenuItem>,
      ]}
    </Menu>
  );
};
