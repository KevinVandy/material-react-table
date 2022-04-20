import React, { FC, MouseEvent } from 'react';
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
      onToggleShowFilters,
    },
    setShowFilters,
  } = tableInstance;

  const { showFilters } = getState();

  const handleToggleShowFilters = (event: MouseEvent<HTMLButtonElement>) => {
    onToggleShowFilters?.({
      event,
      showFilters: !showFilters,
      tableInstance,
    });
    setShowFilters(!showFilters);
  };

  return (
    <Tooltip arrow title={localization.showHideFilters}>
      <IconButton
        aria-label={localization.showHideFilters}
        onClick={handleToggleShowFilters}
        size="small"
        {...rest}
      >
        {showFilters ? <FilterListOffIcon /> : <FilterListIcon />}
      </IconButton>
    </Tooltip>
  );
};
