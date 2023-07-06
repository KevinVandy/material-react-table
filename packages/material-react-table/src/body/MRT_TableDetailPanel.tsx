import { type RefObject } from 'react';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { lighten } from '@mui/material/styles';
import { type VirtualItem } from '@tanstack/react-virtual';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  parentRowRef: RefObject<HTMLTableRowElement>;
  row: MRT_Row<TData>;
  rowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualRow?: VirtualItem;
}

export const MRT_TableDetailPanel = <TData extends Record<string, any>>({
  parentRowRef,
  row,
  rowIndex,
  table,
  virtualRow,
}: Props<TData>) => {
  const {
    getVisibleLeafColumns,
    getState,
    options: {
      layoutMode,
      muiTableBodyRowProps,
      muiDetailPanelProps,
      renderDetailPanel,
    },
  } = table;
  const { isLoading } = getState();

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({
          isDetailPanel: true,
          row,
          staticRowIndex: rowIndex,
          table,
        })
      : muiTableBodyRowProps;

  const tableCellProps =
    muiDetailPanelProps instanceof Function
      ? muiDetailPanelProps({ row, table })
      : muiDetailPanelProps;

  return (
    <TableRow
      className="Mui-TableBodyCell-DetailPanel"
      {...tableRowProps}
      sx={(theme) => ({
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        position: virtualRow ? 'absolute' : undefined,
        top: virtualRow
          ? `${parentRowRef.current?.getBoundingClientRect()?.height}px`
          : undefined,
        transform: virtualRow
          ? `translateY(${virtualRow?.start}px)`
          : undefined,
        width: '100%',
        zIndex: virtualRow ? 2 : undefined,
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps.sx(theme)
          : (tableRowProps?.sx as any)),
      })}
    >
      <TableCell
        className="Mui-TableBodyCell-DetailPanel"
        colSpan={getVisibleLeafColumns().length}
        {...tableCellProps}
        sx={(theme) => ({
          backgroundColor: virtualRow
            ? lighten(theme.palette.background.default, 0.06)
            : undefined,
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          display: layoutMode === 'grid' ? 'flex' : 'table-cell',
          pb: row.getIsExpanded() ? '1rem' : 0,
          pt: row.getIsExpanded() ? '1rem' : 0,
          transition: 'all 150ms ease-in-out',
          width: `${table.getTotalSize()}px`,
          ...(tableCellProps?.sx instanceof Function
            ? tableCellProps.sx(theme)
            : (tableCellProps?.sx as any)),
        })}
      >
        {renderDetailPanel && (
          <Collapse in={row.getIsExpanded()} mountOnEnter unmountOnExit>
            {!isLoading && renderDetailPanel({ row, table })}
          </Collapse>
        )}
      </TableCell>
    </TableRow>
  );
};
