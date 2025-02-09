import { useCallback, type RefObject } from 'react';
import Collapse from '@mui/material/Collapse';
import TableCell, { type TableCellProps } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_RowVirtualizer,
  type MRT_TableInstance,
} from '../../types';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableDetailPanelProps<TData extends MRT_RowData>
  extends TableCellProps {
  parentRowRef: RefObject<HTMLTableRowElement | null>;
  row: MRT_Row<TData>;
  rowVirtualizer?: MRT_RowVirtualizer;
  staticRowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualRowIndex?: number;
}

export const MRT_TableDetailPanel = <TData extends MRT_RowData>({
  parentRowRef,
  row,
  rowVirtualizer,
  staticRowIndex,
  table,
  virtualRowIndex,
  ...rest
}: MRT_TableDetailPanelProps<TData>) => {
  const {
    getState,
    getVisibleLeafColumns,
    options: {
      layoutMode,
      mrtTheme: { baseBackgroundColor },
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

  const isVirtualRow = virtualRowIndex !== undefined;

  return (
    <TableRow
      className="Mui-TableBodyCell-DetailPanel"
      data-index={renderDetailPanel ? staticRowIndex * 2 + 1 : staticRowIndex}
      ref={useCallback((node: HTMLTableRowElement) => {
        if (node) {
          rowVirtualizer?.measureElement?.(node);
        }
      }, [])}
      {...tableRowProps}
      sx={(theme) => ({
        display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
        position: isVirtualRow ? 'absolute' : undefined,
        top: isVirtualRow
          ? `${parentRowRef.current?.getBoundingClientRect()?.height}px`
          : undefined,
        transform: isVirtualRow
          ? `translateY(${virtualRowIndex}px)`
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
          backgroundColor: isVirtualRow ? baseBackgroundColor : undefined,
          borderBottom: !row.getIsExpanded() ? 'none' : undefined,
          display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
          py: !!DetailPanel && row.getIsExpanded() ? '1rem' : 0,
          transition: !isVirtualRow ? 'all 150ms ease-in-out' : undefined,
          width: `100%`,
          ...(parseFromValuesOrFunc(tableCellProps?.sx, theme) as any),
        })}
      >
        {isVirtualRow ? (
          row.getIsExpanded() && DetailPanel
        ) : (
          <Collapse in={row.getIsExpanded()} mountOnEnter unmountOnExit>
            {DetailPanel}
          </Collapse>
        )}
      </TableCell>
    </TableRow>
  );
};
