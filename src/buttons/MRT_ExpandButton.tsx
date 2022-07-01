import React, { FC } from 'react';
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
      muiExpandButtonProps,
      renderDetailPanel,
    },
  } = instance;

  const { density } = getState();

  const iconButtonProps =
    muiExpandButtonProps instanceof Function
      ? muiExpandButtonProps({ instance, row })
      : muiExpandButtonProps;

  const handleToggleExpand = () => {
    row.toggleExpanded();
  };

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={localization.expand}
    >
      <span>
        <IconButton
          aria-label={localization.expand}
          disabled={!row.getCanExpand() && !renderDetailPanel}
          onClick={handleToggleExpand}
          {...iconButtonProps}
          sx={{
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            ...iconButtonProps?.sx,
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
      </span>
    </Tooltip>
  );
};
