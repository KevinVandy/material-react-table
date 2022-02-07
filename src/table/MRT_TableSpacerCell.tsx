import React, { CSSProperties, FC } from 'react';
import { TableCell } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  width?: CSSProperties['width'];
}

export const MRT_TableSpacerCell: FC<Props> = ({ width }) => {
  const { muiTableBodyCellProps } = useMaterialReactTable();

  const mTableBodyCellrops =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps()
      : muiTableBodyCellProps;

  const tableCellProps = {
    ...mTableBodyCellrops,
    style: {
      width,
      ...(mTableBodyCellrops?.style ?? {}),
    },
  };

  return <TableCell {...tableCellProps} />;
};
