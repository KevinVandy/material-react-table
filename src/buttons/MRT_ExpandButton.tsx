import React, { FC, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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

  const canExpand = row.getCanExpand();
  const isExpanded = row.getIsExpanded();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    row.toggleExpanded();
    iconButtonProps?.onClick?.(event);
  };

  return (
    <Tooltip
      arrow
      disableHoverListener={!canExpand && !renderDetailPanel}
      enterDelay={1000}
      enterNextDelay={1000}
      title={
        iconButtonProps?.title ?? isExpanded
          ? localization.collapse
          : localization.expand
      }
    >
      <span>
        <IconButton
          aria-label={localization.expand}
          disabled={!canExpand && !renderDetailPanel}
          {...iconButtonProps}
          onClick={handleToggleExpand}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            ...(iconButtonProps?.sx instanceof Function
              ? iconButtonProps.sx(theme)
              : (iconButtonProps?.sx as any)),
          })}
          title={undefined}
        >
          <ExpandMoreIcon
            style={{
              transform: `rotate(${
                !canExpand && !renderDetailPanel ? -90 : isExpanded ? -180 : 0
              }deg)`,
              transition: 'transform 150ms',
            }}
          />
        </IconButton>
      </span>
    </Tooltip>
  );
};
