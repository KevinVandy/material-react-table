import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_SelectAllCheckbox } from '../inputs/MRT_SelectAllCheckbox';
import { MRT_ExpandAllButton } from '../inputs/MRT_ExpandAllButton';

interface Props {
  headerGroup: HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const {
    OverrideTableHeadRowComponent,
    anyRowsCanExpand,
    enableExpandAll,
    enableSelection,
    renderDetailPanel,
    tableInstance,
  } = useMaterialReactTable();

  if (OverrideTableHeadRowComponent) {
    return <>{OverrideTableHeadRowComponent(headerGroup, tableInstance)}</>;
  }

  const isParentHeader = headerGroup.headers.some(
    (h) => (h.columns?.length ?? 0) > 0,
  );

  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {enableSelection ? (
        !isParentHeader ? (
          <MRT_SelectAllCheckbox />
        ) : (
          <TableCell style={{ width: '2rem' }} />
        )
      ) : null}
      {anyRowsCanExpand || renderDetailPanel ? (
        enableExpandAll && !isParentHeader ? (
          <MRT_ExpandAllButton />
        ) : (
          <TableCell style={{ width: '2rem' }} />
        )
      ) : null}
      {headerGroup.headers.map((column, index) => (
        <MRT_TableHeadCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
