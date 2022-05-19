import React, { FC } from 'react';
import { alpha, lighten, TableRow } from '@mui/material';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import type { MRT_Header, MRT_HeaderGroup, MRT_TableInstance } from '..';

interface Props {
  headerGroup: MRT_HeaderGroup;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup, tableInstance }) => {
  const {
    options: { muiTableHeadRowProps },
  } = tableInstance;

  const tableRowProps =
    muiTableHeadRowProps instanceof Function
      ? muiTableHeadRowProps({ headerGroup, tableInstance })
      : muiTableHeadRowProps;

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        boxShadow: `4px 0 8px ${alpha(theme.palette.common.black, 0.1)}`,
        backgroundColor: lighten(theme.palette.background.default, 0.04),
        ...(tableRowProps?.sx as any),
      })}
    >
      {headerGroup.headers.map((header: MRT_Header, index) => (
        <MRT_TableHeadCell
          header={header}
          key={header.id || index}
          tableInstance={tableInstance}
        />
      ))}
    </TableRow>
  );
};
