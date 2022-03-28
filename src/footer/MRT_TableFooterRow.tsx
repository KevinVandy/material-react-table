import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';
import { useMRT } from '../useMRT';
import type { MRT_Header, MRT_HeaderGroup } from '..';

interface Props {
  footerGroup: MRT_HeaderGroup;
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
  if (!columns?.some((c) => c.footer)) return null;

  const mTableFooterRowProps =
    muiTableFooterRowProps instanceof Function
      ? muiTableFooterRowProps(footerGroup)
      : muiTableFooterRowProps;

  const tableRowProps = {
    ...footerGroup.getFooterGroupProps(),
    ...mTableFooterRowProps,
  };

  return (
    <TableRow {...tableRowProps}>
      {enableRowNumbers && <MRT_TableSpacerCell />}
      {(enableRowActions || enableRowEditing) &&
        positionActionsColumn === 'first' && <MRT_TableSpacerCell />}
      {(anyRowsCanExpand || renderDetailPanel) && (
        <MRT_TableSpacerCell
          width={`${
            renderDetailPanel ? 2 : tableInstance.getExpandedDepth() + 0.5
          }rem`}
        />
      )}
      {enableSelection && <MRT_TableSpacerCell width="1rem" />}
      {footerGroup.headers.map((footer: MRT_Header) => (
        <MRT_TableFooterCell
          key={footer.getFooterGroupProps().key}
          footer={footer}
        />
      ))}
      {(enableRowActions || enableRowEditing) &&
        positionActionsColumn === 'last' && <MRT_TableSpacerCell />}
    </TableRow>
  );
};
