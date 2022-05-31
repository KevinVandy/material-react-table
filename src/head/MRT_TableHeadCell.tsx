import React, { FC, ReactNode, Ref } from 'react';
import { Box, TableCell, Theme, alpha, lighten } from '@mui/material';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_TableHeadCellGrabHandle } from './MRT_TableHeadCellGrabHandle';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import { MRT_ToggleColumnActionMenuButton } from '../buttons/MRT_ToggleColumnActionMenuButton';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  dragRef?: Ref<HTMLButtonElement>;
  dropRef?: Ref<HTMLDivElement>;
  header: MRT_Header;
  isDragging?: boolean;
  previewRef?: Ref<HTMLTableCellElement>;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHeadCell: FC<Props> = ({
  dragRef,
  dropRef,
  header,
  isDragging,
  previewRef,
  tableInstance,
}) => {
  const {
    getState,
    options: {
      enableColumnActions,
      enableColumnFilters,
      enableColumnOrdering,
      enableColumnResizing,
      enableGrouping,
      muiTableHeadCellProps,
    },
  } = tableInstance;

  const { isDensePadding } = getState();

  const { column } = header;

  const mTableHeadCellProps =
    muiTableHeadCellProps instanceof Function
      ? muiTableHeadCellProps({ column, tableInstance })
      : muiTableHeadCellProps;

  const mcTableHeadCellProps =
    column.muiTableHeadCellProps instanceof Function
      ? column.muiTableHeadCellProps({ column, tableInstance })
      : column.muiTableHeadCellProps;

  const tableCellProps = {
    ...mTableHeadCellProps,
    ...mcTableHeadCellProps,
  };

  const headerElement = (column.columnDef?.Header?.({
    header,
    tableInstance,
  }) ?? header.renderHeader()) as ReactNode;

  const getIsLastLeftPinnedColumn = () => {
    return (
      column.getIsPinned() === 'left' &&
      tableInstance.getLeftLeafHeaders().length - 1 === column.getPinnedIndex()
    );
  };

  const getIsFirstRightPinnedColumn = () => {
    return column.getIsPinned() === 'right' && column.getPinnedIndex() === 0;
  };

  const getTotalRight = () => {
    return (
      (tableInstance.getRightLeafHeaders().length -
        1 -
        column.getPinnedIndex()) *
      150
    );
  };
  console.log(column.getCanGroup());
  return (
    <TableCell
      align={column.columnDefType === 'group' ? 'center' : 'left'}
      colSpan={header.colSpan}
      {...tableCellProps}
      ref={column.columnDefType === 'data' ? dropRef : undefined}
      sx={(theme: Theme) => ({
        backgroundColor:
          column.getIsPinned() && column.columnDefType !== 'group'
            ? alpha(lighten(theme.palette.background.default, 0.04), 0.95)
            : 'inherit',
        backgroundImage: 'inherit',
        boxShadow: getIsLastLeftPinnedColumn()
          ? `4px 0 4px -2px ${alpha(theme.palette.common.black, 0.1)}`
          : getIsFirstRightPinnedColumn()
          ? `-4px 0 4px -2px ${alpha(theme.palette.common.black, 0.1)}`
          : undefined,
        fontWeight: 'bold',
        height: '100%',
        left:
          column.getIsPinned() === 'left'
            ? `${column.getStart('left')}px`
            : undefined,
        overflow: 'visible',
        p: isDensePadding
          ? column.columnDefType === 'display'
            ? '0 0.5rem'
            : '0.5rem'
          : column.columnDefType === 'display'
          ? '0.5rem 0.75rem'
          : '1rem',
        pb: column.columnDefType === 'display' ? 0 : undefined,
        position:
          column.getIsPinned() && column.columnDefType !== 'group'
            ? 'sticky'
            : undefined,
        pt:
          column.columnDefType === 'display'
            ? 0
            : isDensePadding
            ? '0.75rem'
            : '1.25rem',
        right:
          column.getIsPinned() === 'right' ? `${getTotalRight()}px` : undefined,
        transition: `all ${enableColumnResizing ? 0 : '0.2s'} ease-in-out`,
        verticalAlign: 'text-top',
        zIndex: column.getIsResizing()
          ? 3
          : column.getIsPinned() && column.columnDefType !== 'group'
          ? 2
          : 1,
        ...(tableCellProps?.sx as any),
      })}
      style={{
        maxWidth: `min(${column.getSize()}px, fit-content)`,
        minWidth: `max(${column.getSize()}px, ${column.minSize ?? 30}px)`,
        width: header.getSize(),
      }}
    >
      {header.isPlaceholder ? null : column.columnDefType === 'display' ? (
        headerElement
      ) : (
        <Box
          ref={previewRef}
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            justifyContent:
              column.columnDefType === 'group' ? 'center' : 'space-between',
            opacity: isDragging ? 0.5 : 1,
            width: '100%',
          }}
        >
          <Box
            onClick={() => column.toggleSorting()}
            sx={{
              alignItems: 'center',
              cursor:
                column.getCanSort() && column.columnDefType !== 'group'
                  ? 'pointer'
                  : undefined,
              display: 'flex',
              flexWrap: 'nowrap',
              whiteSpace:
                (column.columnDef.header?.length ?? 0) < 24
                  ? 'nowrap'
                  : 'normal',
            }}
          >
            {headerElement}
            {column.columnDefType === 'data' && column.getCanSort() && (
              <MRT_TableHeadCellSortLabel
                header={header}
                tableInstance={tableInstance}
              />
            )}
            {column.columnDefType === 'data' &&
              enableColumnFilters &&
              column.getCanFilter() && (
                <MRT_TableHeadCellFilterLabel
                  header={header}
                  tableInstance={tableInstance}
                />
              )}
          </Box>
          <Box sx={{ whiteSpace: 'nowrap' }}>
            {column.columnDefType === 'data' &&
              ((enableColumnOrdering &&
                column.enableColumnOrdering !== false) ||
                (enableGrouping && column.enableGrouping !== false)) && (
                <MRT_TableHeadCellGrabHandle
                  header={header}
                  ref={dragRef as Ref<HTMLButtonElement>}
                  tableInstance={tableInstance}
                />
              )}
            {(enableColumnActions || column.enableColumnActions) &&
              column.enableColumnActions !== false &&
              column.columnDefType !== 'group' && (
                <MRT_ToggleColumnActionMenuButton
                  header={header}
                  tableInstance={tableInstance}
                />
              )}
          </Box>
          {column.getCanResize() && (
            <MRT_TableHeadCellResizeHandle
              header={header}
              tableInstance={tableInstance}
            />
          )}
        </Box>
      )}
      {column.columnDefType === 'data' && column.getCanFilter() && (
        <MRT_TableHeadCellFilterContainer
          header={header}
          tableInstance={tableInstance}
        />
      )}
    </TableCell>
  );
};
