import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  footerGroup: HeaderGroup;
}

export const MRT_TableFooterRow: FC<Props> = ({ footerGroup }) => {
  const {
    renderDetailPanel,
    columns,
    anyRowsCanExpand,
    enableColumnHiding,
    enableSelection,
    tableInstance,
    OverrideTableFooterRowComponent,
  } = useMaterialReactTable();

  //if no content in row, skip row
  if (!columns.some((c) => c.Footer)) return null;

  if (OverrideTableFooterRowComponent) {
    return <>{OverrideTableFooterRowComponent(footerGroup, tableInstance)}</>;
  }

  return (
    <TableRow {...footerGroup.getFooterGroupProps()}>
      {(anyRowsCanExpand || renderDetailPanel) && (
        <TableCell
          style={{
            width: `${
              renderDetailPanel ? 2 : tableInstance.expandedDepth + 0.5
            }rem`,
          }}
        />
      )}
      {enableSelection && <MRT_TableSpacerCell width="1rem" />}
      {footerGroup.headers.map((column, index) => (
        <MRT_TableFooterCell key={`${index}-${column.id}`} column={column} />
      ))}
      {enableColumnHiding && <MRT_TableSpacerCell />}
    </TableRow>
  );
};
