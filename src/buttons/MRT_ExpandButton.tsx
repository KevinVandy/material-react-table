import React, { FC, MouseEvent } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  table: MRT_TableInstance;
}

export const MRT_ExpandButton: FC<Props> = ({ row, table }) => {
  const {
    getState,
    options: {
      icons: { ExpandMoreIcon },
      localization,
      muiExpandButtonProps,
      renderDetailPanel,
    },
  } = table;
  const { density } = getState();

  const iconButtonProps =
    muiExpandButtonProps instanceof Function
      ? muiExpandButtonProps({ table, row })
      : muiExpandButtonProps;

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    row.toggleExpanded();
    iconButtonProps?.onClick?.(event);
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
          {...iconButtonProps}
          onClick={handleToggleExpand}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            ...(iconButtonProps?.sx instanceof Function
              ? iconButtonProps.sx(theme)
              : (iconButtonProps?.sx as any)),
          })}
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
