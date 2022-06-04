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

  const { columnDef, columnDefType } = column;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps({ column, tableInstance })
      : muiTableFooterCellProps;

  const mcTableFooterCellProps =
    columnDef.muiTableFooterCellProps instanceof Function
      ? columnDef.muiTableFooterCellProps({ column, tableInstance })
      : columnDef.muiTableFooterCellProps;

  const tableCellProps = {
    ...mTableFooterCellProps,
    ...mcTableFooterCellProps,
  };

  return (
    <TableCell
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={footer.colSpan}
      variant="head"
      {...tableCellProps}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        backgroundImage: `linear-gradient(${alpha(
          theme.palette.common.white,
          0.05,
        )},${alpha(theme.palette.common.white, 0.05)})`,
        fontWeight: 'bold',
        maxWidth: `${column.getSize()}px`,
        minWidth: `${column.getSize()}px`,
        p: isDensePadding ? '0.5rem' : '1rem',
        transition: `all ${enableColumnResizing ? '10ms' : '0.2s'} ease-in-out`,
        width: column.getSize(),
        verticalAlign: 'text-top',
        ...(tableCellProps?.sx as any),
      })}
    >
      <>
        {footer.isPlaceholder
          ? null
          : columnDef.Footer instanceof Function
          ? columnDef.Footer?.({
              footer,
              tableInstance,
            })
          : columnDef.Footer ??
            columnDef.footer ??
            footer.renderFooter() ??
            null}
      </>
    </TableCell>
  );
};
