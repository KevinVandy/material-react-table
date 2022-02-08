import React, { FC } from 'react';
import { IconButton, styled } from '@mui/material';
import { Row } from 'react-table';
import MuiExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TableButtonCell } from '../table/MRT_TableButtonCell';

const TableCell = styled(MRT_TableButtonCell, {
  shouldForwardProp: (prop) => prop !== 'depth',
})<{ depth: number }>(({ depth }) => ({
  paddingLeft: `${depth + 0.5}rem`,
  textAlign: 'left',
}));

const ExpandMoreIcon = styled(MuiExpandMoreIcon, {
  shouldForwardProp: (prop) => prop !== 'rotation',
})<{ rotation?: number }>(({ rotation }) => ({
  transform: `rotate(${rotation}deg)`,
  transition: 'transform 0.2s',
}));

interface Props {
  row: Row;
}

export const MRT_ExpandButton: FC<Props> = ({ row }) => {
  const { localization, densePadding, renderDetailPanel } =
    useMaterialReactTable();

  return (
    <TableCell size="small" densePadding={densePadding} depth={row.depth}>
      <IconButton
        aria-label={localization?.expandButtonTitle}
        disabled={!row.canExpand && !renderDetailPanel}
        title={localization?.expandButtonTitle}
        {...row.getToggleRowExpandedProps()}
      >
        <ExpandMoreIcon
          fontSize={row.canExpand || renderDetailPanel ? 'medium' : 'small'}
          rotation={
            !row.canExpand && !renderDetailPanel
              ? -90
              : row.isExpanded
              ? -180
              : 0
          }
        />
      </IconButton>
    </TableCell>
  );
};
