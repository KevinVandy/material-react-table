import React, { FC, useState } from 'react';
import { TablePagination, TableRow } from '@mui/material';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const RTM_TableFooterPagination: FC<Props> = () => {
  const { tableInstance } = useReactTableMui();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableRow>
      <TablePagination
        page={page}
        count={tableInstance.rows.length}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableRow>
  );
};
