import React, { FC, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import type { MRT_FilterType, MRT_Header, MRT_TableInstance } from '..';
import { MRT_FILTER_TYPE } from '../enums';
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

export const MRT_FilterTypeMenu: FC<Props> = ({
  anchorEl,
  header,
  onSelect,
  setAnchorEl,
  tableInstance,
}) => {
  const {
    getState,
    options: { enabledGlobalFilterTypes, localization },
    setCurrentFilterTypes,
    setCurrentGlobalFilterType,
  } = tableInstance;

  const { isDensePadding, currentFilterTypes, currentGlobalFilterType } =
    getState();

  const filterTypes: {
    type: MRT_FILTER_TYPE;
    label: string;
    divider: boolean;
    fn: Function;
  }[] = useMemo(
    () =>
      [
        {
          type: MRT_FILTER_TYPE.BEST_MATCH_FIRST,
          label: localization.filterBestMatchFirst,
          divider: false,
          fn: bestMatchFirst,
        },
        {
          type: MRT_FILTER_TYPE.BEST_MATCH,
          label: localization.filterBestMatch,
          divider: !!header,
          fn: bestMatch,
        },
        {
          type: MRT_FILTER_TYPE.CONTAINS,
          label: localization.filterContains,
          divider: false,
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
      ].filter((filterType) =>
        header
          ? !header.column.enabledColumnFilterTypes ||
            header.column.enabledColumnFilterTypes.includes(filterType.type)
          : (!enabledGlobalFilterTypes ||
              enabledGlobalFilterTypes.includes(filterType.type)) &&
            [
              MRT_FILTER_TYPE.BEST_MATCH_FIRST,
              MRT_FILTER_TYPE.BEST_MATCH,
            ].includes(filterType.type),
      ),
    [],
  );

  const handleSelectFilterType = (value: MRT_FILTER_TYPE) => {
    if (header) {
      setCurrentFilterTypes((prev: { [key: string]: MRT_FilterType }) => ({
        ...prev,
        [header.id]: value,
      }));
      if ([MRT_FILTER_TYPE.EMPTY, MRT_FILTER_TYPE.NOT_EMPTY].includes(value)) {
        header.column.setColumnFilterValue(' ');
      }
    } else {
      setCurrentGlobalFilterType(value);
    }
    setAnchorEl(null);
    onSelect?.();
  };

  const filterType = !!header
    ? currentFilterTypes[header.id]
    : currentGlobalFilterType;

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
