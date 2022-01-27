import React, { FC } from 'react';
import {
  alpha,
  CircularProgress,
  styled,
  TableBody as MuiTableBody,
} from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMaterialReactTable } from '../useMaterialReactTable';

const TableBody = styled(MuiTableBody)({
  overflowY: 'hidden',
});

const CircularProgressWrapper = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.5),
  display: 'grid',
  height: '100%',
  justifyContent: 'center',
  margin: 'auto',
  paddingTop: '5rem',
  position: 'fixed',
  width: 'calc(100% - 2rem)',
}));

interface Props {}

export const MRT_TableBody: FC<Props> = () => {
  const { tableInstance, muiTableBodyProps, isLoading, manualPagination } =
    useMaterialReactTable();

  const rows = manualPagination ? tableInstance.rows : tableInstance.page;

  const tableBodyProps = {
    ...muiTableBodyProps,
    ...tableInstance.getTableBodyProps(),
    style: {
      ...tableInstance.getTableBodyProps().style,
      ...(muiTableBodyProps?.style ?? {}),
    },
  };

  return (
    <TableBody {...tableBodyProps}>
      {isLoading && (
        <CircularProgressWrapper>
          <CircularProgress />
        </CircularProgressWrapper>
      )}
      {rows.map((row) => {
        tableInstance.prepareRow(row);
        return <MRT_TableBodyRow key={row.getRowProps().key} row={row} />;
      })}
    </TableBody>
  );
};
