import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  table: MRT_TableInstance;
}

export const MRT_ToggleFiltersButton: FC<Props> = ({ table, ...rest }) => {
  const {
    getState,
    options: {
      icons: { FilterListIcon, FilterListOffIcon },
      localization,
    },
    setShowFilters,
  } = table;
  const { showFilters } = getState();

  const handleToggleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <Tooltip arrow title={localization.showHideFilters}>
      <IconButton
        aria-label={localization.showHideFilters}
        onClick={handleToggleShowFilters}
        {...rest}
      >
        {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
