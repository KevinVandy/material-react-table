import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { useMRT } from '../useMRT';
import type { MRT_HeaderGroup } from '..';

interface Props {
  pinned: 'left' | 'center' | 'right' | 'none';
}

export const MRT_TableFooter: FC<Props> = ({ pinned }) => {
  const {
    muiTableFooterProps,
    tableInstance,
    tableInstance: {
      getCenterFooterGroups,
      getFooterGroups,
      getLeftFooterGroups,
      getRightFooterGroups,
    },
  } = useMRT();

  const getFooterGroupsMap = {
    center: getCenterFooterGroups,
    left: getLeftFooterGroups,
    none: getFooterGroups,
    right: getRightFooterGroups,
  };

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps(tableInstance)
      : muiTableFooterProps;

  return (
    <TableFooter {...tableFooterProps}>
      {getFooterGroupsMap[pinned]().map((footerGroup) => (
        <MRT_TableFooterRow
          key={footerGroup.getFooterGroupProps().key}
          footerGroup={footerGroup as MRT_HeaderGroup}
        />
      ))}
    </TableFooter>
  );
};
