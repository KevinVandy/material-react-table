import TableCell from '@mui/material/TableCell';
import { getCommonCellStyles, parseFromValuesOrFunc } from '../column.utils';
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

  const tableCellProps = {
    ...parseFromValuesOrFunc(muiTableFooterCellProps, { column, table }),
    ...parseFromValuesOrFunc(columnDef.muiTableFooterCellProps, {
      column,
      table,
    }),
  };

  return (
    <TableCell
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={footer.colSpan}
      variant="head"
      {...tableCellProps}
      sx={(theme) => ({
        display: layoutMode?.startsWith('grid') ? 'grid' : 'table-cell',
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
          tableCellProps,
          theme,
        }),
      })}
    >
      <>
        {footer.isPlaceholder
          ? null
          : parseFromValuesOrFunc(columnDef.Footer, {
              column,
              footer,
              table,
            }) ??
            columnDef.footer ??
            null}
      </>
    </TableCell>
  );
};
