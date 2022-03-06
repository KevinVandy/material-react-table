import React, { ChangeEvent, FC, useState } from 'react';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import { useAsyncDebounce } from 'react-table';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';

interface Props {
  column: MRT_HeaderGroup;
}

export const MRT_FilterTextField: FC<Props> = ({ column }) => {
  const {
    icons: { FilterListIcon, CloseIcon },
    idPrefix,
    localization,
    muiTableHeadCellFilterTextFieldProps,
  } = useMRT();

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
    style: {
      ...mTableHeadCellFilterTextFieldProps?.style,
      ...mcTableHeadCellFilterTextFieldProps?.style,
    },
  };

  const [filterValue, setFilterValue] = useState('');

  const handleChange = useAsyncDebounce((value) => {
    column.setFilter(value ?? undefined);
  }, 150);

  const handleClear = () => {
    setFilterValue('');
    column.setFilter(undefined);
  };

  if (column.Filter) {
    return <>{column.Filter?.({ column })}</>;
  }

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={localization.filterTextFieldPlaceholder?.replace(
        '{column}',
        String(column.Header),
      )}
    >
      <TextField
        fullWidth
        id={`mrt-${idPrefix}-${column.id}-filter-text-field`}
        inputProps={{
          sx: {
            textOverflow: 'ellipsis',
          },
        }}
        margin="dense"
        placeholder={localization.filterTextFieldPlaceholder?.replace(
          '{column}',
          String(column.Header),
        )}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setFilterValue(e.target.value);
          handleChange(e.target.value);
        }}
        onClick={(e) => e.stopPropagation()}
        value={filterValue ?? ''}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                size="small"
                sx={{ height: '1.75rem', width: '1.75rem' }}
              >
                <FilterListIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip
                arrow
                placement="right"
                title={localization.filterTextFieldClearButtonTitle ?? ''}
              >
                <span>
                  <IconButton
                    aria-label={localization.filterTextFieldClearButtonTitle}
                    disabled={filterValue?.length === 0}
                    onClick={handleClear}
                    size="small"
                    sx={{ height: '1.75rem', width: '1.75rem' }}
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
          minWidth: '6rem',
        }}
      />
    </Tooltip>
  );
};
