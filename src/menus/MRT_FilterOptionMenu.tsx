import React, { FC, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import type {
  MRT_FilterFn,
  MRT_FILTER_OPTION,
  MRT_Header,
  MRT_TableInstance,
} from '..';
import {
  between,
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
  header?: MRT_Header;
  onSelect?: () => void;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  tableInstance: MRT_TableInstance;
}

export const MRT_FilterOptionMenu: FC<Props> = ({
  anchorEl,
  header,
  onSelect,
  setAnchorEl,
  tableInstance,
}) => {
  const {
    getState,
    options: { enabledGlobalFilterOptions, localization },
    setCurrentFilterFns,
    setCurrentGlobalFilterFn,
  } = tableInstance;

  const { isDensePadding, currentFilterFns, currentGlobalFilterFn } =
    getState();

  const { column } = header ?? {};

  const { columnDef } = column ?? {};

  const filterOptions = useMemo(
    () =>
      [
        {
          option: 'fuzzy',
          label: localization.filterFuzzy,
          divider: false,
          fn: fuzzy,
        },
        {
          option: 'contains',
          label: localization.filterContains,
          divider: false,
          fn: contains,
        },
        {
          option: 'startsWith',
          label: localization.filterStartsWith,
          divider: false,
          fn: startsWith,
        },
        {
          option: 'endsWith',
          label: localization.filterEndsWith,
          divider: true,
          fn: endsWith,
        },
        {
          option: 'equals',
          label: localization.filterEquals,
          divider: false,
          fn: equals,
        },
        {
          option: 'notEquals',
          label: localization.filterNotEquals,
          divider: true,
          fn: notEquals,
        },
        {
          option: 'between',
          label: localization.filterBetween,
          divider: false,
          fn: between,
        },
        {
          option: 'greaterThan',
          label: localization.filterGreaterThan,
          divider: false,
          fn: greaterThan,
        },
        {
          option: 'lessThan',
          label: localization.filterLessThan,
          divider: true,
          fn: lessThan,
        },
        {
          option: 'empty',
          label: localization.filterEmpty,
          divider: false,
          fn: empty,
        },
        {
          option: 'notEmpty',
          label: localization.filterNotEmpty,
          divider: false,
          fn: notEmpty,
        },
      ].filter((filterType) =>
        columnDef
          ? !columnDef.enabledColumnFilterOptions ||
            columnDef.enabledColumnFilterOptions.includes(filterType.option)
          : (!enabledGlobalFilterOptions ||
              enabledGlobalFilterOptions.includes(filterType.option)) &&
            ['fuzzy', 'contains'].includes(filterType.option),
      ) as Array<{
        option: MRT_FILTER_OPTION;
        label: string;
        divider: boolean;
        fn: Function;
      }>,
    [],
  );

  const handleSelectFilterType = (value: string) => {
    if (header && column) {
      setCurrentFilterFns((prev: { [key: string]: MRT_FilterFn }) => ({
        ...prev,
        [header.id]: value,
      }));
      if (['empty', 'notEmpty'].includes(value)) {
        column.setFilterValue(' ');
      } else if (value === 'between') {
        column.setFilterValue(['', '']);
      } else {
        column.setFilterValue('');
      }
    } else {
      setCurrentGlobalFilterFn(value);
    }
    setAnchorEl(null);
    onSelect?.();
  };

  const filterOption = !!header
    ? currentFilterFns[header.id]
    : currentGlobalFilterFn;

  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      MenuListProps={{
        dense: isDensePadding,
      }}
    >
      {filterOptions.map(({ option, label, divider, fn }, index) => (
        <MenuItem
          divider={divider}
          key={index}
          onClick={() => handleSelectFilterType(option as string)}
          selected={option === filterOption || fn === filterOption}
          sx={commonMenuItemStyles}
          value={option as string}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};
