import React, { FC, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_FilterType, MRT_HeaderGroup } from '..';
import { MRT_FILTER_TYPE } from '../enums';
import {
  contains,
  empty,
  endsWith,
  equals,
  fuzzy,
  greaterThan,
  lessThan,
  notEmpty,
  notEquals,
  startsWith,
} from '../filtersFNs';

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
    fn: Function;
  }[] = useMemo(
    () => [
      {
        type: MRT_FILTER_TYPE.FUZZY,
        label: localization.filterFuzzy,
        divider: false,
        fn: fuzzy,
      },
      {
        type: MRT_FILTER_TYPE.CONTAINS,
        label: localization.filterContains,
        divider: true,
        fn: contains,
      },
      {
        type: MRT_FILTER_TYPE.STARTS_WITH,
        label: localization.filterStartsWith,
        divider: false,
        fn: startsWith,
      },
      {
        type: MRT_FILTER_TYPE.ENDS_WITH,
        label: localization.filterEndsWith,
        divider: true,
        fn: endsWith,
      },
      {
        type: MRT_FILTER_TYPE.EQUALS,
        label: localization.filterEquals,
        divider: false,
        fn: equals,
      },
      {
        type: MRT_FILTER_TYPE.NOT_EQUALS,
        label: localization.filterNotEquals,
        divider: true,
        fn: notEquals,
      },
      {
        type: MRT_FILTER_TYPE.GREATER_THAN,
        label: localization.filterGreaterThan,
        divider: false,
        fn: greaterThan,
      },
      {
        type: MRT_FILTER_TYPE.LESS_THAN,
        label: localization.filterLessThan,
        divider: true,
        fn: lessThan,
      },
      {
        type: MRT_FILTER_TYPE.EMPTY,
        label: localization.filterEmpty,
        divider: false,
        fn: empty,
      },
      {
        type: MRT_FILTER_TYPE.NOT_EMPTY,
        label: localization.filterNotEmpty,
        divider: false,
        fn: notEmpty,
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
      {filterTypes.map(({ type, label, divider, fn }, index) => (
        <MenuItem
          divider={divider}
          key={index}
          onClick={() => handleSelectFilterType(type)}
          selected={type === filterType || fn === filterType}
          sx={commonMenuItemStyles}
          value={type}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};
