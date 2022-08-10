import React from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends IconButtonProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleGlobalFilterButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { SearchIcon, SearchOffIcon },
      tableId,
      localization,
      muiSearchTextFieldProps,
    },
    setShowGlobalFilter,
  } = table;
  const { showGlobalFilter } = getState();

  const textFieldProps =
    muiSearchTextFieldProps instanceof Function
      ? muiSearchTextFieldProps({ table })
      : muiSearchTextFieldProps;

  const handleToggleSearch = () => {
    setShowGlobalFilter(!showGlobalFilter);
    setTimeout(
      () =>
        document
          .getElementById(
            textFieldProps?.id ?? `mrt-${tableId}-search-text-field`,
          )
          ?.focus(),
      200,
    );
  };

  return (
    <Tooltip arrow title={localization.showHideSearch}>
      <IconButton onClick={handleToggleSearch} {...rest}>
        {showGlobalFilter ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};
