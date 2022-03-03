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
import { MRT_HeaderGroup } from '..';

interface Props {
  headerGroup: MRT_HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const {
    anyRowsCanExpand,
    disableExpandAll,
    enableRowActions,
    enableRowEditing,
    enableRowNumbers,
    enableSelection,
    muiTableHeadRowProps,
    positionActionsColumn,
    renderDetailPanel,
    tableInstance,
  } = useMRT();

  const isParentHeader = useMemo(
    () => headerGroup.headers.some((h) => (h.columns?.length ?? 0) > 0),
    [headerGroup.headers],
  );

  const mTableHeadRowProps =
    muiTableHeadRowProps instanceof Function
      ? muiTableHeadRowProps(headerGroup)
      : muiTableHeadRowProps;

  const tableRowProps = {
    ...mTableHeadRowProps,
    ...headerGroup.getHeaderGroupProps(),
    style: {
      ...headerGroup.getHeaderGroupProps().style,
      ...mTableHeadRowProps?.style,
    },
  };

  return (
    <TableRow {...tableRowProps}>
      {enableRowNumbers &&
        (isParentHeader ? (
          <MRT_TableSpacerCell />
        ) : (
          <TableCell
            sx={{
              ...commonTableHeadCellStyles(tableInstance.state.densePadding),
            }}
          >
            #
          </TableCell>
        ))}
      {(enableRowActions || enableRowEditing) &&
        positionActionsColumn === 'first' &&
        (isParentHeader ? (
          <MRT_TableSpacerCell />
        ) : (
          <MRT_TableHeadCellActions />
        ))}
      {anyRowsCanExpand || renderDetailPanel ? (
        !disableExpandAll && !isParentHeader ? (
          <MRT_ExpandAllButton />
        ) : (
          <MRT_TableSpacerCell
            width={`${
              renderDetailPanel ? 2 : tableInstance.expandedDepth + 0.5
            }rem`}
          />
        )
      ) : null}
      {enableSelection ? (
        !isParentHeader ? (
          <MRT_SelectCheckbox selectAll />
        ) : (
          <MRT_TableSpacerCell width="1rem" />
        )
      ) : null}
      {headerGroup.headers.map((column: MRT_HeaderGroup) => (
        <MRT_TableHeadCell key={column.getHeaderProps().key} column={column} />
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
