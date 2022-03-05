import React, { FC } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props extends IconButtonProps {}

export const MRT_ToggleSearchButton: FC<Props> = ({ ...rest }) => {
  const {
    icons: { SearchIcon, SearchOffIcon },
    idPrefix,
    localization,
    muiSearchTextFieldProps,
    setShowSearch,
    tableInstance: {
      state: { showSearch },
    },
  } = useMRT();

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
    setTimeout(
      () =>
        document
          .getElementById(
            muiSearchTextFieldProps?.id ?? `mrt-${idPrefix}-search-text-field`,
          )
          ?.focus(),
      200,
    );
  };

  return (
    <Tooltip arrow title={localization.toggleSearchButtonTitle}>
      <IconButton size="small" onClick={handleToggleSearch} {...rest}>
        {showSearch ? <SearchOffIcon /> : <SearchIcon />}
      </IconButton>
    </Tooltip>
  );
};
