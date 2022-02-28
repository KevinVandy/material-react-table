import React, { FC, MouseEvent } from 'react';
import {
  Collapse,
  styled,
  TableCell as MuiTableCell,
  TableRow,
} from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Row } from '..';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded?: boolean }>(({ isExpanded }) => ({
  borderBottom: !isExpanded ? 'none' : undefined,
  paddingBottom: isExpanded ? '1rem' : 0,
  paddingTop: isExpanded ? '1rem' : 0,
  transition: 'all 0.2s ease-in-out',
}));

interface Props {
  row: MRT_Row;
}

export const MRT_TableDetailPanel: FC<Props> = ({ row }) => {
  const {
    muiTableBodyRowProps,
    muiTableDetailPanelProps,
    onDetailPanelClick,
    renderDetailPanel,
    tableInstance,
  } = useMRT();

  const mTableBodyRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps(row)
      : muiTableBodyRowProps;

  const tableRowProps = {
    ...mTableBodyRowProps,
    ...row.getRowProps(),
    style: {
      ...row.getRowProps().style,
      ...(mTableBodyRowProps?.style ?? {}),
    },
  };

  const tableCellProps =
    muiTableDetailPanelProps instanceof Function
      ? muiTableDetailPanelProps(row)
      : muiTableDetailPanelProps;

  return (
    <TableRow {...tableRowProps}>
      <TableCell
        colSpan={tableInstance.visibleColumns.length + 10}
        isExpanded={row.isExpanded}
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
