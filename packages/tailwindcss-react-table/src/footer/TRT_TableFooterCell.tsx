import React from 'react';
import TableCell from '@mui/material/TableCell';
import { getCommonCellStyles } from '../column.utils';
import type { TRT_Header, TRT_TableInstance } from '../TailwindCSSReactTable.d';

interface Props {
  footer: TRT_Header;
  table: TRT_TableInstance;
}

export const TRT_TableFooterCell = ({ footer, table }: Props) => {
  const {
    getState,
    options: { layoutMode, tableFooterCellProps },
  } = table;
  const { density } = getState();
  const { column } = footer;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const mTableFooterCellProps =
    tableFooterCellProps instanceof Function
      ? tableFooterCellProps({ column, table })
      : tableFooterCellProps;

  const mcTableFooterCellProps =
    columnDef.tableFooterCellProps instanceof Function
      ? columnDef.tableFooterCellProps({ column, table })
      : columnDef.tableFooterCellProps;

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
        display: layoutMode === 'grid' ? 'grid' : 'table-cell',
        fontWeight: 'bold',
        justifyContent: columnDefType === 'group' ? 'center' : undefined,
        p:
          density === 'compact'
            ? '0.5rem'
            : density === 'comfortable'
            ? '1rem'
            : '1.5rem',
        verticalAlign: 'top',
        zIndex: column.getIsPinned() && columnDefType !== 'group' ? 2 : 1,
        ...getCommonCellStyles({
          column,
          table,
          theme,
          tableCellProps,
        }),
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
