import React, { FC, MouseEvent } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  instance: MRT_TableInstance;
}

export const MRT_ToggleFiltersButton: FC<Props> = ({ instance, ...rest }) => {
  const {
    getState,
    options: {
      icons: { FilterListIcon, FilterListOffIcon },
      localization,
      onHandleToggleShowFilters,
    },
    setShowFilters,
  } = instance;

  const { showFilters } = getState();

  const handleToggleShowFilters = (event: MouseEvent<HTMLButtonElement>) => {
    onHandleToggleShowFilters?.({
      event,
      showFilters: !showFilters,
      instance,
    });
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
