import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';
import { useMRT } from '../useMRT';

interface Props {
  footerGroup: HeaderGroup;
}

export const MRT_TableFooterRow: FC<Props> = ({ footerGroup }) => {
  const {
    anyRowsCanExpand,
    columns,
    enableRowActions,
    enableRowEditing,
    enableRowNumbers,
    enableSelection,
    muiTableFooterRowProps,
    positionActionsColumn,
    renderDetailPanel,
    tableInstance,
  } = useMRT();

  //if no content in row, skip row
  if (!columns?.some((c) => c.Footer)) return null;

  const mTableFooterRowProps =
    muiTableFooterRowProps instanceof Function
      ? muiTableFooterRowProps(footerGroup)
      : muiTableFooterRowProps;

  const tableRowProps = {
    ...mTableFooterRowProps,
    ...footerGroup.getFooterGroupProps(),
    style: {
      ...footerGroup.getFooterGroupProps().style,
      ...(mTableFooterRowProps?.style ?? {}),
    },
  };

  return (
    <TableRow {...tableRowProps}>
      {enableRowNumbers && <MRT_TableSpacerCell />}
      {(enableRowActions || enableRowEditing) &&
        positionActionsColumn === 'first' && <MRT_TableSpacerCell />}
      {(anyRowsCanExpand || renderDetailPanel) && (
        <MRT_TableSpacerCell
          width={`${
            renderDetailPanel ? 2 : tableInstance.expandedDepth + 0.5
          }rem`}
        />
      )}
      {enableSelection && <MRT_TableSpacerCell width="1rem" />}
      {footerGroup.headers.map((column) => (
        <MRT_TableFooterCell
          key={column.getFooterProps().key}
          column={column}
        />
      ))}
      {(enableRowActions || enableRowEditing) &&
        positionActionsColumn === 'last' && <MRT_TableSpacerCell />}
    </TableRow>
  );
};
