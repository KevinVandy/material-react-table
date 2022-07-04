import React, { FC, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import type { MRT_FilterOption, MRT_Header, MRT_TableInstance } from '..';

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
      [
        {
          option: 'fuzzy',
          label: localization.filterFuzzy,
          divider: false,
        },
        {
          option: 'contains',
          label: localization.filterContains,
          divider: false,
        },
        {
          option: 'startsWith',
          label: localization.filterStartsWith,
          divider: false,
        },
        {
          option: 'endsWith',
          label: localization.filterEndsWith,
          divider: true,
        },
        {
          option: 'equals',
          label: localization.filterEquals,
          divider: false,
        },
        {
          option: 'notEquals',
          label: localization.filterNotEquals,
          divider: true,
        },
        {
          option: 'between',
          label: localization.filterBetween,
          divider: false,
        },
        {
          option: 'greaterThan',
          label: localization.filterGreaterThan,
          divider: false,
        },
        {
          option: 'lessThan',
          label: localization.filterLessThan,
          divider: true,
        },
        {
          option: 'empty',
          label: localization.filterEmpty,
          divider: false,
        },
        {
          option: 'notEmpty',
          label: localization.filterNotEmpty,
          divider: false,
        },
      ].filter((filterType) =>
        columnDef
          ? allowedColumnFilterOptions === undefined ||
            allowedColumnFilterOptions?.includes(filterType.option)
          : (!enabledGlobalFilterOptions ||
              enabledGlobalFilterOptions.includes(filterType.option)) &&
            ['fuzzy', 'contains'].includes(filterType.option),
      ) as Array<{
        option: MRT_FilterOption;
        label: string;
        divider: boolean;
        fn: Function;
      }>,
    [],
  );

  const handleSelectFilterType = (value: MRT_FilterOption) => {
    if (header && column) {
      setCurrentFilterFns((prev: { [key: string]: any }) => ({
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
        dense: density === 'compact',
      }}
    >
      {filterOptions.map(({ option, label, divider }, index) => (
        <MenuItem
          divider={divider}
          key={index}
          onClick={() => handleSelectFilterType(option)}
          selected={option === filterOption}
          sx={commonMenuItemStyles}
          value={option}
        >
          {label}
        </MenuItem>
      ))}
    </Menu>
  );
};
