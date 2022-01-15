import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { RTM_TableHeadCell } from './RTM_TableHeadCell';

interface Props {
  headerGroup: HeaderGroup<object>;
}

export const RTM_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column, index) => (
        <RTM_TableHeadCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
