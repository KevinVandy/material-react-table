import React, { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_SelectAllCheckbox } from '../inputs/MRT_SelectAllCheckbox';

interface Props {
  headerGroup: HeaderGroup;
}

export const MRT_TableHeadRow: FC<Props> = ({ headerGroup }) => {
  const { renderDetailPanel, enableSelection } = useMaterialReactTable();

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
      {renderDetailPanel && <TableCell style={{ width: '2rem' }} />}
      {headerGroup.headers.map((column, index) => (
        <MRT_TableHeadCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
