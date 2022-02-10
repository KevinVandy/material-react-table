import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

type Props = {};

export const MRT_ToggleSearchButton: FC<Props> = () => {
  const { localization, setShowSearch, showSearch, muiSearchTextFieldProps } =
    useMaterialReactTable();

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    setTimeout(
      () =>
        document.getElementById(muiSearchTextFieldProps?.id ?? `global-search-text-field`)?.focus(),
      200,
    );
  };

  return (
    <Tooltip arrow title={localization?.toggleSearchButtonTitle ?? ''}>
      <IconButton size="small" onClick={handleToggleSearch}>
        {showSearch ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};
