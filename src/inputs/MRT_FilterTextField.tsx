import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useState,
} from 'react';
import {
  Box,
  Checkbox,
  Chip,
  debounce,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  TextField,
  TextFieldProps,
  Tooltip,
} from '@mui/material';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  rangeFilterIndex?: number;
  table: MRT_TableInstance;
}

export const MRT_FilterTextField: FC<Props> = ({
  header,
  rangeFilterIndex,
  table,
}) => {
  const {
    getState,
    options: {
      enableColumnFilterChangeMode,
      columnFilterModeOptions,
      icons: { FilterListIcon, CloseIcon },
      localization,
      muiTableHeadCellFilterTextFieldProps,
    },
    refs: { filterInputRefs },
    setColumnFilterFns,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { columnFilterFns } = getState();

  const mTableHeadCellFilterTextFieldProps =
    muiTableHeadCellFilterTextFieldProps instanceof Function
      ? muiTableHeadCellFilterTextFieldProps({
          column,
          table,
          rangeFilterIndex,
        })
      : muiTableHeadCellFilterTextFieldProps;

  const mcTableHeadCellFilterTextFieldProps =
    columnDef.muiTableHeadCellFilterTextFieldProps instanceof Function
      ? columnDef.muiTableHeadCellFilterTextFieldProps({
          column,
          table,
          rangeFilterIndex,
        })
      : columnDef.muiTableHeadCellFilterTextFieldProps;

  const textFieldProps = {
    ...mTableHeadCellFilterTextFieldProps,
    ...mcTableHeadCellFilterTextFieldProps,
  } as TextFieldProps;

  const isRangeFilter =
    columnDef.filterVariant === 'range' || rangeFilterIndex !== undefined;
  const isSelectFilter = columnDef.filterVariant === 'select';
  const isMultiSelectFilter = columnDef.filterVariant === 'multi-select';
  const isTextboxFilter =
    columnDef.filterVariant === 'text' ||
    (!isSelectFilter && !isMultiSelectFilter);

  const currentFilterOption = columnFilterFns?.[header.id];
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
    ? localization.filterByColumn?.replace('{column}', String(columnDef.header))
    : rangeFilterIndex === 0
    ? localization.min
    : rangeFilterIndex === 1
    ? localization.max
    : '';
  const allowedColumnFilterOptions =
    columnDef?.columnFilterModeOptions ?? columnFilterModeOptions;
  const showChangeModeButton =
    enableColumnFilterChangeMode &&
    columnDef.enableColumnFilterChangeMode !== false &&
    !rangeFilterIndex &&
    (allowedColumnFilterOptions === undefined ||
      !!allowedColumnFilterOptions?.length);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterValue, setFilterValue] = useState<string | string[]>(() =>
    isMultiSelectFilter
      ? (column.getFilterValue() as string[]) || []
      : isRangeFilter
      ? (column.getFilterValue() as [string, string])?.[
          rangeFilterIndex as number
        ] || []
      : (column.getFilterValue() as string) ?? '',
  );

  const handleChangeDebounced = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) => {
        let value =
          textFieldProps.type === 'date'
            ? new Date(event.target.value)
            : event.target.value;
        if (isRangeFilter) {
          column.setFilterValue((old: [string, string | Date]) => {
            const newFilterValues = old ?? ['', ''];
            newFilterValues[rangeFilterIndex as number] = value;
            return newFilterValues;
          });
        } else {
          column.setFilterValue(value ?? undefined);
        }
      },
      isTextboxFilter ? 200 : 1,
    ),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    handleChangeDebounced(event);
  };

  const handleClear = () => {
    if (isMultiSelectFilter) {
      setFilterValue([]);
      column.setFilterValue([]);
    } else if (isRangeFilter) {
      setFilterValue('');
      column.setFilterValue((old: [string | undefined, string | undefined]) => {
        const newFilterValues = old ?? ['', ''];
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
      [header.id]: 'fuzzy',
    }));
  };

  const handleFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  if (columnDef.Filter) {
    return <>{columnDef.Filter?.({ column, header, table })}</>;
  }

  return (
    <>
      <TextField
        fullWidth
        inputProps={{
          disabled: !!filterChipLabel,
          sx: {
            textOverflow: 'ellipsis',
            width: filterChipLabel ? 0 : undefined,
          },
          title: filterPlaceholder,
        }}
        helperText={
          showChangeModeButton ? (
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
          ) : null
        }
        FormHelperTextProps={{
          sx: {
            fontSize: '0.6rem',
            lineHeight: '0.8rem',
            whiteSpace: 'nowrap',
          },
        }}
        margin="none"
        placeholder={
          filterChipLabel || isSelectFilter || isMultiSelectFilter
            ? undefined
            : filterPlaceholder
        }
        onChange={handleChange}
        onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
        select={isSelectFilter || isMultiSelectFilter}
        value={filterValue}
        variant="standard"
        InputProps={{
          startAdornment: showChangeModeButton ? (
            <InputAdornment position="start">
              <Tooltip arrow title={localization.changeFilterMode}>
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
                <Chip
                  onDelete={handleClearEmptyFilterChip}
                  label={filterChipLabel}
                />
              )}
            </InputAdornment>
          ) : (
            <FilterListIcon style={{ marginRight: '4px' }} />
          ),
          endAdornment: !filterChipLabel && (
            <InputAdornment position="end">
              <Tooltip
                arrow
                placement="right"
                title={localization.clearFilter ?? ''}
              >
                <span>
                  <IconButton
                    aria-label={localization.clearFilter}
                    disabled={!filterValue?.length}
                    onClick={handleClear}
                    size="small"
                    sx={{
                      height: '1.75rem',
                      width: '1.75rem',
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        SelectProps={{
          displayEmpty: true,
          multiple: isMultiSelectFilter,
          renderValue: isMultiSelectFilter
            ? (selected: any) =>
                !selected?.length ? (
                  <Box sx={{ opacity: 0.5 }}>{filterPlaceholder}</Box>
                ) : (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                    {(selected as string[])?.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )
            : undefined,
        }}
        {...textFieldProps}
        inputRef={(inputRef) => {
          filterInputRefs.current[`${column.id}-${rangeFilterIndex ?? 0}`] =
            inputRef;
          if (textFieldProps.inputRef) {
            textFieldProps.inputRef = inputRef;
          }
        }}
        sx={(theme) => ({
          p: 0,
          minWidth: !filterChipLabel ? '150px' : 'auto',
          width: '100%',
          '&	.MuiSelect-icon': {
            mr: '1.5rem',
          },
          ...(textFieldProps?.sx instanceof Function
            ? textFieldProps.sx(theme)
            : (textFieldProps?.sx as any)),
        })}
      >
        {(isSelectFilter || isMultiSelectFilter) && (
          <MenuItem divider disabled hidden value="">
            <Box sx={{ opacity: 0.5 }}>{filterPlaceholder}</Box>
          </MenuItem>
        )}
        {columnDef?.filterSelectOptions?.map(
          (option: string | { text: string; value: string }) => {
            let value: string;
            let text: string;
            if (typeof option !== 'object') {
              value = option;
              text = option;
            } else {
              value = option.value;
              text = option.text;
            }
            return (
              <MenuItem key={value} value={value}>
                {isMultiSelectFilter && (
                  <Checkbox
                    checked={(
                      (column.getFilterValue() ?? []) as string[]
                    ).includes(value)}
                    sx={{ mr: '0.5rem' }}
                  />
                )}
                <ListItemText>{text}</ListItemText>
              </MenuItem>
            );
          },
        )}
      </TextField>
      <MRT_FilterOptionMenu
        anchorEl={anchorEl}
        header={header}
        setAnchorEl={setAnchorEl}
        table={table}
      />
    </>
  );
};
