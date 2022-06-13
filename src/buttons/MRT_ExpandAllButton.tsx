import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  instance: MRT_TableInstance;
}

export const MRT_ExpandAllButton: FC<Props> = ({ instance }) => {
  const {
    getIsAllRowsExpanded,
    getIsSomeRowsExpanded,
    getCanSomeRowsExpand,
    getState,
    options: {
      icons: { KeyboardDoubleArrowDownIcon },
      localization,
      renderDetailPanel,
    },
    toggleAllRowsExpanded,
  } = instance;

  const { isDensePadding } = getState();

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={localization.expandAll}
    >
      <IconButton
        aria-label={localization.expandAll}
        disabled={!getCanSomeRowsExpand() && !renderDetailPanel}
        onClick={() => toggleAllRowsExpanded(!getIsAllRowsExpanded())}
        sx={{
          height: isDensePadding ? '1.75rem' : '2.25rem',
          width: isDensePadding ? '1.75rem' : '2.25rem',
        }}
      >
        <KeyboardDoubleArrowDownIcon
          style={{
            transform: `rotate(${
              getIsAllRowsExpanded() ? -180 : getIsSomeRowsExpanded() ? -90 : 0
            }deg)`,
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </Tooltip>
  );
};
