import React, { FC, MouseEvent } from 'react';
import { IconButton } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';

interface Props {
  row: MRT_Row;
}

export const MRT_ExpandButton: FC<Props> = ({ row }) => {
  const {
    icons: { ExpandMoreIcon },
    localization,
    onRowExpandChange,
    renderDetailPanel,
  } = useMRT();

  const handleToggleExpand = (event: MouseEvent<HTMLButtonElement>) => {
    // @ts-ignore
    row.getToggleRowExpandedProps()?.onClick(event);
    onRowExpandChange?.(event, row);
  };

  return (
    <IconButton
      aria-label={localization.expand}
      disabled={!row.canExpand && !renderDetailPanel}
      title={localization.expand}
      {...row.getToggleRowExpandedProps()}
      onClick={handleToggleExpand}
    >
      <ExpandMoreIcon
        style={{
          transform: `rotate(${
            !row.canExpand && !renderDetailPanel
              ? -90
              : row.isExpanded
              ? -180
              : 0
          }deg)`,
          transition: 'transform 0.2s',
        }}
      />
    </IconButton>
  );
};
