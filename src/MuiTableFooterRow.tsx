import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MuiTableFooterCell } from './MuiTableFooterCell';

interface Props {
  footerGroup: HeaderGroup<object>;
}

export const MuiTableFooterRow: FC<Props> = ({ footerGroup }) => {
  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {footerGroup.headers.map((column, index) => (
        <MuiTableFooterCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
