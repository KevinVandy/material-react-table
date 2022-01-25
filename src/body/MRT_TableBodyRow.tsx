import React, { FC, MouseEvent } from 'react';
import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';

interface Props {
  row: Row;
}

export const MRT_TableBodyRow: FC<Props> = ({ row }) => {
  const {
    anyRowsCanExpand,
    enableSelection,
    enableSubRowTree,
    enableColumnHiding,
    onRowClick,
    renderDetailPanel,
    tableInstance,
  } = useMaterialReactTable();

  return (
    <>
      <TableRow
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.(event, row)
        }
        {...row.getRowProps()}
      >
        {((enableSubRowTree && anyRowsCanExpand) || renderDetailPanel) &&
          (row.canExpand || renderDetailPanel ? (
            <MRT_ExpandButton row={row} />
          ) : (
            <MRT_TableSpacerCell
              width={`${
                renderDetailPanel ? 2 : tableInstance.expandedDepth + 0.5
              }rem`}
            />
          ))}
        {enableSelection && <MRT_SelectCheckbox row={row} />}
        {row.cells.map((cell, index) => (
          <MRT_TableBodyCell key={`${index}-${cell.value}`} cell={cell} />
        ))}
        {enableColumnHiding && <MRT_TableSpacerCell />}
      </TableRow>
      {renderDetailPanel && <MRT_TableDetailPanel row={row} />}
    </>
  );
};
