import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { useMRT } from '../useMRT';
import type { MRT_Header, MRT_HeaderGroup } from '..';

interface Props {
  footerGroup: MRT_HeaderGroup;
}

export const MRT_TableFooterRow: FC<Props> = ({ footerGroup }) => {
  const { columns, muiTableFooterRowProps } = useMRT();

  //if no content in row, skip row
  if (!columns?.some((c) => c.footer || c.Footer)) return null;

  const mTableFooterRowProps =
    muiTableFooterRowProps instanceof Function
      ? muiTableFooterRowProps(footerGroup)
      : muiTableFooterRowProps;

  const tableRowProps = {
    ...footerGroup.getFooterGroupProps(),
    ...mTableFooterRowProps,
  };

  return (
    <TableRow {...tableRowProps}>
      {footerGroup.headers.map((footer: MRT_Header) => (
        <MRT_TableFooterCell
          key={footer.getFooterProps().key}
          footer={footer}
        />
      ))}
    </TableRow>
  );
};
