import TableCell from '@mui/material/TableCell';
import { getCommonCellStyles } from '../column.utils';
import { type MRT_Header, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  footer: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooterCell = <TData extends Record<string, any>>({
  footer,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { layoutMode, muiTableFooterCellProps },
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
