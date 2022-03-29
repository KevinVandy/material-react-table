import React, { FC, useMemo } from 'react';
import { TableCell, TableRow } from '@mui/material';
import {
  commonTableHeadCellStyles,
  MRT_TableHeadCell,
} from './MRT_TableHeadCell';
import { useMRT } from '../useMRT';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import { MRT_ExpandAllButton } from '../buttons/MRT_ExpandAllButton';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';
import { MRT_TableHeadCellActions } from './MRT_TableHeadCellActions';
import type { MRT_Header, MRT_HeaderGroup } from '..';

interface Props {
  headerGroup: MRT_HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const {
    anyRowsCanExpand,
    enableExpandAll,
    enableSelectAll,
    enableRowActions,
    enableRowEditing,
    enableRowNumbers,
    enableSelection,
    muiTableHeadRowProps,
    positionActionsColumn,
    renderDetailPanel,
    tableInstance,
    tableInstance: { getState },
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
      {anyRowsCanExpand || renderDetailPanel ? (
        enableExpandAll && !isParentHeader ? (
          <TableCell
            size="small"
            {...tableInstance.getToggleAllRowsExpandedProps()}
            sx={{
              ...commonTableHeadCellStyles(getState().densePadding),
              width: '3rem',
              maxWidth: '3rem',
              textAlign: 'center',
            }}
          >
            <MRT_ExpandAllButton />
          </TableCell>
        ) : (
          <MRT_TableSpacerCell
            width={`${
              renderDetailPanel ? 2 : tableInstance.getExpandedDepth() + 0.5
            }rem`}
          />
        )
      ) : null}
      {enableSelection ? (
        !isParentHeader && enableSelectAll ? (
          <TableCell
            sx={{
              ...commonTableHeadCellStyles(getState().densePadding),
              maxWidth: '3rem',
              width: '3rem',
              textAlign: 'center',
            }}
          >
            <MRT_SelectCheckbox selectAll />
          </TableCell>
        ) : (
          <MRT_TableSpacerCell width="1rem" />
        )
      ) : null}
      {enableRowNumbers &&
        (isParentHeader ? (
          <MRT_TableSpacerCell />
        ) : (
          <TableCell
            sx={{
              ...commonTableHeadCellStyles(getState().densePadding),
              width: '2rem',
              maxWidth: '2rem',
            }}
          >
            #
          </TableCell>
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
