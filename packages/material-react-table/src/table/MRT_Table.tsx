import { useMemo } from 'react';
import Table, { type TableProps } from '@mui/material/Table';
import { MRT_TableBody, Memo_MRT_TableBody } from '../body/MRT_TableBody';
import { parseFromValuesOrFunc } from '../column.utils';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { useMRT_ColumnVirtualizer } from '../hooks/useMRT_ColumnVirtualizer';
import { parseCSSVarId } from '../style.utils';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> extends TableProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_Table = <TData extends MRT_RowData>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getFlatHeaders,
    getState,
    options: {
      columns,
      enableStickyHeader,
      enableTableFooter,
      enableTableHead,
      layoutMode,
      memoMode,
      muiTableProps,
    },
  } = table;
  const { columnSizing, columnSizingInfo, columnVisibility, isFullScreen } =
    getState();

  const tableProps = {
    ...parseFromValuesOrFunc(muiTableProps, { table }),
    ...rest,
  };

  const columnSizeVars = useMemo(() => {
    const headers = getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const colSize = header.getSize();
      colSizes[`--header-${parseCSSVarId(header.id)}-size`] = colSize;
      colSizes[`--col-${parseCSSVarId(header.column.id)}-size`] = colSize;
    }
    return colSizes;
  }, [columns, columnSizing, columnSizingInfo, columnVisibility]);

  const columnVirtualizer = useMRT_ColumnVirtualizer(table);

  const commonTableGroupProps = {
    columnVirtualizer,
    table,
  };

  return (
    <Table
      stickyHeader={enableStickyHeader || isFullScreen}
      {...tableProps}
      style={{ ...columnSizeVars, ...tableProps?.style }}
      sx={(theme) => ({
        borderCollapse: 'separate',
        display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
        ...(parseFromValuesOrFunc(tableProps?.sx, theme) as any),
      })}
    >
      {enableTableHead && <MRT_TableHead {...commonTableGroupProps} />}
      {memoMode === 'table-body' || columnSizingInfo.isResizingColumn ? (
        <Memo_MRT_TableBody {...commonTableGroupProps} />
      ) : (
        <MRT_TableBody {...commonTableGroupProps} />
      )}
      {enableTableFooter && <MRT_TableFooter {...commonTableGroupProps} />}
    </Table>
  );
};
