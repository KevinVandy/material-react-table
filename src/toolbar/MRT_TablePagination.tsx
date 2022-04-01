import React, { ChangeEvent, FC } from 'react';
import { TablePagination } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_TablePagination: FC<Props> = () => {
  const {
    muiTablePaginationProps,
    tableInstance,
    tableInstance: {
      getPrePaginationRowModel,
      getState,
      setPageIndex,
      setPageSize,
    },
  } = useMRT();

  const {
    pagination: { pageSize = 10, pageIndex = 0 },
  } = getState();

  const tablePaginationProps =
    muiTablePaginationProps instanceof Function
      ? muiTablePaginationProps(tableInstance)
      : muiTablePaginationProps;

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
  };

  const showFirstLastPageButtons =
    getPrePaginationRowModel().rows.length / pageSize > 2;

  return (
    <TablePagination
      component="div"
      count={getPrePaginationRowModel().rows.length}
      onPageChange={(_, newPage) => setPageIndex(newPage)}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={pageIndex}
      rowsPerPage={pageSize}
      SelectProps={{ sx: { m: '0 1rem 0 1ch' } }}
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
