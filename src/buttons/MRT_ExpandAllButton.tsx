import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_ExpandAllButton: FC<Props> = () => {
  const {
    getIsSomeRowsExpanded,
    icons: { DoubleArrowDownIcon },
    localization,
    tableInstance: { getIsAllRowsExpanded },
  } = useMRT();

  return (
    <IconButton
      aria-label={localization.expandAll}
      title={localization.expandAll}
    >
      <DoubleArrowDownIcon
        style={{
          transform: `rotate(${
            getIsAllRowsExpanded() ? -180 : getIsSomeRowsExpanded() ? -90 : 0
          }deg)`,
          transition: 'transform 0.2s',
        }}
      />
    </IconButton>
  );
};
