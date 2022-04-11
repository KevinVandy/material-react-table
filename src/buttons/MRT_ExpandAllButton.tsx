import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_ExpandAllButton: FC<Props> = ({ tableInstance }) => {
  const {
    getIsAllRowsExpanded,
    getIsSomeRowsExpanded,
    getState,
    options: {
      icons: { DoubleArrowDownIcon },
      isLoading,
      localization,
    },
    toggleAllRowsExpanded,
  } = tableInstance;

  const { isDensePadding } = getState();

  return (
    <IconButton
      aria-label={localization.expandAll}
      disabled={isLoading}
      title={localization.expandAll}
      onClick={() => toggleAllRowsExpanded(!getIsAllRowsExpanded())}
      sx={{
        height: isDensePadding ? '1.75rem' : '2.25rem',
        width: isDensePadding ? '1.75rem' : '2.25rem',
      }}
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
