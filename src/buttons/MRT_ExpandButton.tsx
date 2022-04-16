import React, { FC, MouseEvent } from 'react';
import { IconButton } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  tableInstance: MRT_TableInstance;
}

export const MRT_ExpandButton: FC<Props> = ({ row, tableInstance }) => {
  const {
    getState,
    options: {
      icons: { ExpandMoreIcon },
      localization,
      onRowExpandChange,
      renderDetailPanel,
    },
  } = tableInstance;

  const { isDensePadding } = getState();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    row.toggleExpanded();
    onRowExpandChange?.({ event, row, tableInstance });
  };

  return (
    <IconButton
      aria-label={localization.expand}
      disabled={!row.getCanExpand() && !renderDetailPanel}
      title={localization.expand}
      onClick={handleToggleExpand}
      sx={{
        height: isDensePadding ? '1.75rem' : '2.25rem',
        width: isDensePadding ? '1.75rem' : '2.25rem',
      }}
    >
      <ExpandMoreIcon
        style={{
          transform: `rotate(${
            !row.getCanExpand() && !renderDetailPanel
              ? -90
              : row.getIsExpanded()
              ? -180
              : 0
          }deg)`,
          transition: 'transform 0.2s',
        }}
      />
    </IconButton>
  );
};
