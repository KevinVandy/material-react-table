import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { RTM_TableFooterCell } from './RTM_TableFooterCell';
import { useReactTableMui } from './useReactTableMui';

interface Props {
  footerGroup: HeaderGroup<object>;
}

export const RTM_TableFooterRow: FC<Props> = ({ footerGroup }) => {
  const { renderDetailPanel } = useReactTableMui();

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {renderDetailPanel && <TableCell style={{ width: '2rem' }} />}
      {footerGroup.headers.map((column, index) => (
        <RTM_TableFooterCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
