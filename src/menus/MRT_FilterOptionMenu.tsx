import React, { FC, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import type { MRT_FilterFn, MRT_Header, MRT_TableInstance } from '..';
import { MRT_FILTER_OPTION } from '../enums';
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

  const filterOptions: {
    option: MRT_FILTER_OPTION;
    label: string;
    divider: boolean;
    fn: Function;
  }[] = useMemo(
    () =>
      [
        {
          option: MRT_FILTER_OPTION.FUZZY,
          label: localization.filterFuzzy,
          divider: false,
          fn: fuzzy,
        },
        {
          option: MRT_FILTER_OPTION.CONTAINS,
          label: localization.filterContains,
          divider: false,
          fn: contains,
        },
        {
          option: MRT_FILTER_OPTION.STARTS_WITH,
          label: localization.filterStartsWith,
          divider: false,
          fn: startsWith,
        },
        {
          option: MRT_FILTER_OPTION.ENDS_WITH,
          label: localization.filterEndsWith,
          divider: true,
          fn: endsWith,
        },
        {
          option: MRT_FILTER_OPTION.EQUALS,
          label: localization.filterEquals,
          divider: false,
          fn: equals,
        },
        {
          option: MRT_FILTER_OPTION.NOT_EQUALS,
          label: localization.filterNotEquals,
          divider: true,
          fn: notEquals,
        },
        {
          option: MRT_FILTER_OPTION.BETWEEN,
          label: localization.filterBetween,
          divider: false,
          fn: between,
        },
        {
          option: MRT_FILTER_OPTION.GREATER_THAN,
          label: localization.filterGreaterThan,
          divider: false,
          fn: greaterThan,
        },
        {
          option: MRT_FILTER_OPTION.LESS_THAN,
          label: localization.filterLessThan,
          divider: true,
          fn: lessThan,
        },
        {
          option: MRT_FILTER_OPTION.EMPTY,
          label: localization.filterEmpty,
          divider: false,
          fn: empty,
        },
        {
          option: MRT_FILTER_OPTION.NOT_EMPTY,
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
            [MRT_FILTER_OPTION.FUZZY, MRT_FILTER_OPTION.CONTAINS].includes(
              filterType.option,
            ),
      ),
    [],
  );

  const handleSelectFilterType = (value: MRT_FILTER_OPTION) => {
    if (header && column) {
      setCurrentFilterFns((prev: { [key: string]: MRT_FilterFn }) => ({
        ...prev,
        [header.id]: value,
      }));
      if (
        [MRT_FILTER_OPTION.EMPTY, MRT_FILTER_OPTION.NOT_EMPTY].includes(value)
      ) {
        column.setFilterValue(' ');
      } else if (value === MRT_FILTER_OPTION.BETWEEN) {
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
          onClick={() => handleSelectFilterType(option)}
          selected={option === filterOption || fn === filterOption}
          sx={commonMenuItemStyles}
          value={option}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};
