import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { getCommonCellStyles } from '../column.utils';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  footer: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableFooterCell: FC<Props> = ({ footer, table }) => {
  const {
    getState,
    options: { muiTableFooterCellProps },
  } = table;
  const { density } = getState();
  const { column } = footer;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const mTableFooterCellProps =
    muiTableFooterCellProps instanceof Function
      ? muiTableFooterCellProps({ column, table })
      : muiTableFooterCellProps;

  const mcTableFooterCellProps =
    columnDef.muiTableFooterCellProps instanceof Function
      ? columnDef.muiTableFooterCellProps({ column, table })
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
        fontWeight: 'bold',
        p:
          density === 'compact'
            ? '0.5rem'
            : density === 'comfortable'
            ? '1rem'
            : '1.5rem',
        verticalAlign: 'top',
        ...getCommonCellStyles({ column, table, theme, tableCellProps }),
      })}
    >
      <>
        {footer.isPlaceholder
          ? null
          : (columnDef.Footer instanceof Function
              ? columnDef.Footer?.({
                  column,
                  footer,
                  table,
                })
              : columnDef.Footer) ??
            columnDef.footer ??
            null}
      </>
    </TableCell>
  );
};
