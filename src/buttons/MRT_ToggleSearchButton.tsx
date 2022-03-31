import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_ToggleSearchButton: FC<Props> = ({ ...rest }) => {
  const {
    icons: { SearchIcon, SearchOffIcon },
    idPrefix,
    localization,
    muiSearchTextFieldProps,
    setShowSearch,
    tableInstance: { getState },
  } = useMRT();

  const { showSearch } = getState();

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    setTimeout(
      () =>
        document
          .getElementById(
            muiSearchTextFieldProps?.id ?? `mrt-${idPrefix}-search-text-field`,
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
