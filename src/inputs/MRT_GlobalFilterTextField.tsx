import React, {
  ChangeEvent,
  FC,
  MouseEvent,
  useCallback,
  useState,
} from 'react';
import {
  Collapse,
  debounce,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from '@mui/material';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_GlobalFilterTextField: FC<Props> = ({ table }) => {
  const {
    getState,
    setGlobalFilter,
    options: {
      enableGlobalFilterChangeMode,
      icons: { SearchIcon, CloseIcon },
      localization,
      muiSearchTextFieldProps,
      tableId,
    },
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState(globalFilter ?? '');

  const handleChangeDebounced = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setGlobalFilter(event.target.value ?? undefined);
    }, 250),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleChangeDebounced(event);
  };

  const handleGlobalFilterMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClear = () => {
    setSearchValue('');
    setGlobalFilter(undefined);
  };

  const textFieldProps =
    muiSearchTextFieldProps instanceof Function
      ? muiSearchTextFieldProps({ table })
      : muiSearchTextFieldProps;

  return (
    <Collapse in={showGlobalFilter} orientation="horizontal">
      <TextField
        id={`mrt-${tableId}-search-text-field`}
        placeholder={localization.search}
        onChange={handleChange}
        value={searchValue ?? ''}
        variant="standard"
        InputProps={{
          startAdornment: enableGlobalFilterChangeMode ? (
            <InputAdornment position="start">
              <Tooltip arrow title={localization.changeSearchMode}>
                <IconButton
                  aria-label={localization.changeSearchMode}
                  onClick={handleGlobalFilterMenuOpen}
                  size="small"
                  sx={{ height: '1.75rem', width: '1.75rem' }}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ) : (
            <SearchIcon />
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip arrow title={localization.clearSearch ?? ''}>
                <span>
                  <IconButton
                    aria-label={localization.clearSearch}
                    disabled={!searchValue?.length}
                    onClick={handleClear}
                    size="small"
                  >
                    <CloseIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
      />
      <MRT_FilterOptionMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        table={table}
      />
    </Collapse>
  );
};
