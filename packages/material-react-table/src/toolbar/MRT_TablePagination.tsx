import { type ChangeEvent } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  position?: 'bottom' | 'top';
  table: MRT_TableInstance<TData>;
}

export const MRT_TablePagination = <TData extends Record<string, any>>({
  position = 'bottom',
  table,
}: Props<TData>) => {
  const {
    getPrePaginationRowModel,
    getState,
    options: {
      enableToolbarInternalActions,
      localization,
      muiTablePaginationProps,
      rowCount,
    },
    setPageIndex,
    setPageSize,
  } = table;
  const {
    pagination: { pageIndex = 0, pageSize = 10 },
    showGlobalFilter,
  } = getState();

  const totalRowCount = rowCount ?? getPrePaginationRowModel().rows.length;
  const showFirstLastPageButtons = totalRowCount / pageSize > 2;

  const tablePaginationProps = parseFromValuesOrFunc(muiTablePaginationProps, {
    table,
  });

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
      labelDisplayedRows={({ count, from, to }) =>
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
        MenuProps: { MenuListProps: { disablePadding: true }, sx: { m: 0 } },
        sx: { m: '0 1rem 0 1ch' },
        ...tablePaginationProps?.SelectProps,
      }}
      sx={(theme) => ({
        '& . MuiTablePagination-select': {
          m: '0 1px',
        },
        '& .MuiTablePagination-actions': {
          m: '0 1px',
        },
        '& .MuiTablePagination-displayedRows': {
          m: '0 1px',
        },
        '& .MuiTablePagination-selectLabel': {
          m: '0 -1px',
        },
        '& .MuiTablePagination-toolbar': {
          alignItems: 'center',
          display: 'flex',
        },
        '&. MuiInputBase-root': {
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
        ...(parseFromValuesOrFunc(tablePaginationProps?.sx, theme) as any),
      })}
    />
  );
};
