import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { useMRT } from '../useMRT';
import type { MRT_HeaderGroup } from '..';

interface Props {}

export const MRT_TableFooter: FC<Props> = () => {
  const {
    muiTableFooterProps,
    tableInstance,
    tableInstance: { getFooterGroups },
  } = useMRT();

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps(tableInstance)
      : muiTableFooterProps;

  return (
    <TableFooter {...tableFooterProps}>
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          key={footerGroup.getFooterGroupProps().key}
          footerGroup={footerGroup as MRT_HeaderGroup}
        />
      ))}
    </TableFooter>
  );
};
