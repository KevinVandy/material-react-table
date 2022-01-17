import React, { ChangeEvent, FC, useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/FilterList';
import { HeaderGroup, useAsyncDebounce } from 'react-table';

interface Props {
  column: HeaderGroup;
}

export const MRT_FilterTextfield: FC<Props> = ({ column }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleChange = useAsyncDebounce((value) => {
    column.setFilter(value ?? undefined);
  }, 150);

  const handleClear = () => {
    setFilterValue('');
    column.setFilter(undefined);
  };

  return (
    <TextField
      margin="dense"
      placeholder="Filter"
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
            <IconButton onClick={handleClear} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
