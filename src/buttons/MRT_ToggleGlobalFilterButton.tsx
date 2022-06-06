import React, { FC, MouseEvent } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props extends IconButtonProps {
  tableInstance: MRT_TableInstance;
}

export const MRT_ToggleGlobalFilterButton: FC<Props> = ({
  tableInstance,
  ...rest
}) => {
  const {
    getState,
    options: {
      icons: { SearchIcon, SearchOffIcon },
      tableId,
      localization,
      muiSearchTextFieldProps,
      onMrtToggleShowGlobalFilter,
    },
    setShowGlobalFilter,
  } = tableInstance;

  const { showGlobalFilter } = getState();

  const textFieldProps =
    muiSearchTextFieldProps instanceof Function
      ? muiSearchTextFieldProps({ tableInstance })
      : muiSearchTextFieldProps;

  const handleToggleSearch = (event: MouseEvent<HTMLButtonElement>) => {
    onMrtToggleShowGlobalFilter?.({
      event,
      showGlobalFilter: !showGlobalFilter,
      tableInstance,
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
