import React, { FC, MouseEvent } from 'react';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { Row } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  row: Row;
}

export const MRT_TableDetailPanel: FC<Props> = ({ row }) => {
  const {
    tableInstance,
    renderDetailPanel,
    muiTableDetailPanelProps,
    muiTableBodyRowProps,
    onDetailPanelClick,
  } = useMaterialReactTable();

  const mTableBodyRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps(row)
      : muiTableBodyRowProps;

  const tableRowProps = {
    ...mTableBodyRowProps,
    ...row.getToggleRowExpandedProps(),
    style: {
      ...row.getToggleRowExpandedProps().style,
      ...(mTableBodyRowProps?.style ?? {}),
    },
  };

  const mTableDetailPanelProps =
    muiTableDetailPanelProps instanceof Function
      ? muiTableDetailPanelProps(row)
      : muiTableDetailPanelProps;

  const tableCellProps = {
    ...mTableDetailPanelProps,
    style: {
      borderBottom: !row.isExpanded ? 'none' : undefined,
      paddingBottom: row.isExpanded ? '1rem' : 0,
      paddingTop: row.isExpanded ? '1rem' : 0,
      transition: 'all 0.2s',
      ...(mTableDetailPanelProps?.style || {}),
    },
  };

  return (
    <TableRow hover {...tableRowProps}>
      <TableCell
        colSpan={tableInstance.visibleColumns.length + 10}
        onClick={(event: MouseEvent<HTMLTableCellElement>) =>
          onDetailPanelClick?.(event, row)
        }
        {...tableCellProps}
      >
        <Collapse in={row.isExpanded}>{renderDetailPanel?.(row)}</Collapse>
      </TableCell>
    </TableRow>
  );
};
