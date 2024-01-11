import { type RefObject } from 'react';
import { type VirtualItem } from '@tanstack/react-virtual';
import Collapse from '@mui/material/Collapse';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { parseFromValuesOrFunc } from '../column.utils';
import { getMRTTheme } from '../style.utils';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_RowVirtualizer,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TableCellProps {
  parentRowRef: RefObject<HTMLTableRowElement>;
  row: MRT_Row<TData>;
  rowVirtualizer?: MRT_RowVirtualizer;
  staticRowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualRow?: VirtualItem;
}

export const MRT_TableDetailPanel = <TData extends MRT_RowData>({
  parentRowRef,
  row,
  rowVirtualizer,
  staticRowIndex,
  table,
  virtualRow,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    getVisibleLeafColumns,
    options: {
      enableRowVirtualization,
      layoutMode,
      muiDetailPanelProps,
      muiTableBodyRowProps,
      renderDetailPanel,
    },
  } = table;
  const { isLoading } = getState();

  const tableRowProps = parseFromValuesOrFunc(muiTableBodyRowProps, {
    isDetailPanel: true,
    row,
    staticRowIndex,
    table,
  });

  const tableCellProps = {
    ...parseFromValuesOrFunc(muiDetailPanelProps, {
      row,
      table,
    }),
    ...rest,
  };

  const DetailPanel = !isLoading && renderDetailPanel?.({ row, table });

  return (
    <TableRow
      className="Mui-TableBodyCell-DetailPanel"
      data-index={renderDetailPanel ? staticRowIndex * 2 + 1 : staticRowIndex}
      ref={(node: HTMLTableRowElement) => {
        if (node) {
          rowVirtualizer?.measureElement?.(node);
        }
      }}
      {...tableRowProps}
      sx={(theme) => ({
        display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
        position: virtualRow ? 'absolute' : undefined,
        top: virtualRow
          ? `${parentRowRef.current?.getBoundingClientRect()?.height}px`
          : undefined,
        transform: virtualRow
          ? `translateY(${virtualRow?.start}px)`
          : undefined,
        width: '100%',
        ...(parseFromValuesOrFunc(tableRowProps?.sx, theme) as any),
      })}
    >
      <TableCell
        className="Mui-TableBodyCell-DetailPanel"
        colSpan={getVisibleLeafColumns().length}
        {...tableCellProps}
        sx={(theme) => ({
          backgroundColor: virtualRow
            ? getMRTTheme(table, theme).baseBackgroundColor
            : undefined,
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
          py: !!DetailPanel && row.getIsExpanded() ? '1rem' : 0,
          transition: !enableRowVirtualization
            ? 'all 150ms ease-in-out'
            : undefined,
          width: `100%`,
          ...(parseFromValuesOrFunc(tableCellProps?.sx, theme) as any),
        })}
      >
        {enableRowVirtualization ? (
          row.getIsExpanded() && DetailPanel
        ) : (
          <Collapse in={!!row.getIsExpanded()} mountOnEnter unmountOnExit>
            {DetailPanel}
          </Collapse>
        )}
      </TableCell>
    </TableRow>
  );
};
