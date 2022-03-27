import React, { ChangeEvent, FC } from 'react';
import { TablePagination } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_TablePagination: FC<Props> = () => {
  const {
    muiTablePaginationProps,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const tablePaginationProps =
    muiTablePaginationProps instanceof Function
      ? muiTablePaginationProps(tableInstance)
      : muiTablePaginationProps;

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    tableInstance.setPageSize(+event.target.value);
    tableInstance.setPageIndex(0);
  };

  const showFirstLastPageButtons =
    tableInstance.getRowModel().rows.length / getState().pagination.pageSize >
    2;

  return (
    <TablePagination
      component={'div'}
      count={tableInstance.getRowModel().rows.length}
      onPageChange={(_, newPage) => tableInstance.setPageIndex(newPage)}
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
