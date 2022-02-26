import React, { FC } from 'react';
import { IconButton, styled } from '@mui/material';
import { Row } from 'react-table';
import { useMRT } from '../useMRT';
import { MRT_TableButtonCell } from '../table/MRT_TableButtonCell';

const TableCell = styled(MRT_TableButtonCell, {
  shouldForwardProp: (prop) => prop !== 'depth',
})<{ depth: number }>(({ depth }) => ({
  paddingLeft: `${depth + 0.5}rem`,
  textAlign: 'left',
}));

interface Props {
  row: Row;
}

export const MRT_ExpandButton: FC<Props> = ({ row }) => {
  const {
    densePadding,
    icons: { ExpandMoreIcon },
    localization,
    renderDetailPanel,
  } = useMRT();

  return (
    <TableCell size="small" densePadding={densePadding} depth={row.depth}>
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
