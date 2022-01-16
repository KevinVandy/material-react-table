import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { RTM_TableHeadCell } from './RTM_TableHeadCell';
import { useReactTableMui } from './useReactTableMui';

interface Props {
  headerGroup: HeaderGroup<object>;
}

export const RTM_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const { renderDetailPanel } = useReactTableMui();

  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {renderDetailPanel && <TableCell style={{ width: '2rem' }} />}
      {headerGroup.headers.map((column, index) => (
        <RTM_TableHeadCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
