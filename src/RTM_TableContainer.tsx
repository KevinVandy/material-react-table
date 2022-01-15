import React, { FC } from 'react';
import { Paper, TableContainer } from '@mui/material';
import { useReactTableMui } from './useReactTableMui';
import { RTM_Table } from './RTM_Table';

interface Props {}

export const RTM_TableContainer: FC<Props> = () => {
  const { tableContainerProps } = useReactTableMui();

  return (
    <TableContainer component={Paper} {...tableContainerProps}>
      <RTM_Table />
    </TableContainer>
  );
};
