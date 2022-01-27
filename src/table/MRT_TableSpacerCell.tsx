import React, { CSSProperties, FC } from 'react';
import { TableCell } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  width?: CSSProperties['width'];
}

export const MRT_TableSpacerCell: FC<Props> = ({ width }) => {
  const { muiTableBodyCellProps } = useMaterialReactTable();

  const mTableBodyRowProps =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps()
      : muiTableBodyCellProps;

  const tableCellProps = {
    ...mTableBodyRowProps,
    style: {
      width,
      ...(mTableBodyRowProps?.style ?? {}),
    },
  };

  return <TableCell {...tableCellProps} />;
};
