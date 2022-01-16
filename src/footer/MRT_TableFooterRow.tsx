import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  footerGroup: HeaderGroup<object>;
}

export const MRT_TableFooterRow: FC<Props> = ({ footerGroup }) => {
  const { renderDetailPanel } = useMaterialReactTable();

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {renderDetailPanel && <TableCell style={{ width: '2rem' }} />}
      {footerGroup.headers.map((column, index) => (
        <MRT_TableFooterCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
