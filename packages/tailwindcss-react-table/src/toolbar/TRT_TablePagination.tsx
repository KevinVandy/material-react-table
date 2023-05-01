import React, { ChangeEvent } from 'react';
import TablePagination from '@mui/material/TablePagination';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.types';

interface Props<TData extends Record<string, any> = {}> {
  position?: 'top' | 'bottom';
  table: TRT_TableInstance<TData>;
}

export const TRT_TablePagination = <TData extends Record<string, any> = {}>({
  table,
  position = 'bottom',
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getState,
    setPageIndex,
    setPageSize,
    options: { enableToolbarInternalActions, localization, rowCount },
  } = table;
  const {
    pagination: { pageSize = 10, pageIndex = 0 },
    showGlobalFilter,
  } = getState();

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const showFirstLastPageButtons = totalRowCount / pageSize > 2;

  let {
    options: { tablePaginationProps },
  } = table;
  tablePaginationProps =
    tablePaginationProps instanceof Function
      ? tablePaginationProps({ table })
      : tablePaginationProps;

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
  };

  return (
    <TablePagination
      component="div"
      count={totalRowCount}
      getItemAriaLabel={(type) =>
        type === 'first'
          ? localization.goToFirstPage
          : type === 'last'
          ? localization.goToLastPage
          : type === 'next'
          ? localization.goToNextPage
          : localization.goToPreviousPage
      }
      labelDisplayedRows={({ from, to, count }) =>
        `${from}-${to} ${localization.of} ${count}`
      }
      labelRowsPerPage={localization.rowsPerPage}
      onPageChange={(_: any, newPage: number) => setPageIndex(newPage)}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={Math.max(
        Math.min(pageIndex, Math.ceil(totalRowCount / pageSize) - 1),
        0,
      )}
      rowsPerPage={pageSize}
      rowsPerPageOptions={[5, 10, 15, 20, 25, 30, 50, 100]}
      showFirstButton={showFirstLastPageButtons}
      showLastButton={showFirstLastPageButtons}
      {...tablePaginationProps}
      SelectProps={{
        sx: { m: '0 1rem 0 1ch' },
        MenuProps: { MenuListProps: { disablePadding: true }, sx: { m: 0 } },
        ...tablePaginationProps?.SelectProps,
      }}
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
        ...((tablePaginationProps as any)?.sx instanceof Function
          ? (tablePaginationProps as any).sx(theme)
          : ((tablePaginationProps as any)?.sx as any)),
      })}
    />
  );
};
