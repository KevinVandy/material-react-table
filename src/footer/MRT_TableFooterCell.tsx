import React, { FC } from 'react';
import { alpha, TableCell } from '@mui/material';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  footer: MRT_Header;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableFooterCell: FC<Props> = ({ footer, tableInstance }) => {
  const {
    getState,
    options: { muiTableFooterCellProps, enableColumnResizing },
  } = tableInstance;

  const { isDensePadding } = getState();

  const { column } = footer;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps({ column, tableInstance })
      : muiTableFooterCellProps;

  const mcTableFooterCellProps =
    column.muiTableFooterCellProps instanceof Function
      ? column.muiTableFooterCellProps({ column, tableInstance })
      : column.muiTableFooterCellProps;

  const tableCellProps = {
    ...footer.getFooterProps(),
    ...mTableFooterCellProps,
    ...mcTableFooterCellProps,
  };

  return (
    <TableCell
      align={column.columnDefType === 'group' ? 'center' : 'left'}
      variant="head"
      {...tableCellProps}
      //@ts-ignore
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        backgroundImage: `linear-gradient(${alpha(
          theme.palette.common.white,
          0.05,
        )},${alpha(theme.palette.common.white, 0.05)})`,
        fontWeight: 'bold',
        p: isDensePadding ? '0.5rem' : '1rem',
        transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
        verticalAlign: 'text-top',
        //@ts-ignore
        ...tableCellProps?.sx,
      })}
    >
      {footer.isPlaceholder
        ? null
        : column.Footer?.({
            footer,
            tableInstance,
          }) ??
          column.footer ??
          null}
    </TableCell>
  );
};
