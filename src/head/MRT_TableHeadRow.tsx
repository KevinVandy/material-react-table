import React, { FC, useMemo } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_SelectAllCheckbox } from '../inputs/MRT_SelectAllCheckbox';
import { MRT_ExpandAllButton } from '../buttons/MRT_ExpandAllButton';
import { MRT_TableSpacerCell } from '../table/MRT_TableSpacerCell';

interface Props {
  headerGroup: HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const {
    anyRowsCanExpand,
    disableExpandAll,
    enableSelection,
    enableRowActions,
    renderDetailPanel,
    tableInstance,
    muiTableHeadRowProps,
  } = useMaterialReactTable();

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
      ...(mTableHeadRowProps?.style ?? {}),
    },
  };

  return (
    <TableRow {...tableRowProps}>
      {enableRowActions && <TableCell>Actions</TableCell>}
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
          <MRT_SelectAllCheckbox />
        ) : (
          <MRT_TableSpacerCell width="1rem" />
        )
      ) : null}
      {headerGroup.headers.map((column) => (
        <MRT_TableHeadCell key={column.getHeaderProps().key} column={column} />
      ))}
    </TableRow>
  );
};
