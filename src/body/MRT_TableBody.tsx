import React, { FC } from 'react';
import {
  CircularProgress,
  styled,
  TableBody as MuiTableBody,
} from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMaterialReactTable } from '../useMaterialReactTable';

const TableBody = styled(MuiTableBody)({
  overflowY: 'hidden',
});

const CircularProgressWrapper = styled('div')({
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  display: 'grid',
  height: '100%',
  justifyContent: 'center',
  margin: 'auto',
  paddingTop: '5rem',
  position: 'fixed',
  width: 'calc(100% - 2rem)',
});

interface Props {}

export const MRT_TableBody: FC<Props> = () => {
  const { tableInstance, muiTableBodyProps, isLoading, enablePagination } =
    useMaterialReactTable();

  const rows = enablePagination ? tableInstance.page : tableInstance.rows;

  return (
    <>
      <TableBody {...muiTableBodyProps} {...tableInstance.getTableBodyProps()}>
        {isLoading && (
          <CircularProgressWrapper>
            <CircularProgress />
          </CircularProgressWrapper>
        )}
        {rows.map((row, index) => {
          tableInstance.prepareRow(row);
          return <MRT_TableBodyRow key={`${index}-${row.id}`} row={row} />;
        })}
      </TableBody>
    </>
  );
};
