import {
  type ChangeEvent,
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { debounce } from '@mui/material/utils';
import { parseFromValuesOrFunc } from '../column.utils';
import { MRT_FilterOptionMenu } from '../menus/MRT_FilterOptionMenu';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_GlobalFilterTextField = <TData extends Record<string, any>>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableGlobalFilterModes,
      icons: { CloseIcon, SearchIcon },
      localization,
      manualFiltering,
      muiSearchTextFieldProps,
    },
    refs: { searchInputRef },
    setGlobalFilter,
  } = table;
  const { globalFilter, showGlobalFilter } = getState();

  const textFieldProps = parseFromValuesOrFunc(muiSearchTextFieldProps, {
    table,
  });

  const isMounted = useRef(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [searchValue, setSearchValue] = useState(globalFilter ?? '');

  const handleChangeDebounced = useCallback(
    debounce(
      (event: ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(event.target.value ?? undefined);
      },
      manualFiltering ? 500 : 250,
    ),
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

  useEffect(() => {
    if (isMounted.current) {
      if (globalFilter === undefined) {
        handleClear();
      } else {
        setSearchValue(globalFilter);
      }
    }
    isMounted.current = true;
  }, [globalFilter]);

  return (
    <Collapse
      in={showGlobalFilter}
      mountOnEnter
      orientation="horizontal"
      unmountOnExit
    >
      <TextField
        InputProps={{
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
          startAdornment: enableGlobalFilterModes ? (
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
            <SearchIcon style={{ marginRight: '4px' }} />
          ),
        }}
        onChange={handleChange}
        placeholder={localization.search}
        value={searchValue ?? ''}
        variant="standard"
        {...textFieldProps}
        inputRef={(inputRef) => {
          searchInputRef.current = inputRef;
          if (textFieldProps?.inputRef) {
            textFieldProps.inputRef = inputRef;
          }
        }}
      />
      <MRT_FilterOptionMenu
        anchorEl={anchorEl}
        onSelect={handleClear}
        setAnchorEl={setAnchorEl}
        table={table}
      />
    </Collapse>
  );
};
