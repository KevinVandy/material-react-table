import React, { FC } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_ExpandAllButton: FC<Props> = ({ table }) => {
  const {
    getIsAllRowsExpanded,
    getIsSomeRowsExpanded,
    getCanSomeRowsExpand,
    getState,
    options: {
      icons: { KeyboardDoubleArrowDownIcon },
      localization,
      muiExpandAllButtonProps,
      renderDetailPanel,
    },
    toggleAllRowsExpanded,
  } = table;
  const { density } = getState();

  const iconButtonProps =
    muiExpandAllButtonProps instanceof Function
      ? muiExpandAllButtonProps({ table })
      : muiExpandAllButtonProps;

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={localization.expandAll}
    >
      <span>
        <IconButton
          aria-label={localization.expandAll}
          disabled={!getCanSomeRowsExpand() && !renderDetailPanel}
          onClick={() => toggleAllRowsExpanded(!getIsAllRowsExpanded())}
          {...iconButtonProps}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            mt: density !== 'compact' ? '-0.25rem' : undefined,
            ...(iconButtonProps?.sx instanceof Function
              ? iconButtonProps?.sx(theme)
              : (iconButtonProps?.sx as any)),
          })}
        >
          <KeyboardDoubleArrowDownIcon
            style={{
              transform: `rotate(${
                getIsAllRowsExpanded()
                  ? -180
                  : getIsSomeRowsExpanded()
                  ? -90
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
