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
import type { MRT_Header, MRT_TableInstance } from '..';
import { MRT_FilterTypeMenu } from '../menus/MRT_FilterTypeMenu';
import { MRT_FILTER_TYPE } from '../enums';

interface Props {
  header: MRT_Header;
  tableInstance: MRT_TableInstance;
}

export const MRT_FilterTextField: FC<Props> = ({ header, tableInstance }) => {
  const {
    getState,
    options: {
      icons: { FilterListIcon, CloseIcon },
      idPrefix,
      localization,
      muiTableHeadCellFilterTextFieldProps,
      setCurrentFilterTypes,
    },
  } = tableInstance;

  const { column } = header;

  const { currentFilterTypes } = getState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const mTableHeadCellFilterTextFieldProps =
    muiTableHeadCellFilterTextFieldProps instanceof Function
      ? muiTableHeadCellFilterTextFieldProps(column)
      : muiTableHeadCellFilterTextFieldProps;

  const mcTableHeadCellFilterTextFieldProps =
    column.muiTableHeadCellFilterTextFieldProps instanceof Function
      ? column.muiTableHeadCellFilterTextFieldProps(column)
      : column.muiTableHeadCellFilterTextFieldProps;

  const textFieldProps = {
    ...mTableHeadCellFilterTextFieldProps,
    ...mcTableHeadCellFilterTextFieldProps,
  } as TextFieldProps;

  const [filterValue, setFilterValue] = useState<string>(
    (column.getColumnFilterValue() ?? '') as string,
  );

  const handleChange = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) =>
        column.setColumnFilterValue(event.target.value ?? undefined),
      150,
    ),
    [],
  );

  const handleFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClear = () => {
    setFilterValue('');
    column.setColumnFilterValue(undefined);
  };

  const handleClearFilterChip = () => {
    setFilterValue('');
    column.setColumnFilterValue(undefined);
    setCurrentFilterTypes((prev) => ({
      ...prev,
      [header.id]: MRT_FILTER_TYPE.BEST_MATCH,
    }));
  };

  if (column.Filter) {
    return <>{column.Filter?.({ header, tableInstance })}</>;
  }

  const filterId = `mrt-${idPrefix}-${header.id}-filter-text-field`;
  const filterType = currentFilterTypes?.[header.id];
  const isSelectFilter = !!column.filterSelectOptions;
  const filterChipLabel = '';
  !(filterType instanceof Function) &&
  [MRT_FILTER_TYPE.EMPTY, MRT_FILTER_TYPE.NOT_EMPTY].includes(
    filterType as MRT_FILTER_TYPE,
  )
    ? //@ts-ignore
      localization[
        `filter${filterType.charAt(0).toUpperCase() + filterType.slice(1)}`
      ]
    : '';
  const filterPlaceholder = localization.filterByColumn?.replace(
    '{column}',
    String(column.header),
  );

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
          <label htmlFor={filterId}>
            {filterType instanceof Function
              ? localization.filterMode.replace(
                  '{filterType}',
                  // @ts-ignore
                  localization[
                    `filter${
                      filterType.name.charAt(0).toUpperCase() +
                      filterType.name.slice(1)
                    }`
                  ] ?? '',
                ) ?? ''
              : localization.filterMode.replace(
                  '{filterType}',
                  // @ts-ignore
                  localization[
                    `filter${
                      filterType.charAt(0).toUpperCase() + filterType.slice(1)
                    }`
                  ],
                )}
          </label>
        }
        FormHelperTextProps={{
          sx: { fontSize: '0.6rem', lineHeight: '0.8rem' },
        }}
        label={isSelectFilter && !filterValue ? filterPlaceholder : undefined}
        margin="none"
        placeholder={
          filterPlaceholder
          // filterChipLabel || isSelectFilter ? undefined : filterPlaceholder
        }
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setFilterValue(event.target.value);
          handleChange(event);
        }}
        onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
        select={isSelectFilter}
        value={filterValue ?? ''}
        variant="standard"
        InputProps={{
          startAdornment: !isSelectFilter && (
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
                    <CloseIcon fontSize="small" />
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
          minWidth: !filterChipLabel ? '5rem' : 'auto',
          width: 'calc(100% + 0.5rem)',
          mt: isSelectFilter && !filterValue ? '-1rem' : undefined,
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
        {column?.filterSelectOptions?.map((option) => {
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
      <MRT_FilterTypeMenu
        anchorEl={anchorEl}
        header={header}
        setAnchorEl={setAnchorEl}
        tableInstance={tableInstance}
      />
    </>
  );
};
