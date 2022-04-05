import React, { FC, MouseEvent } from 'react';
import { IconButton } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';

interface Props<D extends Record<string, any> = {}> {
  row: MRT_Row<D>;
}

export const MRT_ExpandButton: FC<Props> = ({ row }) => {
  const {
    icons: { ExpandMoreIcon },
    localization,
    onRowExpandChange,
    renderDetailPanel,
  } = useMRT();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    row.toggleExpanded();
    onRowExpandChange?.(event, row);
  };

  return (
    <IconButton
      aria-label={localization.expand}
      disabled={!row.getCanExpand() && !renderDetailPanel}
      title={localization.expand}
      onClick={handleToggleExpand}
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
  );
};
