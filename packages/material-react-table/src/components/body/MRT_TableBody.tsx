import { memo, useMemo } from 'react';
import TableBody, { type TableBodyProps } from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { MRT_TableBodyRow, Memo_MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMRT_RowVirtualizer } from '../../hooks/useMRT_RowVirtualizer';
import { useMRT_Rows } from '../../hooks/useMRT_Rows';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableBodyProps<TData extends MRT_RowData>
  extends TableBodyProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableBody = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
  ...rest
}: MRT_TableBodyProps<TData>) => {
  const {
    getBottomRows,
    getIsSomeRowsPinned,
    getRowModel,
    getState,
    getTopRows,
    options: {
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
    refs: { tableBodyRef, tableFooterRef, tableHeadRef, tablePaperRef },
  } = table;
  const { columnFilters, globalFilter, isFullScreen, rowPinning } = getState();

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

  const rows = useMRT_Rows(table);

  const rowVirtualizer = useMRT_RowVirtualizer(table, rows);

  // This gets set from direct DOM manipulation in useMRT_RowVirtualizer subsequently
  const initialVirtualTableBodyHeight = useMemo(() => {
    return rowVirtualizer?.getTotalSize();
  }, []);

  const commonRowProps = {
    columnVirtualizer,
    numRows: rows.length,
    table,
  };

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
              return memoMode === 'rows' || rowVirtualizer?.isScrolling ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </TableBody>
        )}
      <TableBody
        {...tableBodyProps}
        ref={(node: HTMLTableSectionElement) => {
          if (node) {
            tableBodyRef.current = node;
            if (tableBodyProps?.ref) {
              //@ts-expect-error
              tableBodyProps.ref.current = node;
            }
          }
        }}
        sx={(theme) => ({
          display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
          minHeight: !rows.length ? '100px' : initialVirtualTableBodyHeight,
          position: 'relative',
          ...(parseFromValuesOrFunc(tableBodyProps?.sx, theme) as any),
        })}
      >
        {tableBodyProps?.children ??
          (!rows.length ? (
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
              {(rowVirtualizer?.getVirtualIndexes() ?? rows).map(
                (rowOrVirtualRowIndex, staticRowIndex) => {
                  let row = rowOrVirtualRowIndex as MRT_Row<TData>;
                  if (rowVirtualizer) {
                    const virtualIndex = rowOrVirtualRowIndex as number;
                    if (renderDetailPanel) {
                      if (virtualIndex % 2 === 1) {
                        return null;
                      } else {
                        staticRowIndex = virtualIndex / 2;
                      }
                    } else {
                      staticRowIndex = virtualIndex;
                    }
                    row = rows[staticRowIndex];
                  }
                  return (
                    <Memo_MRT_TableBodyRow
                      key={row.id}
                      {...commonRowProps}
                      pinnedRowIds={pinnedRowIds}
                      row={row}
                      rowVirtualizer={rowVirtualizer}
                      staticRowIndex={staticRowIndex}
                      virtualRowIndex={
                        rowVirtualizer
                          ? (rowOrVirtualRowIndex as number)
                          : undefined
                      }
                    />
                  );
                },
              )}
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
  (_prev, next) =>
    next.table.options.memoMode === 'table-body' ||
    !!next.table.getState().columnSizingInfo.isResizingColumn,
) as typeof MRT_TableBody;
