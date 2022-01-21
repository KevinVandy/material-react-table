import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  footerGroup: HeaderGroup;
}

export const MRT_TableFooterRow: FC<Props> = ({ footerGroup }) => {
  const {
    renderDetailPanel,
    columns,
    enableColumnHiding,
    enableSelection,
    tableInstance,
    OverrideTableFooterRowComponent,
  } = useMaterialReactTable();

  //if no content in row, skip row
  if (!columns.some((c) => c.Footer)) return null;

  if (OverrideTableFooterRowComponent) {
    return <>{OverrideTableFooterRowComponent(footerGroup, tableInstance)}</>;
  }

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {enableSelection && <TableCell style={{ width: '2rem' }} />}
      {renderDetailPanel && <TableCell style={{ width: '2rem' }} />}
      {footerGroup.headers.map((column, index) => (
        <MRT_TableFooterCell key={`${index}-${column.id}`} column={column} />
      ))}
      {enableColumnHiding && <TableCell />}
    </TableRow>
  );
};
