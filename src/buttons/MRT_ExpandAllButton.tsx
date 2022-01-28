import React, { FC } from 'react';
import { IconButton, TableCell } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useMaterialReactTable } from '../useMaterialReactTable';

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
          style={{
            transform: tableInstance.isAllRowsExpanded
              ? 'rotate(-180deg)'
              : anyRowsExpanded
              ? 'rotate(-90deg)'
              : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};
