import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';

interface Props {}

export const MRT_TableFooter: FC<Props> = () => {
  const { muiTableFooterProps, tableInstance } = useMRT();

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps(tableInstance)
      : muiTableFooterProps;

  return (
    <TableFooter {...tableFooterProps}>
      {tableInstance.footerGroups.map((footerGroup: MRT_HeaderGroup) => (
        <MRT_TableFooterRow
          key={footerGroup.getFooterGroupProps().key}
          footerGroup={footerGroup}
        />
      ))}
    </TableFooter>
  );
};
