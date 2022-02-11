import React, { ChangeEvent, FC, useState } from 'react';
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/FilterList';
import { HeaderGroup, useAsyncDebounce } from 'react-table';
import { useMRT } from '../useMRT';

interface Props {
  column: HeaderGroup;
}

export const MRT_FilterTextField: FC<Props> = ({ column }) => {
  const { localization } = useMRT();

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
    <TextField
      fullWidth
      id={`filter-${column.id}-column`}
      inputProps={{
        style: {
          textOverflow: 'ellipsis',
        },
      }}
      margin="dense"
      placeholder={localization?.filterTextFieldPlaceholder?.replace(
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
          <Tooltip
            arrow
            title={
              localization?.filterTextFieldPlaceholder?.replace(
                '{column}',
                String(column.Header),
              ) ?? ''
            }
          >
            <InputAdornment position="start">
              <FilterIcon />
            </InputAdornment>
          </Tooltip>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip
              arrow
              title={localization?.filterTextFieldClearButtonTitle ?? ''}
            >
              <span>
                <IconButton
                  aria-label={localization?.filterTextFieldClearButtonTitle}
                  disabled={filterValue?.length === 0}
                  onClick={handleClear}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};
