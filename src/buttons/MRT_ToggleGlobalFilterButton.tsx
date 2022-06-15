import React, { FC, MouseEvent } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  instance: MRT_TableInstance;
}

export const MRT_ToggleGlobalFilterButton: FC<Props> = ({
  instance,
  ...rest
}) => {
  const {
    getState,
    options: {
      icons: { SearchIcon, SearchOffIcon },
      tableId,
      localization,
      muiSearchTextFieldProps,
      onHandleToggleShowGlobalFilter,
    },
    setShowGlobalFilter,
  } = instance;

  const { showGlobalFilter } = getState();

  const textFieldProps =
    muiSearchTextFieldProps instanceof Function
      ? muiSearchTextFieldProps({ instance })
      : muiSearchTextFieldProps;

  const handleToggleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    onHandleToggleShowGlobalFilter?.({
      event,
      showGlobalFilter: !showGlobalFilter,
      instance,
    });
    setShowGlobalFilter(!showGlobalFilter);
    setTimeout(
      () =>
        document
          .getElementById(
            textFieldProps?.id ?? `mrt-${tableId}-search-text-field`,
          )
          ?.focus(),
      200,
    );
  };

  return (
    <Tooltip arrow title={localization.showHideSearch}>
      <IconButton onClick={handleToggleSearch} {...rest}>
        {showGlobalFilter ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};
