import React, { ChangeEvent, FC, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/FilterList';
import { HeaderGroup, useAsyncDebounce } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  column: HeaderGroup;
}

export const MRT_FilterTextField: FC<Props> = ({ column }) => {
  const { localization } = useMaterialReactTable();

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
          <InputAdornment position="start">
            <FilterIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={localization?.filterTextFieldClearButtonTitle}
              disabled={filterValue?.length === 0}
              onClick={handleClear}
              size="small"
              title={localization?.filterTextFieldClearButtonTitle}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
