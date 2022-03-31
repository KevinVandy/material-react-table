import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import { commonTableHeadCellStyles } from './MRT_TableHeadCell';

interface Props {}

export const MRT_TableHeadCellActions: FC<Props> = () => {
  const {
    localization,
    tableInstance: { getState },
  } = useMRT();

  const { isDensePadding } = getState();

  return (
    <TableCell
      style={{ textAlign: 'center' }}
      sx={{
        ...commonTableHeadCellStyles({ isDensePadding }),
        textAlign: 'center',
        maxWidth: '4rem',
        width: '4rem',
      }}
    >
      {localization.actions}
    </TableCell>
  );
};
