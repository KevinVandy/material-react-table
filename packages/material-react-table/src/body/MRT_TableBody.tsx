import { memo, useMemo } from 'react';
import { type VirtualItem, type Virtualizer } from '@tanstack/react-virtual';
import TableBody, { type TableBodyProps } from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { MRT_TableBodyRow, Memo_MRT_TableBodyRow } from './MRT_TableBodyRow';
import { parseFromValuesOrFunc } from '../column.utils';
import { useMRT_RowVirtualizer } from '../hooks';
import { useMRT_Rows } from '../hooks/useMRT_Rows';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TableBodyProps {
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableBody = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
  ...rest
}: Props<TData>) => {
  const {
    getBottomRows,
    getIsSomeRowsPinned,
    getRowModel,
    getState,
    getTopRows,
    options: {
      createDisplayMode,
      enableStickyFooter,
      enableStickyHeader,
      layoutMode,
      localization,
      memoMode,
      muiTableBodyProps,
      renderEmptyRowsFallback,
      rowPinningDisplayMode,
    },
    refs: { tableFooterRef, tableHeadRef, tablePaperRef },
  } = table;
  const { columnFilters, creatingRow, globalFilter, isFullScreen, rowPinning } =
    getState();

  const tableBodyProps = {
    ...parseFromValuesOrFunc(muiTableBodyProps, { table }),
    ...rest,
  };

  const tableHeadHeight =
    ((enableStickyHeader || isFullScreen) &&
      tableHeadRef.current?.clientHeight) ||
    0;
  const tableFooterHeight =
    (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

  const pinnedRowIds = useMemo(
    () =>
      getRowModel()
        .rows.filter((row) => row.getIsPinned())
        .map((r) => r.id),
    [rowPinning, table.getRowModel().rows],
  );

  const rows = useMRT_Rows(table);

  const rowVirtualizer = useMRT_RowVirtualizer(table, rows);

  const virtualRows = rowVirtualizer
    ? rowVirtualizer.getVirtualItems()
    : undefined;

  const commonRowProps = {
    columnVirtualizer,
    numRows: rows.length,
    table,
    virtualColumns,
    virtualPaddingLeft,
    virtualPaddingRight,
  };

  const CreatingRow = creatingRow && createDisplayMode === 'row' && (
    <MRT_TableBodyRow {...commonRowProps} row={creatingRow} rowIndex={-1} />
  );

  return (
    <>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('top') && (
          <TableBody
            {...tableBodyProps}
            sx={(theme) => ({
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              position: 'sticky',
              top: tableHeadHeight - 1,
              zIndex: 1,
              ...(parseFromValuesOrFunc(tableBodyProps?.sx, theme) as any),
            })}
          >
            {getTopRows().map((row, rowIndex) => {
              const props = {
                ...commonRowProps,
                row,
                rowIndex,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </TableBody>
        )}
      {rowVirtualizer && CreatingRow && (
        <TableBody
          {...tableBodyProps}
          sx={(theme) => ({
            display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
            ...(parseFromValuesOrFunc(tableBodyProps?.sx, theme) as any),
          })}
        >
          {CreatingRow}
        </TableBody>
      )}
      <TableBody
        {...tableBodyProps}
        sx={(theme) => ({
          display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
          height: rowVirtualizer
            ? `${rowVirtualizer.getTotalSize()}px`
            : undefined,
          minHeight: !rows.length ? '100px' : undefined,
          position: 'relative',
          ...(parseFromValuesOrFunc(tableBodyProps?.sx, theme) as any),
        })}
      >
        {!rowVirtualizer && CreatingRow}
        {tableBodyProps?.children ??
          (!rows.length && !CreatingRow ? (
            <tr
              style={{
                display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              }}
            >
              <td
                colSpan={table.getVisibleLeafColumns().length}
                style={{
                  display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
                }}
              >
                {renderEmptyRowsFallback?.({ table }) ?? (
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      maxWidth: `min(100vw, ${
                        tablePaperRef.current?.clientWidth ?? 360
                      }px)`,
                      py: '2rem',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    {globalFilter || columnFilters.length
                      ? localization.noResultsFound
                      : localization.noRecordsToDisplay}
                  </Typography>
                )}
              </td>
            </tr>
          ) : (
            <>
              {(virtualRows ?? rows).map((rowOrVirtualRow, rowIndex) => {
                const row = rowVirtualizer
                  ? rows[rowOrVirtualRow.index]
                  : (rowOrVirtualRow as MRT_Row<TData>);
                const props = {
                  ...commonRowProps,
                  measureElement: rowVirtualizer?.measureElement,
                  pinnedRowIds,
                  row,
                  rowIndex: rowVirtualizer ? rowOrVirtualRow.index : rowIndex,
                  virtualRow: rowVirtualizer
                    ? (rowOrVirtualRow as VirtualItem)
                    : undefined,
                };
                return memoMode === 'rows' ? (
                  <Memo_MRT_TableBodyRow
                    key={`${row.id}-${row.index}`}
                    {...props}
                  />
                ) : (
                  <MRT_TableBodyRow key={`${row.id}-${row.index}`} {...props} />
                );
              })}
            </>
          ))}
      </TableBody>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('bottom') && (
          <TableBody
            {...tableBodyProps}
            sx={(theme) => ({
              bottom: tableFooterHeight - 1,
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              position: 'sticky',
              zIndex: 1,
              ...(parseFromValuesOrFunc(tableBodyProps?.sx, theme) as any),
            })}
          >
            {getBottomRows().map((row, rowIndex) => {
              const props = {
                ...commonRowProps,
                row,
                rowIndex,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={`${row.id}`} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </TableBody>
        )}
    </>
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof MRT_TableBody;
