import React, { FC, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_FilterType, MRT_HeaderGroup } from '..';
import { commonMenuItemStyles } from './MRT_ColumnActionMenu';

interface Props {
  anchorEl: HTMLElement | null;
  column: MRT_HeaderGroup;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  onSelect?: () => void;
}

export const MRT_FilterTypeMenu: FC<Props> = ({
  anchorEl,
  column,
  onSelect,
  setAnchorEl,
}) => {
  const { localization, setCurrentFilterTypes, tableInstance } = useMRT();

  const filterTypes: {
    type: MRT_FilterType;
    label: string;
    divider: boolean;
  }[] = useMemo(
    () => [
      {
        type: 'fuzzy',
        label: localization.filterMenuItemFuzzy,
        divider: false,
      },
      {
        type: 'contains',
        label: localization.filterMenuItemContains,
        divider: true,
      },
      {
        type: 'startsWith',
        label: localization.filterMenuItemStartsWith,
        divider: false,
      },
      {
        type: 'endsWith',
        label: localization.filterMenuItemEndsWith,
        divider: true,
      },
      {
        type: 'equals',
        label: localization.filterMenuItemEquals,
        divider: false,
      },
      {
        type: 'notEquals',
        label: localization.filterMenuItemNotEquals,
        divider: true,
      },
      {
        type: 'empty',
        label: localization.filterMenuItemEmpty,
        divider: false,
      },
      {
        type: 'notEmpty',
        label: localization.filterMenuItemNotEmpty,
        divider: false,
      },
    ],
    [],
  );

  const handleSelectFilterType = (value: MRT_FilterType) => {
    setAnchorEl(null);
    setCurrentFilterTypes((prev: { [key: string]: MRT_FilterType }) => ({
      ...prev,
      [column.id]: value,
    }));
    if (['empty', 'notEmpty'].includes(value)) {
      column.setFilter(' ');
    }
    onSelect?.();
  };

  const filterType = tableInstance.state.currentFilterTypes[column.id];

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      MenuListProps={{
        dense: tableInstance.state.densePadding,
        disablePadding: true,
      }}
    >
      {filterTypes.map(({ type, label, divider }) => (
        <MenuItem
          divider={divider}
          key={type}
          onClick={() => handleSelectFilterType(type)}
          selected={type === filterType}
          sx={commonMenuItemStyles}
          value={type}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};
