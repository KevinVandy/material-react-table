import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { MRT_TableInstance } from '..';

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
  const { density, isLoading } = getState();

  const iconButtonProps =
    muiExpandAllButtonProps instanceof Function
      ? muiExpandAllButtonProps({ table })
      : muiExpandAllButtonProps;

  const isAllRowsExpanded = getIsAllRowsExpanded();

  return (
    <Tooltip
      arrow
      enterDelay={1000}
      enterNextDelay={1000}
      title={
        iconButtonProps?.title ?? isAllRowsExpanded
          ? localization.collapseAll
          : localization.expandAll
      }
    >
      <span>
        <IconButton
          aria-label={localization.expandAll}
          disabled={
            isLoading || (!renderDetailPanel && !getCanSomeRowsExpand())
          }
          onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded)}
          {...iconButtonProps}
          sx={(theme) => ({
            height: density === 'compact' ? '1.75rem' : '2.25rem',
            width: density === 'compact' ? '1.75rem' : '2.25rem',
            mt: density !== 'compact' ? '-0.25rem' : undefined,
            ...(iconButtonProps?.sx instanceof Function
              ? iconButtonProps?.sx(theme)
              : (iconButtonProps?.sx as any)),
          })}
          title={undefined}
        >
          <KeyboardDoubleArrowDownIcon
            style={{
              transform: `rotate(${
                isAllRowsExpanded ? -180 : getIsSomeRowsExpanded() ? -90 : 0
              }deg)`,
              transition: 'transform 150ms',
            }}
          />
        </IconButton>
      </span>
    </Tooltip>
  );
};
