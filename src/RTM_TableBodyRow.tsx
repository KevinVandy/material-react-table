import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import { RTM_TableBodyCell } from './RTM_TableBodyCell';
import { useReactTableMui } from './useReactTableMui';
import { RTM_TableDetailPanel } from './RTM_TableDetailPanel';
import { RTM_TableExpandButton } from './RTM_TableExpandButton';

interface Props {
  row: Row<object>;
}

export const RTM_TableBodyRow: FC<Props> = ({ row }) => {
  const { renderDetailPanel } = useReactTableMui();

  return (
    <>
      <TableRow {...row.getRowProps()}>
        {renderDetailPanel && <RTM_TableExpandButton row={row} />}
        {row.cells.map((cell, index) => (
          <RTM_TableBodyCell key={`${index}-${cell.value}`} cell={cell} />
        ))}
      </TableRow>
      {renderDetailPanel && <RTM_TableDetailPanel row={row} />}
    </>
  );
};
