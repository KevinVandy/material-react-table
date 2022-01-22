import React, { FC, useMemo } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_SelectAllCheckbox } from '../inputs/MRT_SelectAllCheckbox';
import { MRT_ExpandAllButton } from '../buttons/MRT_ExpandAllButton';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';

interface Props {
  headerGroup: HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const {
    OverrideTableHeadRowComponent,
    anyRowsCanExpand,
    enableColumnHiding,
    enableExpandAll,
    enableSelection,
    renderDetailPanel,
    tableInstance,
  } = useMaterialReactTable();

  if (OverrideTableHeadRowComponent) {
    return <>{OverrideTableHeadRowComponent(headerGroup, tableInstance)}</>;
  }

  const isParentHeader = useMemo(
    () => headerGroup.headers.some((h) => (h.columns?.length ?? 0) > 0),
    [headerGroup.headers],
  );

  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {anyRowsCanExpand || renderDetailPanel ? (
        enableExpandAll && !isParentHeader ? (
          <MRT_ExpandAllButton />
        ) : (
          <TableCell
            style={{ width: `${tableInstance.expandedDepth + 0.5}rem` }}
          />
        )
      ) : null}
      {enableSelection ? (
        !isParentHeader ? (
          <MRT_SelectAllCheckbox />
        ) : (
          <TableCell style={{ width: '1rem' }} />
        )
      ) : null}
      {headerGroup.headers.map((column, index) => (
        <MRT_TableHeadCell
          key={`${index}-${column.id}`}
          column={column}
          index={index}
        />
      ))}
      {enableColumnHiding && !isParentHeader && <MRT_ShowHideColumnsButton />}
    </TableRow>
  );
};
