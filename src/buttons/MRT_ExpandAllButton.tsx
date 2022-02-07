import React, { FC } from 'react';
import { IconButton, styled, TableCell } from '@mui/material';
import MuiArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useMaterialReactTable } from '../useMaterialReactTable';

const ArrowRightIcon = styled(MuiArrowRightIcon, {
  shouldForwardProp: (prop) => prop !== 'rotation',
})<{ rotation?: number }>(({ rotation }) => ({
  transform: `rotate(${rotation}deg)`,
  transition: 'transform 0.2s',
}));

interface Props {}

export const MRT_ExpandAllButton: FC<Props> = () => {
  const {
    tableInstance,
    localization,
    anyRowsExpanded,
    densePadding,
    renderDetailPanel,
  } = useMaterialReactTable();

  return (
    <TableCell
      size="small"
      {...tableInstance.getToggleAllRowsExpandedProps()}
      style={{
        padding: densePadding ? '0' : '0.5rem 0.5rem',
        transition: 'all 0.2s ease-in-out',
        width: `${renderDetailPanel ? 2 : tableInstance.expandedDepth + 2}rem`,
      }}
    >
      <IconButton
        aria-label={localization?.expandAllButtonTitle}
        title={localization?.expandAllButtonTitle}
      >
        <ArrowRightIcon
          fontSize="small"
          rotation={
            tableInstance.isAllRowsExpanded ? -180 : anyRowsExpanded ? -90 : 0
          }
        />
      </IconButton>
    </TableCell>
  );
};
