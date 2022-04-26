import React, { FC } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import type { MRT_Column, MRT_TableInstance } from '..';

interface Props {
  column: MRT_Column;
  tableInstance: MRT_TableInstance;
}

export const MRT_ColumnPinningButtons: FC<Props> = ({
  column,
  tableInstance,
}) => {
  const {
    getState,
    options: {
      icons: { PushPinIcon },
      localization,
    },
  } = tableInstance;

  const { columnOrder } = getState();

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
    if (column.columnDefType === 'display') {
      tableInstance.setColumnOrder([column.id, ...columnOrder]);
    }
  };

  const pinned = column.getIsPinned();

  return (
    <Box sx={{ mr: '8px' }}>
      <Tooltip
        arrow
        title={pinned === 'left' ? localization.unpin : localization.pinToLeft}
      >
        <IconButton
          onClick={() => handlePinColumn(pinned === 'left' ? false : 'left')}
          size="small"
        >
          <PushPinIcon
            style={{
              transform: pinned === 'left' ? 'rotate(0)' : 'rotate(90deg)',
            }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        arrow
        title={
          pinned === 'right' ? localization.unpin : localization.pinToRight
        }
      >
        <IconButton
          onClick={() => handlePinColumn(pinned === 'right' ? false : 'right')}
          size="small"
        >
          <PushPinIcon
            style={{
              transform: pinned === 'right' ? 'rotate(0)' : 'rotate(-90deg)',
            }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
