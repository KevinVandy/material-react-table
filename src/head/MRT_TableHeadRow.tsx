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
  const { renderDetailPanel, enableSelection } =
    useMaterialReactTable();

  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {enableSelection && <MRT_SelectAllCheckbox />}
      {renderDetailPanel && <TableCell style={{ width: '2rem' }} />}
      {headerGroup.headers.map((column, index) => (
        <MRT_TableHeadCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
