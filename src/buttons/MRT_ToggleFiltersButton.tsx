import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  tableInstance: MRT_TableInstance;
}

export const MRT_ToggleFiltersButton: FC<Props> = ({
  tableInstance,
  ...rest
}) => {
  const {
    getState,
    options: {
      icons: { FilterListIcon, FilterListOffIcon },
      localization,
    },
    setShowFilters,
  } = tableInstance;

  const { showFilters } = getState();

  return (
    <Tooltip arrow title={localization.showHideFilters}>
      <IconButton
        aria-label={localization.showHideFilters}
        onClick={() => setShowFilters(!showFilters)}
        size="small"
        {...rest}
      >
        {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
