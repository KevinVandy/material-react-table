import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import SearchIcon from '@mui/icons-material/Search';
import SearchOffIcon from '@mui/icons-material/SearchOff';

type Props = {};

export const MRT_ToggleSearchButton: FC<Props> = () => {
  const { localization, setShowSearch, showSearch } = useMaterialReactTable();

  return (
    <Tooltip arrow title={localization?.toggleSearchButtonTitle ?? ''}>
      <IconButton size="small" onClick={() => setShowSearch(!showSearch)}>
        {showSearch ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};
