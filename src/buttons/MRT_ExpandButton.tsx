import React, { FC, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  instance: MRT_TableInstance;
}

export const MRT_ExpandButton: FC<Props> = ({ row, instance }) => {
  const {
    getState,
    options: {
      icons: { ExpandMoreIcon },
      localization,
      onExpandChanged,
      renderDetailPanel,
    },
  } = instance;

  const { isDensePadding } = getState();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    row.toggleExpanded();
    onExpandChanged?.({ event, row, instance });
  };

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={localization.expand}
    >
      <IconButton
        aria-label={localization.expand}
        disabled={!row.getCanExpand() && !renderDetailPanel}
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
    </Tooltip>
  );
};
