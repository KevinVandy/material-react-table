import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterListOffIcon from '@mui/icons-material/FilterListOff';

type Props = {};

export const MRT_ToggleFiltersButton: FC<Props> = () => {
  const { localization, setShowFiltersInColumnHead, showFiltersInColumnHead } =
    useMaterialReactTable();

  return (
    <IconButton
      aria-label={localization?.toggleFilterButtonTitle}
      title={localization?.toggleFilterButtonTitle}
      onClick={() => setShowFiltersInColumnHead(!showFiltersInColumnHead)}
      size="small"
    >
      {showFiltersInColumnHead ? <FilterListOffIcon /> : <FilterListIcon />}
    </IconButton>
  );
};
