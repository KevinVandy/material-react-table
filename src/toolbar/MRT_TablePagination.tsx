import React, { ChangeEvent } from 'react';
import { TablePagination } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
  position: 'top' | 'bottom';
}

export const MRT_TablePagination = <TData extends Record<string, any> = {}>({
  table,
  position,
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getState,
    setPageIndex,
    setPageSize,
    options: {
      muiTablePaginationProps,
      enableToolbarInternalActions,
      rowCount,
    },
  } = table;
  const {
    pagination: { pageSize = 10, pageIndex = 0 },
    showGlobalFilter,
  } = getState();

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const showFirstLastPageButtons = totalRowCount / pageSize > 2;

  const tablePaginationProps =
    muiTablePaginationProps instanceof Function
      ? muiTablePaginationProps({ table })
      : muiTablePaginationProps;

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
  };

  return (
    <TablePagination
      SelectProps={{
        sx: { m: '0 1rem 0 1ch' },
        MenuProps: { MenuListProps: { disablePadding: true } },
      }}
      component="div"
      count={totalRowCount}
      onPageChange={(_: any, newPage: number) => setPageIndex(newPage)}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={pageIndex}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
      showFirstButton={showFirstLastPageButtons}
      showLastButton={showFirstLastPageButtons}
      {...tablePaginationProps}
      sx={(theme) => ({
        '& .MuiTablePagination-toolbar': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiTablePagination-selectLabel': {
          m: '0 -1px',
        },
        '&. MuiInputBase-root': {
          m: '0 1px',
        },
        '& . MuiTablePagination-select': {
          m: '0 1px',
        },
        '& .MuiTablePagination-displayedRows': {
          m: '0 1px',
        },
        '& .MuiTablePagination-actions': {
          m: '0 1px',
        },
        mt:
          position === 'top' &&
          enableToolbarInternalActions &&
          !showGlobalFilter
            ? '3.5rem'
            : undefined,
        position: 'relative',
        zIndex: 2,
        ...(tablePaginationProps?.sx instanceof Function
          ? tablePaginationProps.sx(theme)
          : (tablePaginationProps?.sx as any)),
      })}
    />
  );
};
