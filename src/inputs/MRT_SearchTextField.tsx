import React, { ChangeEvent, FC, useState } from 'react';
import {
  Collapse,
  IconButton,
  InputAdornment,
  styled,
  TextField as MuiTextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useMRT } from '../useMRT';
import { useAsyncDebounce } from 'react-table';

const TextField = styled(MuiTextField)({
  justifySelf: 'end',
});

interface Props {}

export const MRT_SearchTextField: FC<Props> = () => {
  const {
    showSearch,
    localization,
    muiSearchTextFieldProps,
    onGlobalFilterChange,
    tableInstance,
  } = useMRT();

  const [searchValue, setSearchValue] = useState('');

  const handleChange = useAsyncDebounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      tableInstance.setGlobalFilter(event.target.value ?? undefined);
      onGlobalFilterChange?.(event);
    },
    200,
  );

  const handleClear = () => {
    setSearchValue('');
    tableInstance.setGlobalFilter(undefined);
  };

  return (
    <Collapse in={showSearch} orientation="horizontal">
      <TextField
        id="global-search-text-field"
        placeholder={localization?.searchTextFieldPlaceholder}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setSearchValue(event.target.value);
          handleChange(event);
        }}
        value={searchValue ?? ''}
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={localization?.searchTextFieldClearButtonTitle}
                disabled={searchValue?.length === 0}
                onClick={handleClear}
                size="small"
                title={localization?.searchTextFieldClearButtonTitle}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...muiSearchTextFieldProps}
      />
    </Collapse>
  );
};
