import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import type { MRT_Header, MRT_HeaderGroup, MRT_TableInstance } from '..';

interface Props {
  footerGroup: MRT_HeaderGroup;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableFooterRow: FC<Props> = ({
  footerGroup,
  tableInstance,
}) => {
  const {
    options: { muiTableFooterRowProps },
  } = tableInstance;

  // if no content in row, skip row
  if (
    !footerGroup.headers?.some(
      (h) => h.column.columnDef.footer || h.column.Footer,
    )
  )
    return null;

  const tableRowProps =
    muiTableFooterRowProps instanceof Function
      ? muiTableFooterRowProps({ footerGroup, tableInstance })
      : muiTableFooterRowProps;

  return (
    <TableRow {...tableRowProps}>
      {footerGroup.headers.map((footer: MRT_Header) => (
        <MRT_TableFooterCell
          footer={footer}
          key={footer.id}
          tableInstance={tableInstance}
        />
      ))}
    </TableRow>
  );
};
