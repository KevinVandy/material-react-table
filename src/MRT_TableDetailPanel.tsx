import React, { FC } from 'react';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { Row } from 'react-table';
import { useMaterialReactTable } from './useMaterialReactTable';

interface Props {
  row: Row<object>;
}

export const MRT_TableDetailPanel: FC<Props> = ({ row }) => {
  const { tableInstance, renderDetailPanel } = useMaterialReactTable();

  return (
    <TableRow {...row.getToggleRowExpandedProps()}>
      <TableCell
        colSpan={tableInstance.visibleColumns.length + 10}
        style={{
          paddingBottom: row.isExpanded ? '1rem' : 0,
          paddingTop: row.isExpanded ? '1rem' : 0,
          transition: 'padding 0.2s',
        }}
      >
        <Collapse in={row.isExpanded}>{renderDetailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};
