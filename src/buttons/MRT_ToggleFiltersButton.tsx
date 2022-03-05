import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_ToggleFiltersButton: FC<Props> = ({ ...rest }) => {
  const {
    icons: { FilterListIcon, FilterListOffIcon },
    localization,
    setShowFilters,
    tableInstance: {
      state: { showFilters },
    },
  } = useMRT();

  return (
    <Tooltip arrow title={localization.toggleFilterButtonTitle}>
      <IconButton
        aria-label={localization.toggleFilterButtonTitle}
        onClick={() => setShowFilters(!showFilters)}
        size="small"
        {...rest}
      >
        {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
