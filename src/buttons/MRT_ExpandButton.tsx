import React, { FC } from 'react';
import { IconButton, TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';
import { commonTableBodyButtonCellStyles } from '../body/MRT_TableBodyCell';

interface Props {
  row: MRT_Row;
}

export const MRT_ExpandButton: FC<Props> = ({ row }) => {
  const {
    icons: { ExpandMoreIcon },
    localization,
    renderDetailPanel,
    tableInstance: {
      state: { densePadding },
    },
  } = useMRT();

  return (
    <TableCell
      size="small"
      sx={{
        ...commonTableBodyButtonCellStyles(densePadding),
        pl: `${row.depth + 0.5}rem`,
        textAlign: 'left',
      }}
    >
      <IconButton
        aria-label={localization.expandButtonTitle}
        disabled={!row.canExpand && !renderDetailPanel}
        title={localization.expandButtonTitle}
        {...row.getToggleRowExpandedProps()}
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
    </TableCell>
  );
};
