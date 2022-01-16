import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { useMaterialReactTable } from './useMaterialReactTable';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { MRT_TableExpandButton } from './MRT_TableExpandButton';

interface Props {
  row: Row<object>;
}

export const MRT_TableBodyRow: FC<Props> = ({ row }) => {
  const { renderDetailPanel } = useMaterialReactTable();

  return (
    <>
      <TableRow {...row.getRowProps()}>
        {renderDetailPanel && <MRT_TableExpandButton row={row} />}
        {row.cells.map((cell, index) => (
          <MRT_TableBodyCell key={`${index}-${cell.value}`} cell={cell} />
        ))}
      </TableRow>
      {renderDetailPanel && <MRT_TableDetailPanel row={row} />}
    </>
  );
};
