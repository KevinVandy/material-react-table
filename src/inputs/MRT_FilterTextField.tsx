import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useState,
} from 'react';
import {
  Chip,
  debounce,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  TextFieldProps,
  Tooltip,
} from '@mui/material';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  inputIndex?: number;
  table: MRT_TableInstance;
}

export const MRT_FilterTextField: FC<Props> = ({
  header,
  inputIndex,
  table,
}) => {
  const {
    getState,
    options: {
      enableColumnFilterChangeMode,
      enabledColumnFilterOptions,
      icons: { FilterListIcon, CloseIcon },
      localization,
      muiTableHeadCellFilterTextFieldProps,
      tableId,
    },
    setCurrentFilterFns,
  } = table;
  const { column } = header;
  const { columnDef } = column;
  const { currentFilterFns } = getState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const mTableHeadCellFilterTextFieldProps =
    muiTableHeadCellFilterTextFieldProps instanceof Function
      ? muiTableHeadCellFilterTextFieldProps({ column, table })
      : muiTableHeadCellFilterTextFieldProps;

  const mcTableHeadCellFilterTextFieldProps =
    columnDef.muiTableHeadCellFilterTextFieldProps instanceof Function
      ? columnDef.muiTableHeadCellFilterTextFieldProps({
          column,
          table,
        })
      : columnDef.muiTableHeadCellFilterTextFieldProps;

  const textFieldProps = {
    ...mTableHeadCellFilterTextFieldProps,
    ...mcTableHeadCellFilterTextFieldProps,
  } as TextFieldProps;

  const [filterValue, setFilterValue] = useState<string>(() =>
    inputIndex !== undefined
      ? (column.getFilterValue() as [string, string])?.[inputIndex] ?? ''
      : (column.getFilterValue() as string) ?? '',
  );

  const handleChangeDebounced = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      let value = textFieldProps.type === 'date' ? new Date(event.target.value) : event.target.value
      if (inputIndex !== undefined) {
        column.setFilterValue((old: [string, string | Date]) => {
          const newFilterValues = old ?? ['', ''];
          newFilterValues[inputIndex] = value;
          return newFilterValues;
        });
      } else {
        column.setFilterValue(value ?? undefined);
      }
    }, 200),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    handleChangeDebounced(event);
  };

  const handleFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClear = () => {
    setFilterValue('');
    if (inputIndex !== undefined) {
      column.setFilterValue((old: [string | undefined, string | undefined]) => {
        const newFilterValues = old ?? ['', ''];
        newFilterValues[inputIndex] = undefined;
        return newFilterValues;
      });
    } else {
      column.setFilterValue(undefined);
    }
  };

  const handleClearFilterChip = () => {
    setFilterValue('');
    column.setFilterValue(undefined);
    setCurrentFilterFns((prev) => ({
      ...prev,
      [header.id]: 'fuzzy',
    }));
  };

  if (columnDef.Filter) {
    return <>{columnDef.Filter?.({ header, table })}</>;
  }

  const filterId = `mrt-${tableId}-${header.id}-filter-text-field${
    inputIndex ?? ''
  }`;
  const currentFilterOption = currentFilterFns?.[header.id];
  const isSelectFilter = !!columnDef.filterSelectOptions;
  const filterChipLabel = ['empty', 'notEmpty'].includes(currentFilterOption)
    ? //@ts-ignore
      localization[
        `filter${
          currentFilterOption.charAt(0).toUpperCase() +
          currentFilterOption.slice(1)
        }`
      ]
    : '';
  const filterPlaceholder =
    inputIndex === undefined
      ? localization.filterByColumn?.replace(
          '{column}',
          String(columnDef.header),
        )
      : inputIndex === 0
      ? localization.min
      : inputIndex === 1
      ? localization.max
      : '';

  const allowedColumnFilterOptions =
    columnDef?.enabledColumnFilterOptions ?? enabledColumnFilterOptions;

  const showChangeModeButton =
    enableColumnFilterChangeMode &&
    columnDef.enableColumnFilterChangeMode !== false &&
    !isSelectFilter &&
    !inputIndex &&
    (allowedColumnFilterOptions === undefined ||
      !!allowedColumnFilterOptions?.length);

  return (
    <>
      <TextField
        fullWidth
        id={filterId}
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
            <label htmlFor={filterId}>
              {localization.filterMode.replace(
                '{filterType}',
                // @ts-ignore
                localization[
                  `filter${
                    currentFilterOption.charAt(0).toUpperCase() +
                    currentFilterOption.slice(1)
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
          filterChipLabel || isSelectFilter ? undefined : filterPlaceholder
        }
        onChange={handleChange}
        onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
        select={isSelectFilter}
        value={filterValue ?? ''}
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
                  onDelete={handleClearFilterChip}
                  label={filterChipLabel}
                />
              )}
            </InputAdornment>
          ) : (
            <FilterListIcon />
          ),
          endAdornment: !filterChipLabel && (
            <InputAdornment position="end">
              <Tooltip
                arrow
                disableHoverListener={isSelectFilter}
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
        {...textFieldProps}
        sx={{
          m: '-0.25rem',
          p: 0,
          minWidth: !filterChipLabel ? '8rem' : 'auto',
          width: 'calc(100% + 0.5rem)',
          '&	.MuiSelect-icon': {
            mr: '1.5rem',
          },
          ...textFieldProps?.sx,
        }}
      >
        {isSelectFilter && (
          <MenuItem divider disabled={!filterValue} value="">
            {localization.clearFilter}
          </MenuItem>
        )}
        {columnDef?.filterSelectOptions?.map((option) => {
          let value;
          let text;
          if (typeof option === 'string') {
            value = option;
            text = option;
          } else if (typeof option === 'object') {
            value = option.value;
            text = option.text;
          }
          return (
            <MenuItem key={value} value={value}>
              {text}
            </MenuItem>
          );
        })}
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
