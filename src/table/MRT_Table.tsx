import React, { FC } from 'react';
import { Table } from '@mui/material';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableInstance } from '..';

interface Props {
  pinned: 'left' | 'center' | 'right' | 'none';
  tableInstance: MRT_TableInstance;
}

export const MRT_Table: FC<Props> = ({ pinned, tableInstance }) => {
  const {
    getTableProps,
    options: {
      enableStickyHeader,
      hideTableFooter,
      hideTableHead,
      muiTableProps,
    },
  } = tableInstance;

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
      {!hideTableHead && (
        <MRT_TableHead pinned={pinned} tableInstance={tableInstance} />
      )}
      <MRT_TableBody pinned={pinned} tableInstance={tableInstance} />
      {!hideTableFooter && (
        <MRT_TableFooter pinned={pinned} tableInstance={tableInstance} />
      )}
    </Table>
  );
};
