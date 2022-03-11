import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import { commonTableHeadCellStyles } from './MRT_TableHeadCell';

interface Props {}

export const MRT_TableHeadCellActions: FC<Props> = () => {
  const {
    localization,
    tableInstance: {
      state: { densePadding },
    },
  } = useMRT();

  return (
    <TableCell
      style={{ textAlign: 'center' }}
      sx={{ ...commonTableHeadCellStyles(densePadding), textAlign: 'center' }}
    >
      {localization.actions}
    </TableCell>
  );
};
