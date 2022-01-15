import React, { ChangeEvent, FC } from 'react';
import { TablePagination, TableRow } from '@mui/material';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const RTM_TableFooterPagination: FC<Props> = () => {
  const { tableInstance, tablePaginationProps } = useReactTableMui();

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    tableInstance.setPageSize(+event.target.value);
    tableInstance.gotoPage(0);
  };

  return (
    <TableRow>
      <TablePagination
        count={tableInstance.rows.length}
        onPageChange={(_, newPage) => tableInstance.gotoPage(newPage)}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={tableInstance.state.pageIndex}
        rowsPerPage={tableInstance.state.pageSize}
        {...tablePaginationProps}
      />
    </TableRow>
  );
};
