import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_ToggleFiltersButton: FC<Props> = ({ ...rest }) => {
  const {
    icons: { FilterListIcon, FilterListOffIcon },
    localization,
    setShowFilters,
    tableInstance: { getState },
  } = useMRT();

  return (
    <Tooltip arrow title={localization.showHideFilters}>
      <IconButton
        aria-label={localization.showHideFilters}
        onClick={() => setShowFilters(!getState().showFilters)}
        size="small"
        {...rest}
      >
        {getState().showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
