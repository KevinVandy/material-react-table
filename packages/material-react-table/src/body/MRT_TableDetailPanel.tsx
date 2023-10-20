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
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TableCellProps {
  parentRowRef: RefObject<HTMLTableRowElement>;
  row: MRT_Row<TData>;
  rowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualRow?: VirtualItem;
}

export const MRT_TableDetailPanel = <TData extends MRT_RowData>({
  parentRowRef,
  row,
  rowIndex,
  table,
  virtualRow,
  ...rest
}: Props<TData>) => {
  const {
    getState,
    getVisibleLeafColumns,
    options: {
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
    staticRowIndex: rowIndex,
    table,
  });

  const tableCellProps = {
    ...parseFromValuesOrFunc(muiDetailPanelProps, {
      row,
      table,
    }),
    ...rest,
  };

  return (
    <TableRow
      className="Mui-TableBodyCell-DetailPanel"
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
        zIndex: virtualRow ? 2 : undefined,
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
          py: row.getIsExpanded() ? '1rem' : 0,
          transition: 'all 150ms ease-in-out',
          width: `${table.getTotalSize()}px`,
          ...(parseFromValuesOrFunc(tableCellProps?.sx, theme) as any),
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
