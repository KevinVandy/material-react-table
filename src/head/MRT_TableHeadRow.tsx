import React, { FC, useMemo } from 'react';
import { TableRow } from '@mui/material';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { useMRT } from '../useMRT';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';
import { MRT_TableHeadCellActions } from './MRT_TableHeadCellActions';
import type { MRT_Header, MRT_HeaderGroup } from '..';

interface Props {
  headerGroup: MRT_HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const {
    enableRowActions,
    enableRowEditing,
    muiTableHeadRowProps,
    positionActionsColumn,
  } = useMRT();

  const isParentHeader = useMemo(
    () => headerGroup.headers.some((h) => !!h.subHeaders?.length),
    [headerGroup.headers],
  );

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
      {(enableRowActions || enableRowEditing) &&
        positionActionsColumn === 'first' &&
        (isParentHeader ? (
          <MRT_TableSpacerCell />
        ) : (
          <MRT_TableHeadCellActions />
        ))}
      {headerGroup.headers.map((header: MRT_Header, index) => (
        <MRT_TableHeadCell key={header.id || index} header={header} />
      ))}
      {(enableRowActions || enableRowEditing) &&
        positionActionsColumn === 'last' &&
        (isParentHeader ? (
          <MRT_TableSpacerCell />
        ) : (
          <MRT_TableHeadCellActions />
        ))}
    </TableRow>
  );
};
