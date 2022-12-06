import React, { FC } from 'react';
import TableRow from '@mui/material/TableRow';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import type { MRT_Header, MRT_HeaderGroup, MRT_TableInstance } from '..';

interface Props {
  footerGroup: MRT_HeaderGroup;
  table: MRT_TableInstance;
}

export const MRT_TableFooterRow: FC<Props> = ({ footerGroup, table }) => {
  const {
    options: { layoutMode, muiTableFooterRowProps },
  } = table;

  // if no content in row, skip row
  if (
    !footerGroup.headers?.some(
      (header) =>
        (typeof header.column.columnDef.footer === 'string' &&
          !!header.column.columnDef.footer) ||
        header.column.columnDef.Footer,
    )
  )
    return null;

  const tableRowProps =
    muiTableFooterRowProps instanceof Function
      ? muiTableFooterRowProps({ footerGroup, table })
      : muiTableFooterRowProps;

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps?.sx(theme)
          : (tableRowProps?.sx as any)),
      })}
    >
      {footerGroup.headers.map((footer: MRT_Header) => (
        <MRT_TableFooterCell footer={footer} key={footer.id} table={table} />
      ))}
    </TableRow>
  );
};
