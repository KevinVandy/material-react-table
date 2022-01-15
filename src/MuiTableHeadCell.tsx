import React, { FC } from 'react';
import { styled, TableCell as MuiTableCell } from '@mui/material';
import { HeaderGroup } from 'react-table';

const TableCell = styled(MuiTableCell)({
  fontWeight: 'bold',
  borderRight: '1px solid #ccc',
});

interface Props {
  column: HeaderGroup;
}

export const MuiTableHeadCell: FC<Props> = ({ column }) => {
  const isParentHeader = (column?.columns?.length ?? 0) > 0;

  return (
    <TableCell
      align={isParentHeader ? 'center' : 'left'}
      variant="head"
      {...column.getHeaderProps()}
    >
      {column.render('Header')}
    </TableCell>
  );
};
