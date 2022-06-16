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
  instance: MRT_TableInstance;
}

export const MRT_SearchTextField: FC<Props> = ({ instance }) => {
  const {
    getState,
    setGlobalFilter,
    options: {
      icons: { SearchIcon, CloseIcon },
      tableId,
      localization,
      muiSearchTextFieldProps,
      onGlobalFilterValueChanged,
      onGlobalFilterValueChangedDebounced,
    },
  } = instance;

  const { globalFilter, showGlobalFilter } = getState();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState(globalFilter ?? '');

  const handleChangeDebounced = useCallback(
    debounce((event: ChangeEvent<HTMLInputElement>) => {
      setGlobalFilter(event.target.value ?? undefined);
      onGlobalFilterValueChangedDebounced?.({ event, instance });
    }, 250),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    handleChangeDebounced(event);
    onGlobalFilterValueChanged?.({ event, instance });
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
      ? muiSearchTextFieldProps({ instance })
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
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip arrow title={localization.changeSearchMode}>
                <span>
                  <IconButton
                    aria-label={localization.changeSearchMode}
                    onClick={handleGlobalFilterMenuOpen}
                    size="small"
                    sx={{ height: '1.75rem', width: '1.75rem' }}
                  >
                    <SearchIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={localization.clearSearch}
                disabled={searchValue?.length === 0}
                onClick={handleClear}
                size="small"
                title={localization.clearSearch}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
        sx={{ justifySelf: 'end', ...textFieldProps?.sx }}
      />
      <MRT_FilterOptionMenu
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        instance={instance}
      />
    </Collapse>
  );
};
