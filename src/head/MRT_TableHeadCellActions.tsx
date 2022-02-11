import React, { FC } from 'react';
import { useMRT } from '../useMRT';
import { MRT_StyledTableHeadCell } from './MRT_TableHeadCell';

interface Props {}

export const MRT_TableHeadCellActions: FC<Props> = () => {
  const { densePadding, localization } = useMRT();

  return (
    <MRT_StyledTableHeadCell
      densePadding={densePadding}
      style={{ textAlign: 'center' }}
    >
      {localization?.actionsHeadColumnTitle}
    </MRT_StyledTableHeadCell>
  );
};
