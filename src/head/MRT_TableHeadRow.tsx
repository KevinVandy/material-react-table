import React, { FC, useMemo } from 'react';
import { TableCell, TableRow } from '@mui/material';
import {
  commonTableHeadCellStyles,
  MRT_TableHeadCell,
} from './MRT_TableHeadCell';
import { useMRT } from '../useMRT';
import { MRT_ExpandAllButton } from '../buttons/MRT_ExpandAllButton';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';
import { MRT_TableHeadCellActions } from './MRT_TableHeadCellActions';
import type { MRT_Header, MRT_HeaderGroup } from '..';

interface Props {
  headerGroup: MRT_HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const {
    getCanSomeRowsExpand,
    enableExpandAll,
    enableRowActions,
    enableRowEditing,
    muiTableHeadRowProps,
    positionActionsColumn,
    renderDetailPanel,
    tableInstance: {
      getState,
      getToggleAllRowsExpandedProps,
      getExpandedDepth,
    },
  } = useMRT();

  const { isDensePadding } = getState();

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
      {getCanSomeRowsExpand() || renderDetailPanel ? (
        enableExpandAll && !isParentHeader ? (
          <TableCell
            size="small"
            {...getToggleAllRowsExpandedProps()}
            sx={{
              ...commonTableHeadCellStyles({ isDensePadding }),
              width: '3rem',
              maxWidth: '3rem',
              textAlign: 'center',
            }}
          >
            <MRT_ExpandAllButton />
          </TableCell>
        ) : (
          <MRT_TableSpacerCell
            width={`${renderDetailPanel ? 2 : getExpandedDepth() + 0.5}rem`}
          />
        )
      ) : null}
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
