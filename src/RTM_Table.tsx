import React, { FC } from 'react';
import { Table } from '@mui/material';
import { RTM_TableHead } from './RTM_TableHead';
import { RTM_TableBody } from './RTM_TableBody';
import { RTM_TableFooter } from './RTM_TableFooter';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const RTM_Table: FC<Props> = () => {
  const { tableInstance, tableProps, options } = useReactTableMui();

  return (
    <Table stickyHeader {...tableProps} {...tableInstance.getTableProps()}>
      {options.showHead && <RTM_TableHead />}
      <RTM_TableBody />
      {options.showFooter && <RTM_TableFooter />}
    </Table>
  );
};
