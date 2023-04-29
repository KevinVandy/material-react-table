import React from 'react';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { lighten } from '@mui/material/styles';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { TRT_Row, TRT_TableInstance } from '../TailwindCSSReactTable.d';

interface Props {
  parentRowRef: React.RefObject<HTMLTableRowElement>;
  row: TRT_Row;
  rowIndex: number;
  table: TRT_TableInstance;
  virtualRow?: VirtualItem;
}

export const TRT_TableDetailPanel = ({
  parentRowRef,
  row,
  rowIndex,
  table,
  virtualRow,
}: Props) => {
  const {
    getVisibleLeafColumns,
    getState,
    options: {
      layoutMode,
      tableBodyRowProps,
      tableDetailPanelProps,
      renderDetailPanel,
    },
  } = table;
  const { isLoading } = getState();

  const tableRowProps =
    tableBodyRowProps instanceof Function
      ? tableBodyRowProps({
          isDetailPanel: true,
          row,
          staticRowIndex: rowIndex,
          table,
        })
      : tableBodyRowProps;

  const tableCellProps =
    tableDetailPanelProps instanceof Function
      ? tableDetailPanelProps({ row, table })
      : tableDetailPanelProps;

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
