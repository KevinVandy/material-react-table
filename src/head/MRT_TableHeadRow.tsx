import React, { FC } from 'react';
import { TableRow } from '@mui/material';
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

  const mTableHeadRowProps =
    muiTableHeadRowProps instanceof Function
      ? muiTableHeadRowProps(headerGroup)
      : muiTableHeadRowProps;

  const tableRowProps = {
    ...headerGroup?.getHeaderGroupProps(),
    ...mTableHeadRowProps,
  };

  return (
    <TableRow {...tableRowProps}>
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
