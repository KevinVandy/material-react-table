import React, { FC } from 'react';
import { IconButton, TableCell } from '@mui/material';
import { Row } from 'react-table';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  row: Row;
}

export const MRT_ExpandButton: FC<Props> = ({ row }) => {
  const { localization, tableInstance, densePadding, renderDetailPanel } =
    useMaterialReactTable();

  return (
    <TableCell
      size="small"
      style={{
        padding: densePadding ? '0' : '0.6rem 0',
        paddingLeft: `${row.depth + 0.5}rem`,
        transition: 'all 0.2s ease-in-out',
        width: `${
          renderDetailPanel ? 2 : tableInstance.expandedDepth - row.depth + 2
        }rem`,
      }}
    >
      <IconButton
        disabled={!row.canExpand && !renderDetailPanel}
        aria-label={localization?.expandButtonTitle}
        title={localization?.expandButtonTitle}
        {...row.getToggleRowExpandedProps()}
      >
        <ExpandMoreIcon
          fontSize={row.canExpand || renderDetailPanel ? 'medium' : 'small'}
          style={{
            transform:
              !row.canExpand && !renderDetailPanel
                ? 'rotate(-90deg)'
                : row.isExpanded
                ? 'rotate(-180deg)'
                : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        />
      </IconButton>
    </TableCell>
  );
};
