import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { HeaderGroup, TableInstance } from 'react-table';

interface Props {
  // reactTable: TableInstance<object>;
  column: HeaderGroup;
}

export const MuiTableHeadCell: FC<Props> = ({ column }) => {
  return (
    <TableCell
      variant="head"
      {...column.getHeaderProps()}
    >
      {column.render('Header')}
    </TableCell>
  );
};
