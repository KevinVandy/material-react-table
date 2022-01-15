import { TableRow } from '@mui/material';
import React, { FC } from 'react';
import { Row } from 'react-table';
import { MuiTableBodyCell } from './MuiTableBodyCell';

interface Props {
    row: Row<object>
}

export const MuiTableBodyRow:FC<Props> = ({row}) => {


  return <TableRow {...row.getRowProps()}>
  {row.cells.map((cell) => {
    return (
      <MuiTableBodyCell cell={cell} />
    );
  })}
</TableRow>
};
