import React, {
  DragEvent,
  FC,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box, TableCell, Theme, Tooltip, useTheme } from '@mui/material';
import { MRT_TableHeadCellColumnActionsButton } from './MRT_TableHeadCellColumnActionsButton';
import { MRT_TableHeadCellFilterContainer } from './MRT_TableHeadCellFilterContainer';
import { MRT_TableHeadCellFilterLabel } from './MRT_TableHeadCellFilterLabel';
import { MRT_TableHeadCellGrabHandle } from './MRT_TableHeadCellGrabHandle';
import { MRT_TableHeadCellResizeHandle } from './MRT_TableHeadCellResizeHandle';
import { MRT_TableHeadCellSortLabel } from './MRT_TableHeadCellSortLabel';
import { getCommonCellStyles } from '../column.utils';
import type { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_TableHeadCell: FC<Props> = ({ header, table }) => {
  const theme = useTheme();
  const {
    getState,
    options: {
      enableColumnActions,
      enableColumnDragging,
      enableColumnOrdering,
      enableGrouping,
      enableMultiSort,
      muiTableHeadCellProps,
    },
    setHoveredColumn,
  } = table;
  const {
    density,
    draggingColumn,
    grouping,
    hoveredColumn,
    showColumnFilters,
  } = getState();
  const { column } = header;
  const { columnDef } = column;
  const { columnDefType } = columnDef;

  const headerEl = useRef<HTMLDivElement>();
  const [openHeaderTooltip, setOpenHeaderTooltip] = useState(false);

  const mTableHeadCellProps =
    muiTableHeadCellProps instanceof Function
      ? muiTableHeadCellProps({ column, table })
      : muiTableHeadCellProps;

  const mcTableHeadCellProps =
    columnDef.muiTableHeadCellProps instanceof Function
      ? columnDef.muiTableHeadCellProps({ column, table })
      : columnDef.muiTableHeadCellProps;

  const tableCellProps = {
    ...mTableHeadCellProps,
    ...mcTableHeadCellProps,
  };

  const showColumnActions =
    (enableColumnActions || columnDef.enableColumnActions) &&
    columnDef.enableColumnActions !== false;

  const showDragHandle =
    enableColumnDragging !== false &&
    columnDef.enableColumnDragging !== false &&
    (enableColumnDragging ||
      (enableColumnOrdering && columnDef.enableColumnOrdering !== false) ||
      (enableGrouping &&
        columnDef.enableGrouping !== false &&
        !grouping.includes(column.id)));

  const headerPL = useMemo(() => {
    let pl = 0;
    if (column.getCanSort()) pl++;
    if (showColumnActions) pl += 2;
    if (showDragHandle) pl += 1.5;
    return pl;
  }, [showColumnActions, showDragHandle]);

  const handleDragEnter = (_e: DragEvent) => {
    if (enableGrouping && hoveredColumn?.id === 'drop-zone') {
      setHoveredColumn(null);
    }
    if (enableColumnOrdering && draggingColumn && columnDefType !== 'group') {
      setHoveredColumn(
        columnDef.enableColumnOrdering !== false ? column : null,
      );
    }
  };

  const handleHeaderTooltipOpen = () => {
    if (headerEl.current) {
      setOpenHeaderTooltip(
        headerEl.current.offsetWidth < headerEl.current.scrollWidth,
      );
    }
  };

  const handleHeaderTooltipClose = () => {
    setOpenHeaderTooltip(false);
  };

  const draggingBorder =
    draggingColumn?.id === column.id
      ? `1px dashed ${theme.palette.text.secondary}`
      : hoveredColumn?.id === column.id
      ? `2px dashed ${theme.palette.primary.main}`
      : undefined;

  const draggingBorders = draggingBorder
    ? {
        borderLeft: draggingBorder,
        borderRight: draggingBorder,
        borderTop: draggingBorder,
      }
    : undefined;

  const headerElement = ((columnDef?.Header instanceof Function
    ? columnDef?.Header?.({
        column,
        header,
        table,
      })
    : columnDef?.Header) ?? (
    <Tooltip
      onClose={handleHeaderTooltipClose}
      onOpen={handleHeaderTooltipOpen}
      open={openHeaderTooltip}
      title={column.columnDef.header}
    >
      <Box
        ref={headerEl}
        sx={{
          flex: '1 1',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {columnDef.header}
      </Box>
    </Tooltip>
  )) as ReactNode;

  const tableHeadCellRef = useRef<HTMLTableCellElement>(null);

  return (
    <TableCell
      align={columnDefType === 'group' ? 'center' : 'left'}
      colSpan={header.colSpan}
      onDragEnter={handleDragEnter}
      ref={tableHeadCellRef}
      {...tableCellProps}
      sx={(theme: Theme) => ({
        fontWeight: 'bold',
        overflow: 'visible',
        p:
          density === 'compact'
            ? '0.5rem'
            : density === 'comfortable'
            ? columnDefType === 'display'
              ? '0.75rem'
              : '1rem'
            : columnDefType === 'display'
            ? '1rem 1.25rem'
            : '1.5rem',
        pb:
          columnDefType === 'display'
            ? 0
            : showColumnFilters || density === 'compact'
            ? '0.4rem'
            : '0.6rem',
        pt:
          columnDefType === 'group' || density === 'compact'
            ? '0.25rem'
            : density === 'comfortable'
            ? '.75rem'
            : '1.25rem',
        userSelect: enableMultiSort && column.getCanSort() ? 'none' : undefined,
        verticalAlign: 'top',
        zIndex:
          column.getIsResizing() || draggingColumn?.id === column.id
            ? 3
            : column.getIsPinned() && columnDefType !== 'group'
            ? 2
            : 1,
        ...getCommonCellStyles({
          column,
          header,
          table,
          tableCellProps,
          theme,
        }),
        ...draggingBorders,
      })}
    >
      {header.isPlaceholder ? null : (
        <Box
          className="Mui-TableHeadCell-Content"
          sx={{
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection:
              tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
            justifyContent:
              columnDefType === 'group' || tableCellProps?.align === 'center'
                ? 'center'
                : column.getCanResize()
                ? 'space-between'
                : 'flex-start',
            position: 'relative',
            width: '100%',
          }}
        >
          <Box
            className="Mui-TableHeadCell-Content-Labels"
            onClick={column.getToggleSortingHandler()}
            sx={{
              alignItems: 'center',
              cursor:
                column.getCanSort() && columnDefType !== 'group'
                  ? 'pointer'
                  : undefined,
              display: 'flex',
              flexDirection:
                tableCellProps?.align === 'right' ? 'row-reverse' : 'row',
              flexWrap: 'nowrap',
              m: tableCellProps?.align === 'center' ? 'auto' : undefined,
              overflow: 'hidden',
              pl:
                tableCellProps?.align === 'center'
                  ? `${headerPL}rem`
                  : undefined,
            }}
          >
            {headerElement}
            {column.getCanSort() && (
              <MRT_TableHeadCellSortLabel
                header={header}
                table={table}
                tableCellProps={tableCellProps}
              />
            )}
            {column.getCanFilter() && (
              <MRT_TableHeadCellFilterLabel header={header} table={table} />
            )}
          </Box>
          {columnDefType !== 'group' && (
            <Box
              className="Mui-TableHeadCell-Content-Actions"
              sx={{ whiteSpace: 'nowrap' }}
            >
              {showDragHandle && (
                <MRT_TableHeadCellGrabHandle
                  column={column}
                  table={table}
                  tableHeadCellRef={tableHeadCellRef}
                />
              )}
              {showColumnActions && (
                <MRT_TableHeadCellColumnActionsButton
                  header={header}
                  table={table}
                />
              )}
            </Box>
          )}
          {column.getCanResize() && (
            <MRT_TableHeadCellResizeHandle header={header} table={table} />
          )}
        </Box>
      )}
      {column.getCanFilter() && (
        <MRT_TableHeadCellFilterContainer header={header} table={table} />
      )}
    </TableCell>
  );
};
