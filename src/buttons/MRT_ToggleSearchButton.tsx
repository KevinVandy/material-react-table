import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  tableInstance: MRT_TableInstance;
}

export const MRT_ToggleSearchButton: FC<Props> = ({
  tableInstance,
  ...rest
}) => {
  const {
    getState,
    options: {
      icons: { SearchIcon, SearchOffIcon },
      idPrefix,
      localization,
      muiSearchTextFieldProps,
    },
    setShowSearch,
  } = tableInstance;

  const { showSearch } = getState();

  const textFieldProps =
    muiSearchTextFieldProps instanceof Function
      ? muiSearchTextFieldProps({ tableInstance })
      : muiSearchTextFieldProps;

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    setTimeout(
      () =>
        document
          .getElementById(
            textFieldProps?.id ?? `mrt-${idPrefix}-search-text-field`,
          )
          ?.focus(),
      200,
    );
  };

  return (
    <Tooltip arrow title={localization.showHideSearch}>
      <IconButton size="small" onClick={handleToggleSearch} {...rest}>
        {showSearch ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};
