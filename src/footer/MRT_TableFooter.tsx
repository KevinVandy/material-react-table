import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import type { MRT_HeaderGroup, MRT_TableInstance } from '..';

interface Props {
  pinned: 'left' | 'center' | 'right' | 'none';
  tableInstance: MRT_TableInstance;
}

export const MRT_TableFooter: FC<Props> = ({ pinned, tableInstance }) => {
  const {
    getCenterFooterGroups,
    getFooterGroups,
    getLeftFooterGroups,
    getRightFooterGroups,
    options: { muiTableFooterProps },
  } = tableInstance;

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps({ tableInstance })
      : muiTableFooterProps;

  const getFooterGroupsMap = {
    center: getCenterFooterGroups,
    left: getLeftFooterGroups,
    none: getFooterGroups,
    right: getRightFooterGroups,
  };

  return (
    <TableFooter {...tableFooterProps}>
      {getFooterGroupsMap[pinned]().map((footerGroup) => (
        <MRT_TableFooterRow
          footerGroup={footerGroup as MRT_HeaderGroup}
          key={footerGroup.getFooterGroupProps().key}
          tableInstance={tableInstance}
        />
      ))}
    </TableFooter>
  );
};
