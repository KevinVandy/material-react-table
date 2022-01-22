import React, { CSSProperties, FC } from 'react';
import { TableCell } from '@mui/material';

interface Props {
  width?: CSSProperties['width'];
}

export const MRT_TableSpacerCell: FC<Props> = ({ width }) => {
  return <TableCell style={{ width }} />;
};
