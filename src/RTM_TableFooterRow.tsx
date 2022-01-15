import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { RTM_TableFooterCell } from './RTM_TableFooterCell';

interface Props {
  footerGroup: HeaderGroup<object>;
}

export const RTM_TableFooterRow: FC<Props> = ({ footerGroup }) => {
  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {footerGroup.headers.map((column, index) => (
        <RTM_TableFooterCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
