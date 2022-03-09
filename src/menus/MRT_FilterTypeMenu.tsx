import React, { FC, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_FilterType, MRT_FILTER_TYPE, MRT_HeaderGroup } from '..';

const commonMenuItemStyles = {
  py: '6px',
  my: 0,
  alignItems: 'center',
};

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
    type: MRT_FILTER_TYPE;
    label: string;
    divider: boolean;
  }[] = useMemo(
    () => [
      {
        type: MRT_FILTER_TYPE.FUZZY,
        label: localization.filterMenuItemFuzzy,
        divider: false,
      },
      {
        type: MRT_FILTER_TYPE.CONTAINS,
        label: localization.filterMenuItemContains,
        divider: true,
      },
      {
        type: MRT_FILTER_TYPE.STARTS_WITH,
        label: localization.filterMenuItemStartsWith,
        divider: false,
      },
      {
        type: MRT_FILTER_TYPE.ENDS_WITH,
        label: localization.filterMenuItemEndsWith,
        divider: true,
      },
      {
        type: MRT_FILTER_TYPE.EQUALS,
        label: localization.filterMenuItemEquals,
        divider: false,
      },
      {
        type: MRT_FILTER_TYPE.NOT_EQUALS,
        label: localization.filterMenuItemNotEquals,
        divider: true,
      },
      {
        type: MRT_FILTER_TYPE.EMPTY,
        label: localization.filterMenuItemEmpty,
        divider: false,
      },
      {
        type: MRT_FILTER_TYPE.NOT_EMPTY,
        label: localization.filterMenuItemNotEmpty,
        divider: false,
      },
    ],
    [],
  );

  const handleSelectFilterType = (value: MRT_FILTER_TYPE) => {
    setAnchorEl(null);
    setCurrentFilterTypes((prev: { [key: string]: MRT_FilterType }) => ({
      ...prev,
      [column.id]: value,
    }));
    if ([MRT_FILTER_TYPE.EMPTY, MRT_FILTER_TYPE.NOT_EMPTY].includes(value)) {
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
      }}
    >
      {filterTypes.map(({ type, label, divider }, index) => (
        <MenuItem
          divider={divider}
          key={index}
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
