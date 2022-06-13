import React, { ChangeEvent, FC } from 'react';
import { TablePagination } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  instance: MRT_TableInstance;
}

export const MRT_TablePagination: FC<Props> = ({ instance }) => {
  const {
    getPrePaginationRowModel,
    getState,
    setPageIndex,
    setPageSize,
    options: { muiTablePaginationProps },
  } = instance;

  const {
    pagination: { pageSize = 10, pageIndex = 0 },
  } = getState();

  const tablePaginationProps =
    muiTablePaginationProps instanceof Function
      ? muiTablePaginationProps({ instance })
      : muiTablePaginationProps;

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
  };

  const showFirstLastPageButtons =
    getPrePaginationRowModel().rows.length / pageSize > 2;

  return (
    <TablePagination
      SelectProps={{
        sx: { m: '0 1rem 0 1ch' },
        MenuProps: { MenuListProps: { disablePadding: true } },
      }}
      component="div"
      count={getPrePaginationRowModel().rows.length}
      onPageChange={(_: any, newPage: number) => setPageIndex(newPage)}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={pageIndex}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
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
