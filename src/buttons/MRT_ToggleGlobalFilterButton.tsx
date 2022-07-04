import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  table: MRT_TableInstance;
}

export const MRT_ToggleGlobalFilterButton: FC<Props> = ({ table, ...rest }) => {
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
