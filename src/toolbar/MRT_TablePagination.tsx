import React, { ChangeEvent, FC } from 'react';
import { TablePagination } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_TablePagination: FC<Props> = () => {
  const {
    muiTablePaginationProps,
    tableInstance,
    tableInstance: { getRowModel, getState, setPageIndex, setPageSize },
  } = useMRT();

  const tablePaginationProps =
    muiTablePaginationProps instanceof Function
      ? muiTablePaginationProps(tableInstance)
      : muiTablePaginationProps;

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPageIndex(0);
  };

  const showFirstLastPageButtons =
    getRowModel().rows.length / getState().pagination.pageSize > 2;

  return (
    <TablePagination
      component={'div'}
      count={getRowModel().rows.length}
      onPageChange={(_, newPage) => setPageIndex(newPage)}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={getState().pagination.pageIndex}
      rowsPerPage={getState().pagination.pageSize}
      SelectProps={{ style: { margin: '0 1rem 0 1ch' } }}
      showFirstButton={showFirstLastPageButtons}
      showLastButton={showFirstLastPageButtons}
      {...tablePaginationProps}
      sx={{
        m: '0 0.5rem',
        position: 'relative',
        zIndex: 2,
        ...tablePaginationProps?.sx,
      }}
    />
  );
};
