import React, { FC } from 'react';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { Row } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  row: Row;
}

export const MRT_TableDetailPanel: FC<Props> = ({ row }) => {
  const { tableInstance, renderDetailPanel, muiTableDetailPanelProps } =
    useMaterialReactTable();

  return (
    <TableRow {...row.getToggleRowExpandedProps()}>
      <TableCell
        colSpan={tableInstance.visibleColumns.length + 10}
        style={{
          borderBottom: !row.isExpanded ? 'none' : undefined,
          paddingBottom: row.isExpanded ? '1rem' : 0,
          paddingTop: row.isExpanded ? '1rem' : 0,
          transition: 'all 0.2s',
        }}
        {...muiTableDetailPanelProps}
      >
        <Collapse in={row.isExpanded}>{renderDetailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};
