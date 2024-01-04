import { type MouseEvent } from 'react';
import { type RowPinningPosition } from '@tanstack/react-table';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends IconButtonProps {
  pinningPosition: RowPinningPosition;
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_RowPinButton = <TData extends MRT_RowData>({
  pinningPosition,
  row,
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: {
      icons: { CloseIcon, PushPinIcon },
      localization,
      rowPinningDisplayMode,
    },
  } = table;

  const isPinned = row.getIsPinned();

  const handleTogglePin = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    row.pin(isPinned ? false : pinningPosition);
  };

  return (
    <Tooltip title={isPinned ? localization.unpin : localization.pin}>
      <IconButton
        aria-label={localization.pin}
        onClick={handleTogglePin}
        size="small"
        {...rest}
        sx={(theme) => ({
          height: '24px',
          width: '24px',
          ...(parseFromValuesOrFunc(rest?.sx, theme) as any),
        })}
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
