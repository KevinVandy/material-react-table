import React, { FC, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import type { MRT_FilterFn, MRT_Header, MRT_TableInstance } from '..';
import { MRT_FILTER_OPTION } from '../enums';
import {
  bestMatch,
  bestMatchFirst,
  contains,
  empty,
  endsWith,
  equals,
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

  const filterOptions: {
    type: MRT_FILTER_OPTION;
    label: string;
    divider: boolean;
    fn: Function;
  }[] = useMemo(
    () =>
      [
        {
          type: MRT_FILTER_OPTION.BEST_MATCH_FIRST,
          label: localization.filterBestMatchFirst,
          divider: false,
          fn: bestMatchFirst,
        },
        {
          type: MRT_FILTER_OPTION.BEST_MATCH,
          label: localization.filterBestMatch,
          divider: !!header,
          fn: bestMatch,
        },
        {
          type: MRT_FILTER_OPTION.CONTAINS,
          label: localization.filterContains,
          divider: false,
          fn: contains,
        },
        {
          type: MRT_FILTER_OPTION.STARTS_WITH,
          label: localization.filterStartsWith,
          divider: false,
          fn: startsWith,
        },
        {
          type: MRT_FILTER_OPTION.ENDS_WITH,
          label: localization.filterEndsWith,
          divider: true,
          fn: endsWith,
        },
        {
          type: MRT_FILTER_OPTION.EQUALS,
          label: localization.filterEquals,
          divider: false,
          fn: equals,
        },
        {
          type: MRT_FILTER_OPTION.NOT_EQUALS,
          label: localization.filterNotEquals,
          divider: true,
          fn: notEquals,
        },
        {
          type: MRT_FILTER_OPTION.GREATER_THAN,
          label: localization.filterGreaterThan,
          divider: false,
          fn: greaterThan,
        },
        {
          type: MRT_FILTER_OPTION.LESS_THAN,
          label: localization.filterLessThan,
          divider: true,
          fn: lessThan,
        },
        {
          type: MRT_FILTER_OPTION.EMPTY,
          label: localization.filterEmpty,
          divider: false,
          fn: empty,
        },
        {
          type: MRT_FILTER_OPTION.NOT_EMPTY,
          label: localization.filterNotEmpty,
          divider: false,
          fn: notEmpty,
        },
      ].filter((filterType) =>
        header
          ? !header.column.enabledColumnFilterOptions ||
            header.column.enabledColumnFilterOptions.includes(filterType.type)
          : (!enabledGlobalFilterOptions ||
              enabledGlobalFilterOptions.includes(filterType.type)) &&
            [
              MRT_FILTER_OPTION.BEST_MATCH_FIRST,
              MRT_FILTER_OPTION.BEST_MATCH,
            ].includes(filterType.type),
      ),
    [],
  );

  const handleSelectFilterType = (value: MRT_FILTER_OPTION) => {
    if (header) {
      setCurrentFilterFns((prev: { [key: string]: MRT_FilterFn }) => ({
        ...prev,
        [header.id]: value,
      }));
      if (
        [MRT_FILTER_OPTION.EMPTY, MRT_FILTER_OPTION.NOT_EMPTY].includes(value)
      ) {
        header.column.setColumnFilterValue(' ');
      }
    } else {
      setCurrentGlobalFilterFn(value);
    }
    setAnchorEl(null);
    onSelect?.();
  };

  const filterType = !!header
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
      {filterOptions.map(({ type, label, divider, fn }, index) => (
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
