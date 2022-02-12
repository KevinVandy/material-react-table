import React, { FC } from 'react';
import { Divider, Menu, MenuItem as MuiMenuItem, styled } from '@mui/material';
import { useMRT } from '../useMRT';
import { HeaderGroup } from 'react-table';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FilterIcon from '@mui/icons-material/FilterList';

const MenuItem = styled(MuiMenuItem)({
  display: 'flex',
  gap: '0.75rem',
});

interface Props {
  anchorEl: HTMLElement | null;
  column: HeaderGroup;
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
          >
            <ClearAllIcon /> {localization?.columnActionMenuItemClearSort}
          </MenuItem>,
          <MenuItem
            key={2}
            disabled={column.isSorted && !column.isSortedDesc}
            onClick={handleSortAsc}
          >
            <SortIcon />{' '}
            {localization?.columnActionMenuItemSortAsc?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
          <MenuItem
            key={3}
            disabled={column.isSorted && column.isSortedDesc}
            onClick={handleSortDesc}
          >
            <SortIcon style={{ transform: 'rotate(180deg) scaleX(-1)' }} />{' '}
            {localization?.columnActionMenuItemSortDesc?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
        ]}
      {!disableFilters &&
        column.canFilter && [
          <Divider key={0} />,
          <MenuItem key={1} onClick={handleFilterByColumn}>
            <FilterIcon />{' '}
            {localization?.filterTextFieldPlaceholder?.replace(
              '{column}',
              String(column.Header),
            )}
          </MenuItem>,
        ]}
      {enableColumnGrouping &&
        column.canGroupBy && [
          <Divider key={1} />,
          <MenuItem key={2} onClick={handleGroupByColumn}>
            <DynamicFeedIcon />{' '}
            {localization?.[
              column.isGrouped
                ? 'columnActionMenuItemUnGroupBy'
                : 'columnActionMenuItemGroupBy'
            ]?.replace('{column}', String(column.Header))}
          </MenuItem>,
        ]}
      {!disableColumnHiding && [
        <Divider key={0} />,
        <MenuItem key={1} onClick={handleHideColumn}>
          <VisibilityOffIcon />{' '}
          {localization?.columnActionMenuItemHideColumn?.replace(
            '{column}',
            String(column.Header),
          )}
        </MenuItem>,
      ]}
    </Menu>
  );
};
