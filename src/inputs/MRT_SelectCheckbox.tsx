import React, { FC } from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { Row } from 'react-table';

interface Props {
  row: Row<object>;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row }) => {
  return (
    <TableCell style={{ width: '2rem' }}>
      <Checkbox {...row.getToggleRowSelectedProps()} />
    </TableCell>
  );
};
