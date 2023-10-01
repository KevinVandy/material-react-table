import { useState, type MouseEvent } from 'react';
import { type RowPinningPosition } from '@tanstack/react-table';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
  pinningPosition: RowPinningPosition;
}

export const MRT_RowPinButton = <TData extends Record<string, any>>({
  row,
  table,
  pinningPosition,
}: Props<TData>) => {
  const {
    options: {
      icons: { PushPinIcon, CloseIcon },
      localization,
      rowPinningDisplayMode,
    },
  } = table;

  const isPinned = row.getIsPinned();

  const [tooltipOpened, setTooltipOpened] = useState(false);

  const handleTogglePin = (event: MouseEvent<HTMLButtonElement>) => {
    setTooltipOpened(false);
    event.stopPropagation();
    row.pin(isPinned ? false : pinningPosition);
  };

  return (
    <Tooltip
      arrow
      open={tooltipOpened}
      enterDelay={1000}
      enterNextDelay={1000}
      title={isPinned ? localization.unpin : localization.pin}
    >
      <IconButton
        aria-label={localization.pin}
        onClick={handleTogglePin}
        onMouseEnter={() => setTooltipOpened(true)}
        onMouseLeave={() => setTooltipOpened(false)}
        size="small"
        sx={{
          height: '24px',
          width: '24px',
        }}
      >
        {isPinned ? (
          <CloseIcon />
        ) : (
          <PushPinIcon
            fontSize="small"
            style={{
              transform: `rotate(${
                rowPinningDisplayMode === 'sticky'
                  ? 135
                  : pinningPosition === 'top'
                  ? 180
                  : 0
              }deg)`,
            }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};
