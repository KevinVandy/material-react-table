import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_ExpandAllButton: FC<Props> = () => {
  const {
    anyRowsExpanded,
    icons: { DoubleArrowDownIcon },
    localization,
    tableInstance,
  } = useMRT();

  return (
    <IconButton
      aria-label={localization.expandAll}
      title={localization.expandAll}
    >
      <DoubleArrowDownIcon
        style={{
          transform: `rotate(${
            tableInstance.getIsAllRowsExpanded() ? -180 : anyRowsExpanded ? -90 : 0
          }deg)`,
          transition: 'transform 0.2s',
        }}
      />
    </IconButton>
  );
};
