import { TableFooter, TablePagination } from '@mui/material';
import React, { FC } from 'react';

interface Props {}

export const MuiTableFooter: FC = () => {
  return (
    <TableFooter>
      <TablePagination rowsPerPageOptions={[10, 50]} />
    </TableFooter>
  );
};
