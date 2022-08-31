import React, { ChangeEvent, FC } from 'react';
import { TablePagination } from '@mui/material';
import { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
  position: 'top' | 'bottom';
}

export const MRT_TablePagination: FC<Props> = ({ table, position }) => {
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
        mt:
          position === 'top' &&
          enableToolbarInternalActions &&
          !showGlobalFilter
            ? '3.5rem'
            : '-0.25rem',
        position: 'relative',
        zIndex: 2,
        ...(tablePaginationProps?.sx instanceof Function
          ? tablePaginationProps.sx(theme)
          : (tablePaginationProps?.sx as any)),
      })}
    />
  );
};
