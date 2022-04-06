import React, { FC } from 'react';
import { Table } from '@mui/material';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { useMRT } from '../useMRT';

interface Props {
  pinned: 'left' | 'center' | 'right' | 'none';
}

export const MRT_Table: FC<Props> = ({ pinned }) => {
  const {
    enableStickyHeader,
    hideTableFooter,
    hideTableHead,
    muiTableProps,
    tableInstance,
    tableInstance: { getTableProps },
  } = useMRT();

  const mTableProps =
    muiTableProps instanceof Function
      ? muiTableProps(tableInstance)
      : muiTableProps;

  const tableProps = {
    ...getTableProps(),
    ...mTableProps,
  };

  return (
    <Table stickyHeader={enableStickyHeader} {...tableProps}>
      {!hideTableHead && <MRT_TableHead pinned={pinned} />}
      <MRT_TableBody pinned={pinned} />
      {!hideTableFooter && <MRT_TableFooter pinned={pinned} />}
    </Table>
  );
};
