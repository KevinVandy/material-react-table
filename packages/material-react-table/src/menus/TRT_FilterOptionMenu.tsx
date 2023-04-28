import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import type {
  TRT_FilterOption,
  TRT_Header,
  TRT_InternalFilterOption,
  TRT_Localization,
  TRT_TableInstance,
} from '..';

export const mrtFilterOptions = (
  localization: TRT_Localization,
): TRT_InternalFilterOption[] => [
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
];

const rangeModes = ['between', 'betweenInclusive', 'inNumberRange'];
const emptyModes = ['empty', 'notEmpty'];
const arrModes = ['arrIncludesSome', 'arrIncludesAll', 'arrIncludes'];

interface Props<TData extends Record<string, any> = {}> {
  anchorEl: HTMLElement | null;
  header?: TRT_Header<TData>;
  onSelect?: () => void;
  setAnchorEl: (anchorEl: HTMLElement | null) => void;
  setFilterValue?: (filterValue: any) => void;
  table: TRT_TableInstance<TData>;
}

export const TRT_FilterOptionMenu = <TData extends Record<string, any> = {}>({
  anchorEl,
  header,
  onSelect,
  setAnchorEl,
  setFilterValue,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      columnFilterModeOptions,
      globalFilterModeOptions,
      localization,
      renderColumnFilterModeMenuItems,
      renderGlobalFilterModeMenuItems,
    },
    setColumnFilterFns,
    setGlobalFilterFn,
  } = table;
  const { globalFilterFn, density } = getState();
  const { column } = header ?? {};
  const { columnDef } = column ?? {};
  const currentFilterValue = column?.getFilterValue();

  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;

  const internalFilterOptions = useMemo(
    () =>
      mrtFilterOptions(localization).filter((filterOption) =>
        columnDef
          ? allowedColumnFilterOptions === undefined ||
            allowedColumnFilterOptions?.includes(filterOption.option)
          : (!globalFilterModeOptions ||
              globalFilterModeOptions.includes(filterOption.option)) &&
            ['fuzzy', 'contains', 'startsWith'].includes(filterOption.option),
      ),
    [],
  );

  const handleSelectFilterMode = (option: TRT_FilterOption) => {
    const prevFilterMode = columnDef?._filterFn ?? '';
    if (!header || !column) {
      // global filter mode
      setGlobalFilterFn(option);
    } else if (option !== prevFilterMode) {
      // column filter mode
      setColumnFilterFns((prev: { [key: string]: any }) => ({
        ...prev,
        [header.id]: option,
      }));

      // reset filter value and/or perform new filter render
      if (emptyModes.includes(option)) {
        // will now be empty/notEmpty filter mode
        if (
          currentFilterValue !== ' ' &&
          !emptyModes.includes(prevFilterMode)
        ) {
          column.setFilterValue(' ');
        } else if (currentFilterValue) {
          column.setFilterValue(currentFilterValue); // perform new filter render
        }
      } else if (
        columnDef?.filterVariant === 'multi-select' ||
        arrModes.includes(option as string)
      ) {
        // will now be array filter mode
        if (
          currentFilterValue instanceof String ||
          (currentFilterValue as Array<any>)?.length
        ) {
          column.setFilterValue([]);
          setFilterValue?.([]);
        } else if (currentFilterValue) {
          column.setFilterValue(currentFilterValue); // perform new filter render
        }
      } else if (
        columnDef?.filterVariant === 'range' ||
        rangeModes.includes(option as TRT_FilterOption)
      ) {
        // will now be range filter mode
        if (
          !Array.isArray(currentFilterValue) ||
          (!(currentFilterValue as Array<any>)?.every((v) => v === '') &&
            !rangeModes.includes(prevFilterMode))
        ) {
          column.setFilterValue(['', '']);
          setFilterValue?.('');
        } else {
          column.setFilterValue(currentFilterValue); // perform new filter render
        }
      } else {
        // will now be single value filter mode
        if (Array.isArray(currentFilterValue)) {
          column.setFilterValue('');
          setFilterValue?.('');
        } else {
          column.setFilterValue(currentFilterValue); // perform new filter render
        }
      }
    }
    setAnchorEl(null);
    onSelect?.();
  };

  const filterOption =
    !!header && columnDef ? columnDef._filterFn : globalFilterFn;

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
      {(header && column && columnDef
        ? columnDef.renderColumnFilterModeMenuItems?.({
            column: column as any,
            internalFilterOptions,
            onSelectFilterMode: handleSelectFilterMode,
            table,
          }) ??
          renderColumnFilterModeMenuItems?.({
            column: column as any,
            internalFilterOptions,
            onSelectFilterMode: handleSelectFilterMode,
            table,
          })
        : renderGlobalFilterModeMenuItems?.({
            internalFilterOptions,
            onSelectFilterMode: handleSelectFilterMode,
            table,
          })) ??
        internalFilterOptions.map(
          ({ option, label, divider, symbol }, index) => (
            <MenuItem
              divider={divider}
              key={index}
              onClick={() => handleSelectFilterMode(option as TRT_FilterOption)}
              selected={option === filterOption}
              sx={{
                alignItems: 'center',
                display: 'flex',
                gap: '2ch',
                my: 0,
                py: '6px',
              }}
              value={option}
            >
              <Box sx={{ fontSize: '1.25rem', width: '2ch' }}>{symbol}</Box>
              {label}
            </MenuItem>
          ),
        )}
    </Menu>
  );
};
