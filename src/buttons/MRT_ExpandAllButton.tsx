import React, { FC, useMemo } from 'react';
import { IconButton } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_ExpandAllButton: FC<Props> = () => {
  const {
    icons: { DoubleArrowDownIcon },
    localization,
    tableInstance: { getState, getIsAllRowsExpanded, toggleAllRowsExpanded },
  } = useMRT();

  const getIsSomeRowsExpanded = useMemo(
    () =>
      getState().expanded === true ||
      Object.values(getState().expanded).some(Boolean),
    [getState().expanded],
  );

  return (
    <IconButton
      aria-label={localization.expandAll}
      title={localization.expandAll}
      onClick={() => toggleAllRowsExpanded(!getIsAllRowsExpanded())}
    >
      <DoubleArrowDownIcon
        style={{
          transform: `rotate(${
            getIsAllRowsExpanded() ? -180 : getIsSomeRowsExpanded ? -90 : 0
          }deg)`,
          transition: 'transform 0.2s',
        }}
      />
    </IconButton>
  );
};
