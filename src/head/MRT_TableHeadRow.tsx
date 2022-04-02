import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { useMRT } from '../useMRT';
import type { MRT_Header, MRT_HeaderGroup } from '..';

interface Props {
  headerGroup: MRT_HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const { muiTableHeadRowProps } = useMRT();

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
        <MRT_TableHeadCell key={header.id || index} header={header} />
      ))}
    </TableRow>
  );
};
