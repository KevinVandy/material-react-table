import TableRow, { type TableRowProps } from '@mui/material/TableRow';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableFooterRowProps<TData extends MRT_RowData>
  extends TableRowProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  footerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooterRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  footerGroup,
  table,
  ...rest
}: MRT_TableFooterRowProps<TData>) => {
  const {
    options: {
      layoutMode,
      mrtTheme: { baseBackgroundColor },
      muiTableFooterRowProps,
    },
  } = table;

  // if no content in row, skip row
  if (
    !footerGroup.headers?.some(
      (header) =>
        (typeof header.column.columnDef.footer === 'string' &&
          !!header.column.columnDef.footer) ||
        header.column.columnDef.Footer,
    )
  ) {
    return null;
  }

  const tableRowProps = {
    ...parseFromValuesOrFunc(muiTableFooterRowProps, {
      footerGroup,
      table,
    }),
    ...rest,
  };

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor: baseBackgroundColor,
        display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
        position: 'relative',
        width: '100%',
        ...(parseFromValuesOrFunc(tableRowProps?.sx, theme) as any),
      })}
    >
      {columnVirtualizer ? (
        <th
          style={{
            display: 'flex',
            width: 'var(--col-mrt-virtualizer-left)',
          }}
        />
      ) : null}
      {(columnVirtualizer?.getVirtualIndexes() ?? footerGroup.headers).map(
        (footerOrVirtualFooterIndex, staticColumnIndex) => {
          let footer = footerOrVirtualFooterIndex as MRT_Header<TData>;
          if (columnVirtualizer) {
            staticColumnIndex = footerOrVirtualFooterIndex as number;
            footer = footerGroup.headers[staticColumnIndex];
          }

          return footer ? (
            <MRT_TableFooterCell
              footer={footer}
              key={footer.id}
              staticColumnIndex={staticColumnIndex}
              table={table}
            />
          ) : null;
        },
      )}
      {columnVirtualizer ? (
        <th
          style={{
            display: 'flex',
            width: 'var(--col-mrt-virtualizer-right)',
          }}
        />
      ) : null}
    </TableRow>
  );
};
