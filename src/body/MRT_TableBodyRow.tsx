import React, { FC, MouseEvent } from 'react';
import { alpha, TableRow, useTheme } from '@mui/material';
import { Row } from 'react-table';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';

interface Props {
  row: Row;
}

export const MRT_TableBodyRow: FC<Props> = ({ row }) => {
  const {
    anyRowsCanExpand,
    enableSelection,
    onRowClick,
    muiTableBodyRowProps,
    renderDetailPanel,
  } = useMaterialReactTable();
  const theme= useTheme();

  const mTableBodyRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps(row)
      : muiTableBodyRowProps;

  const tableRowProps = {
    ...mTableBodyRowProps,
    ...row.getRowProps(),
    style: {
      backgroundColor: row.isSelected
        ? alpha(theme.palette.primary.light, 0.1)
        : 'transparent',
      ...row.getRowProps().style,
      ...(mTableBodyRowProps?.style ?? {}),
    },
  };

  return (
    <>
      <TableRow
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.(event, row)
        }
        {...tableRowProps}
      >
        {(anyRowsCanExpand || renderDetailPanel) && (
          <MRT_ExpandButton row={row} />
        )}
        {enableSelection && <MRT_SelectCheckbox row={row} />}
        {row.cells.map((cell) => (
          <MRT_TableBodyCell key={cell.getCellProps().key} cell={cell} />
        ))}
      </TableRow>
      {renderDetailPanel && <MRT_TableDetailPanel row={row} />}
    </>
  );
};
