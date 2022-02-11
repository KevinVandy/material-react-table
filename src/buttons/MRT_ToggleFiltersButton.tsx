import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

type Props = {};

export const MRT_ToggleFiltersButton: FC<Props> = () => {
  const { localization, setShowFilters, showFilters } = useMRT();

  return (
    <Tooltip arrow title={localization?.toggleFilterButtonTitle ?? ''}>
      <IconButton
        aria-label={localization?.toggleFilterButtonTitle}
        onClick={() => setShowFilters(!showFilters)}
        size="small"
      >
        {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
