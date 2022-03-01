import React, { CSSProperties, FC } from 'react';
import { TableCell } from '@mui/material';
import { useMRT } from '../useMRT';

interface Props {
  width?: CSSProperties['width'];
}

export const MRT_TableSpacerCell: FC<Props> = ({ width }) => {
  const { muiTableBodyCellProps } = useMRT();

  const mTableBodyCellrops =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps()
      : muiTableBodyCellProps;

  const tableCellProps = {
    ...mTableBodyCellrops,
    style: {
      ...mTableBodyCellrops?.style,
    },
  };

  return (
    <TableCell {...tableCellProps} sx={{ width, ...tableCellProps?.sx }} />
  );
};
