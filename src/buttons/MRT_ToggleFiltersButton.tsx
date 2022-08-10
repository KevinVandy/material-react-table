import React from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}>
  extends IconButtonProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToggleFiltersButton = <
  TData extends Record<string, any> = {},
>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    options: {
      icons: { FilterListIcon, FilterListOffIcon },
      localization,
    },
    setShowFilters,
  } = table;
  const { showColumnFilters } = getState();

  const handleToggleShowFilters = () => {
    setShowFilters(!showColumnFilters);
  };

  return (
    <Tooltip arrow title={localization.showHideFilters}>
      <IconButton
        aria-label={localization.showHideFilters}
        onClick={handleToggleShowFilters}
        {...rest}
      >
        {showColumnFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
