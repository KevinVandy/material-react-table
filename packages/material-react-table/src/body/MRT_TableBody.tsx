import { memo, useMemo } from 'react';
import { type VirtualItem } from '@tanstack/react-virtual';
import TableBody, { type TableBodyProps } from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { MRT_TableBodyRow, Memo_MRT_TableBodyRow } from './MRT_TableBodyRow';
import { parseFromValuesOrFunc } from '../column.utils';
import { useMRT_RowVirtualizer } from '../hooks';
import { useMRT_Rows } from '../hooks/useMRT_Rows';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TableBodyProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBody = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
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
      renderDetailPanel,
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

  const pinnedRowIds = useMemo(() => {
    if (!rowPinning.bottom?.length && !rowPinning.top?.length) return [];
    return getRowModel()
      .rows.filter((row) => row.getIsPinned())
      .map((r) => r.id);
  }, [rowPinning, getRowModel().rows]);

  const rows = useMRT_Rows(table, pinnedRowIds);

  const rowVirtualizer = useMRT_RowVirtualizer(table, rows);

  const { virtualRows } = rowVirtualizer ?? {};

  const commonRowProps = {
    columnVirtualizer,
    numRows: rows.length,
    table,
  };

  const CreatingRow = creatingRow && createDisplayMode === 'row' && (
    <MRT_TableBodyRow
      {...commonRowProps}
      row={creatingRow}
      staticRowIndex={-1}
    />
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
            {getTopRows().map((row, staticRowIndex) => {
              const props = {
                ...commonRowProps,
                row,
                staticRowIndex,
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
              {(virtualRows ?? rows).map((rowOrVirtualRow, staticRowIndex) => {
                if (rowVirtualizer) {
                  if (renderDetailPanel) {
                    if (rowOrVirtualRow.index % 2 === 1) {
                      return null;
                    } else {
                      staticRowIndex = rowOrVirtualRow.index / 2;
                    }
                  } else {
                    staticRowIndex = rowOrVirtualRow.index;
                  }
                }
                const row = rowVirtualizer
                  ? rows[staticRowIndex]
                  : (rowOrVirtualRow as MRT_Row<TData>);
                const props = {
                  ...commonRowProps,
                  pinnedRowIds,
                  row,
                  rowVirtualizer,
                  staticRowIndex,
                  virtualRow: rowVirtualizer
                    ? (rowOrVirtualRow as VirtualItem)
                    : undefined,
                };
                const key = `${row.id}-${row.index}`;
                return memoMode === 'rows' ? (
                  <Memo_MRT_TableBodyRow key={key} {...props} />
                ) : (
                  <MRT_TableBodyRow key={key} {...props} />
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
            {getBottomRows().map((row, staticRowIndex) => {
              const props = {
                ...commonRowProps,
                row,
                staticRowIndex,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
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
