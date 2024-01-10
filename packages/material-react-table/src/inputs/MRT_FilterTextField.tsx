import {
  type ChangeEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { debounce } from '@mui/material/utils';
import {
  DatePicker,
  type DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import {
  DateTimePicker,
  type DateTimePickerProps,
} from '@mui/x-date-pickers/DateTimePicker';
import {
  TimePicker,
  type TimePickerProps,
} from '@mui/x-date-pickers/TimePicker';
import { getValueAndLabel, parseFromValuesOrFunc } from '../column.utils';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import {
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TextFieldProps<'standard'> {
  header: MRT_Header<TData>;
  rangeFilterIndex?: number;
  table: MRT_TableInstance<TData>;
}

export const MRT_FilterTextField = <TData extends MRT_RowData>({
  header,
  rangeFilterIndex,
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: {
      columnFilterModeOptions,
      enableColumnFilterModes,
      icons: { CloseIcon, FilterListIcon },
      localization,
      manualFiltering,
      muiFilterAutocompleteProps,
      muiFilterDatePickerProps,
      muiFilterDateTimePickerProps,
      muiFilterTextFieldProps,
      muiFilterTimePickerProps,
    },
    refs: { filterInputRefs },
    setColumnFilterFns,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { filterVariant } = columnDef;

  const textFieldProps: TextFieldProps = {
    ...parseFromValuesOrFunc(muiFilterTextFieldProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiFilterTextFieldProps, {
      column,
      table,
    }),
    ...rest,
  };

  const autocompleteProps = {
    ...parseFromValuesOrFunc(muiFilterAutocompleteProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiFilterAutocompleteProps, {
      column,
      table,
    }),
  };

  const datePickerProps: DatePickerProps<any> = {
    ...parseFromValuesOrFunc(muiFilterDatePickerProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiFilterDatePickerProps, {
      column,
      table,
    }),
  };

  const dateTimePickerProps: DateTimePickerProps<any> = {
    ...parseFromValuesOrFunc(muiFilterDateTimePickerProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiFilterDateTimePickerProps, {
      column,
      table,
    }),
  };

  const timePickerProps: TimePickerProps<any> = {
    ...parseFromValuesOrFunc(muiFilterTimePickerProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiFilterTimePickerProps, {
      column,
      table,
    }),
  };

  const isDateFilter =
    filterVariant?.startsWith('date') || filterVariant?.startsWith('time');
  const isAutocompleteFilter = filterVariant === 'autocomplete';
  const isRangeFilter =
    filterVariant?.includes('range') || rangeFilterIndex !== undefined;
  const isSelectFilter = filterVariant === 'select';
  const isMultiSelectFilter = filterVariant === 'multi-select';
  const isTextboxFilter =
    ['autocomplete', 'text'].includes(filterVariant!) ||
    (!isSelectFilter && !isMultiSelectFilter);
  const currentFilterOption = columnDef._filterFn;
  const filterChipLabel = ['empty', 'notEmpty'].includes(currentFilterOption)
    ? //@ts-ignore
      localization[
        `filter${
          currentFilterOption?.charAt?.(0)?.toUpperCase() +
          currentFilterOption?.slice(1)
        }`
      ]
    : '';
  const filterPlaceholder = !isRangeFilter
    ? textFieldProps?.placeholder ??
      localization.filterByColumn?.replace('{column}', String(columnDef.header))
    : rangeFilterIndex === 0
      ? localization.min
      : rangeFilterIndex === 1
        ? localization.max
        : '';
  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;
  const showChangeModeButton =
    enableColumnFilterModes &&
    columnDef.enableColumnFilterModes !== false &&
    !rangeFilterIndex &&
    (allowedColumnFilterOptions === undefined ||
      !!allowedColumnFilterOptions?.length);

  const facetedUniqueValues = column.getFacetedUniqueValues();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [filterValue, setFilterValue] = useState<string | string[]>(() =>
    isMultiSelectFilter
      ? (column.getFilterValue() as string[]) || []
      : isRangeFilter
        ? (column.getFilterValue() as [string, string])?.[
            rangeFilterIndex as number
          ] || ''
        : (column.getFilterValue() as string) ?? '',
  );

  const handleChangeDebounced = useCallback(
    debounce(
      (newValue: any) => {
        if (isRangeFilter) {
          column.setFilterValue((old: Array<Date | null | number | string>) => {
            const newFilterValues = old ?? ['', ''];
            newFilterValues[rangeFilterIndex as number] = newValue ?? undefined;
            return newFilterValues;
          });
        } else {
          column.setFilterValue(newValue ?? undefined);
        }
      },
      isTextboxFilter ? (manualFiltering ? 400 : 200) : 1,
    ),
    [],
  );

  const handleChange = (newValue: any) => {
    setFilterValue(newValue ?? '');
    handleChangeDebounced(newValue);
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue =
      textFieldProps.type === 'date'
        ? event.target.valueAsDate
        : textFieldProps.type === 'number'
          ? event.target.valueAsNumber
          : event.target.value;
    handleChange(newValue);
    textFieldProps?.onChange?.(event);
  };

  const handleClear = () => {
    if (isMultiSelectFilter) {
      setFilterValue([]);
      column.setFilterValue([]);
    } else if (isRangeFilter) {
      setFilterValue('');
      column.setFilterValue((old: [string | undefined, string | undefined]) => {
        const newFilterValues = (Array.isArray(old) && old) || ['', ''];
        newFilterValues[rangeFilterIndex as number] = undefined;
        return newFilterValues;
      });
    } else {
      setFilterValue('');
      column.setFilterValue(undefined);
    }
  };

  const handleClearEmptyFilterChip = () => {
    setFilterValue('');
    column.setFilterValue(undefined);
    setColumnFilterFns((prev) => ({
      ...prev,
      [header.id]: allowedColumnFilterOptions?.[0] ?? 'fuzzy',
    }));
  };

  const handleFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const filterValue = column.getFilterValue();
      if (filterValue === undefined) {
        handleClear();
      } else if (isRangeFilter && rangeFilterIndex !== undefined) {
        setFilterValue((filterValue as [string, string])[rangeFilterIndex]);
      } else {
        setFilterValue(filterValue as string);
      }
    }
    isMounted.current = true;
  }, [column.getFilterValue()]);

  if (columnDef.Filter) {
    return (
      <>{columnDef.Filter?.({ column, header, rangeFilterIndex, table })}</>
    );
  }

  const dropdownOptions = useMemo(
    () =>
      columnDef.filterSelectOptions ??
      ((isSelectFilter || isMultiSelectFilter || isAutocompleteFilter) &&
      facetedUniqueValues
        ? Array.from(facetedUniqueValues.keys())
            .filter((value) => value !== null && value !== undefined)
            .sort((a, b) => a.localeCompare(b))
        : undefined),
    [
      columnDef.filterSelectOptions,
      facetedUniqueValues,
      isMultiSelectFilter,
      isSelectFilter,
    ],
  );

  const endAdornment =
    !isAutocompleteFilter && !isDateFilter && !filterChipLabel ? (
      <InputAdornment
        position="end"
        sx={{ mr: isSelectFilter || isMultiSelectFilter ? '20px' : undefined }}
      >
        <Tooltip placement="right" title={localization.clearFilter ?? ''}>
          <span>
            <IconButton
              aria-label={localization.clearFilter}
              disabled={!filterValue?.toString()?.length}
              onClick={handleClear}
              size="small"
              sx={{
                height: '2rem',
                transform: 'scale(0.9)',
                width: '2rem',
              }}
            >
              <CloseIcon />
            </IconButton>
          </span>
        </Tooltip>
      </InputAdornment>
    ) : null;

  const startAdornment = showChangeModeButton ? (
    <InputAdornment position="start">
      <Tooltip title={localization.changeFilterMode}>
        <span>
          <IconButton
            aria-label={localization.changeFilterMode}
            onClick={handleFilterMenuOpen}
            size="small"
            sx={{ height: '1.75rem', width: '1.75rem' }}
          >
            <FilterListIcon />
          </IconButton>
        </span>
      </Tooltip>
      {filterChipLabel && (
        <Chip label={filterChipLabel} onDelete={handleClearEmptyFilterChip} />
      )}
    </InputAdornment>
  ) : null;

  const commonTextFieldProps: TextFieldProps = {
    FormHelperTextProps: {
      sx: {
        fontSize: '0.75rem',
        lineHeight: '0.8rem',
        whiteSpace: 'nowrap',
      },
    },
    InputProps: endAdornment //hack because mui looks for presence of endAdornment key instead of undefined
      ? { endAdornment, startAdornment }
      : { startAdornment },
    fullWidth: true,
    helperText: showChangeModeButton ? (
      <label>
        {localization.filterMode.replace(
          '{filterType}',
          // @ts-ignore
          localization[
            `filter${
              currentFilterOption?.charAt(0)?.toUpperCase() +
              currentFilterOption?.slice(1)
            }`
          ],
        )}
      </label>
    ) : null,
    inputProps: {
      'aria-label': filterPlaceholder,
      autoComplete: 'new-password', // disable autocomplete and autofill
      disabled: !!filterChipLabel,
      sx: {
        textOverflow: 'ellipsis',
        width: filterChipLabel ? 0 : undefined,
      },
      title: filterPlaceholder,
    },
    inputRef: (inputRef) => {
      filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
        inputRef;
      if (textFieldProps.inputRef) {
        textFieldProps.inputRef = inputRef;
      }
    },
    margin: 'none',
    placeholder:
      filterChipLabel || isSelectFilter || isMultiSelectFilter
        ? undefined
        : filterPlaceholder,
    variant: 'standard',
    ...textFieldProps,
    sx: (theme) => ({
      minWidth: isDateFilter
        ? '160px'
        : enableColumnFilterModes && rangeFilterIndex === 0
          ? '110px'
          : isRangeFilter
            ? '100px'
            : !filterChipLabel
              ? '120px'
              : 'auto',
      mx: '-2px',
      p: 0,
      width: 'calc(100% + 4px)',
      ...(parseFromValuesOrFunc(textFieldProps?.sx, theme) as any),
    }),
  };

  const commonDatePickerProps = {
    onChange: (newDate: any) => {
      handleChange(newDate);
    },
    value: filterValue || null,
  };

  return (
    <>
      {filterVariant?.startsWith('time') ? (
        <TimePicker
          {...commonDatePickerProps}
          {...timePickerProps}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => handleClear(),
              ...timePickerProps?.slotProps?.field,
            },
            textField: {
              ...commonTextFieldProps,
              ...timePickerProps?.slotProps?.textField,
            },
          }}
        />
      ) : filterVariant?.startsWith('datetime') ? (
        <DateTimePicker
          {...commonDatePickerProps}
          {...dateTimePickerProps}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => handleClear(),
              ...dateTimePickerProps?.slotProps?.field,
            },
            textField: {
              ...commonTextFieldProps,
              ...dateTimePickerProps?.slotProps?.textField,
            },
          }}
        />
      ) : filterVariant?.startsWith('date') ? (
        <DatePicker
          {...commonDatePickerProps}
          {...datePickerProps}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => handleClear(),
              ...datePickerProps?.slotProps?.field,
            },
            textField: {
              ...commonTextFieldProps,
              ...datePickerProps?.slotProps?.textField,
            },
          }}
        />
      ) : isAutocompleteFilter ? (
        <Autocomplete
          freeSolo
          getOptionLabel={(option) => getValueAndLabel(option).label}
          onChange={(_e, newValue) =>
            handleChange(getValueAndLabel(newValue).value)
          }
          options={
            dropdownOptions?.map((option) => getValueAndLabel(option)) ?? []
          }
          {...autocompleteProps}
          renderInput={(builtinTextFieldProps) => (
            <TextField
              {...builtinTextFieldProps}
              {...commonTextFieldProps}
              InputProps={{
                ...builtinTextFieldProps.InputProps,
                startAdornment:
                  commonTextFieldProps?.InputProps?.startAdornment,
              }}
              inputProps={{
                ...builtinTextFieldProps.inputProps,
                ...commonTextFieldProps?.inputProps,
              }}
              onChange={handleTextFieldChange}
              onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
            />
          )}
          value={filterValue}
        />
      ) : (
        <TextField
          select={isSelectFilter || isMultiSelectFilter}
          {...commonTextFieldProps}
          SelectProps={{
            displayEmpty: true,
            multiple: isMultiSelectFilter,
            renderValue: isMultiSelectFilter
              ? (selected: any) =>
                  !selected?.length ? (
                    <Box sx={{ opacity: 0.5 }}>{filterPlaceholder}</Box>
                  ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                      {(selected as string[])?.map((value) => {
                        const selectedValue = dropdownOptions?.find(
                          (option) => getValueAndLabel(option).value === value,
                        );
                        return (
                          <Chip
                            key={value}
                            label={getValueAndLabel(selectedValue).label}
                          />
                        );
                      })}
                    </Box>
                  )
              : undefined,
            ...commonTextFieldProps.SelectProps,
          }}
          onChange={handleTextFieldChange}
          onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
          value={filterValue ?? ''}
        >
          {(isSelectFilter || isMultiSelectFilter) && [
            <MenuItem disabled divider hidden key="p" value="">
              <Box sx={{ opacity: 0.5 }}>{filterPlaceholder}</Box>
            </MenuItem>,
            ...[
              textFieldProps.children ??
                dropdownOptions?.map((option, index) => {
                  const { label, value } = getValueAndLabel(option);
                  return (
                    <MenuItem
                      key={`${index}-${value}`}
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        gap: '0.5rem',
                        m: 0,
                      }}
                      value={value}
                    >
                      {isMultiSelectFilter && (
                        <Checkbox
                          checked={(
                            (column.getFilterValue() ?? []) as string[]
                          ).includes(value)}
                          sx={{ mr: '0.5rem' }}
                        />
                      )}
                      {label}{' '}
                      {!columnDef.filterSelectOptions &&
                        `(${facetedUniqueValues.get(value)})`}
                    </MenuItem>
                  );
                }),
            ],
          ]}
        </TextField>
      )}
      <MRT_FilterOptionMenu
        anchorEl={anchorEl}
        header={header}
        setAnchorEl={setAnchorEl}
        setFilterValue={setFilterValue}
        table={table}
      />
    </>
  );
};
