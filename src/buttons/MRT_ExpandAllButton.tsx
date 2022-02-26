import React, { FC } from 'react';
import { IconButton } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_TableButtonCell } from '../table/MRT_TableButtonCell';

interface Props {}

export const MRT_ExpandAllButton: FC<Props> = () => {
  const {
    tableInstance,
    localization,
    anyRowsExpanded,
    densePadding,
    icons: { DoubleArrowDownIcon },
  } = useMRT();

  return (
    <MRT_TableButtonCell
      size="small"
      densePadding={densePadding}
      {...tableInstance.getToggleAllRowsExpandedProps()}
    >
      <IconButton
        aria-label={localization.expandAllButtonTitle}
        title={localization.expandAllButtonTitle}
      >
        <DoubleArrowDownIcon
          style={{
            transform: `rotate(${
              tableInstance.isAllRowsExpanded ? -180 : anyRowsExpanded ? -90 : 0
            }deg)`,
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </MRT_TableButtonCell>
  );
};
