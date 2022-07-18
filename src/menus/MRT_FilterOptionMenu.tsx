import React, { FC, useMemo } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import type { MRT_FilterOption, MRT_Header, MRT_TableInstance } from '..';

interface Props {
  anchorEl: HTMLElement | null;
  header?: MRT_Header;
  onSelect?: () => void;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  table: MRT_TableInstance;
}

export const MRT_FilterOptionMenu: FC<Props> = ({
  anchorEl,
  header,
  onSelect,
  setAnchorEl,
  table,
}) => {
  const {
    getState,
    options: {
      enabledGlobalFilterOptions,
      enabledColumnFilterOptions,
      localization,
    },
    setCurrentFilterFns,
    setCurrentGlobalFilterFn,
  } = table;
  const { currentFilterFns, currentGlobalFilterFn, density } = getState();
  const { column } = header ?? {};
  const { columnDef } = column ?? {};

  const allowedColumnFilterOptions =
    columnDef?.enabledColumnFilterOptions ?? enabledColumnFilterOptions;

  const filterOptions = useMemo(
    () =>
      (
        [
          {
            option: 'fuzzy',
            symbol: '≈',
            label: localization.filterFuzzy,
            divider: false,
          },
          {
            option: 'contains',
            symbol: '*',
            label: localization.filterContains,
            divider: false,
          },
          {
            option: 'startsWith',
            symbol: 'a',
            label: localization.filterStartsWith,
            divider: false,
          },
          {
            option: 'endsWith',
            symbol: 'z',
            label: localization.filterEndsWith,
            divider: true,
          },
          {
            option: 'equals',
            symbol: '=',
            label: localization.filterEquals,
            divider: false,
          },
          {
            option: 'notEquals',
            symbol: '≠',
            label: localization.filterNotEquals,
            divider: true,
          },
          {
            option: 'between',
            symbol: '⇿',
            label: localization.filterBetween,
            divider: false,
          },
          {
            option: 'betweenInclusive',
            symbol: '⬌',
            label: localization.filterBetweenInclusive,
            divider: true,
          },
          {
            option: 'greaterThan',
            symbol: '>',
            label: localization.filterGreaterThan,
            divider: false,
          },
          {
            option: 'greaterThanOrEqualTo',
            symbol: '≥',
            label: localization.filterGreaterThanOrEqualTo,
            divider: false,
          },
          {
            option: 'lessThan',
            symbol: '<',
            label: localization.filterLessThan,
            divider: false,
          },
          {
            option: 'lessThanOrEqualTo',
            symbol: '≤',
            label: localization.filterLessThanOrEqualTo,
            divider: true,
          },
          {
            option: 'empty',
            symbol: '∅',
            label: localization.filterEmpty,
            divider: false,
          },
          {
            option: 'notEmpty',
            symbol: '!∅',
            label: localization.filterNotEmpty,
            divider: false,
          },
        ] as Array<{
          divider: boolean;
          fn: Function;
          label: string;
          option: MRT_FilterOption;
          symbol?: string;
        }>
      ).filter((filterType) =>
        columnDef
          ? allowedColumnFilterOptions === undefined ||
            allowedColumnFilterOptions?.includes(filterType.option)
          : (!enabledGlobalFilterOptions ||
              enabledGlobalFilterOptions.includes(filterType.option)) &&
            ['fuzzy', 'contains'].includes(filterType.option),
      ),
    [],
  );

  const handleSelectFilterType = (option: MRT_FilterOption) => {
    if (header && column) {
      setCurrentFilterFns((prev: { [key: string]: any }) => ({
        ...prev,
        [header.id]: option,
      }));
      if (['empty', 'notEmpty'].includes(option)) {
        column.setFilterValue(' ');
      } else if (option === 'between') {
        column.setFilterValue(['', '']);
      } else {
        column.setFilterValue('');
      }
    } else {
      setCurrentGlobalFilterFn(option);
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
        dense: density === 'compact',
      }}
    >
      {filterOptions.map(({ option, label, divider, symbol }, index) => (
        <MenuItem
          divider={divider}
          key={index}
          onClick={() => handleSelectFilterType(option)}
          selected={option === filterOption}
          sx={{
            py: '6px',
            my: 0,
            alignItems: 'center',
            display: 'flex',
            gap: '2ch',
          }}
          value={option}
        >
          <Box sx={{ fontSize: '1.25rem', width: '2ch' }}>{symbol}</Box>
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};
