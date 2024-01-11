import { type CSSProperties } from 'react';
import { type TableCellProps } from '@mui/material/TableCell';
import { alpha, darken, lighten } from '@mui/material/styles';
import { type Theme } from '@mui/material/styles';
import {
  getIsFirstRightPinnedColumn,
  getIsLastLeftPinnedColumn,
  getTotalRight,
  parseFromValuesOrFunc,
} from './column.utils';
import {
  type MRT_Column,
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from './types';

export const parseCSSVarId = (id: string) => id.replace(/[^a-zA-Z0-9]/g, '_');

export const getMRTTheme = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  theme: Theme,
) => ({
  baseBackgroundColor:
    theme.palette.mode === 'dark'
      ? lighten(theme.palette.background.default, 0.05)
      : theme.palette.background.default,
  draggingBorderColor: theme.palette.primary.main,
  matchHighlightColor:
    theme.palette.mode === 'dark'
      ? darken(theme.palette.warning.dark, 0.25)
      : lighten(theme.palette.warning.light, 0.5),
  pinnedRowBackgroundColor: alpha(theme.palette.primary.main, 0.1),
  selectedRowBackgroundColor: alpha(theme.palette.primary.main, 0.2),
  ...parseFromValuesOrFunc(table.options.mrtTheme, theme),
});

export const getCommonMRTCellStyles = <TData extends MRT_RowData>({
  column,
  header,
  table,
  tableCellProps,
  theme,
}: {
  column: MRT_Column<TData>;
  header?: MRT_Header<TData>;
  table: MRT_TableInstance<TData>;
  tableCellProps: TableCellProps;
  theme: Theme;
}) => {
  const {
    options: { layoutMode },
  } = table;
  const widthStyles: CSSProperties = {
    minWidth: `max(calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) * 1px), ${column.columnDef.minSize ?? 30}px)`,
    width: `calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) * 1px${header ? ` + ${header?.subHeaders?.length ?? 0}rem` : ''})`,
  };

  if (layoutMode === 'grid') {
    widthStyles.flex = `var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) 0 auto`;
  } else if (layoutMode === 'grid-no-grow') {
    widthStyles.flex = '0 0 auto';
  }

  return {
    backgroundColor:
      column.getIsPinned() && column.columnDef.columnDefType !== 'group'
        ? alpha(
            darken(
              getMRTTheme(table, theme).baseBackgroundColor,
              theme.palette.mode === 'dark' ? 0.05 : 0.01,
            ),
            0.97,
          )
        : 'inherit',
    backgroundImage: 'inherit',
    boxShadow: getIsLastLeftPinnedColumn(table, column)
      ? `-4px 0 8px -6px ${alpha(theme.palette.grey[700], 0.5)} inset`
      : getIsFirstRightPinnedColumn(column)
        ? `4px 0 8px -6px ${alpha(theme.palette.grey[700], 0.5)} inset`
        : undefined,
    display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
    left:
      column.getIsPinned() === 'left'
        ? `${column.getStart('left')}px`
        : undefined,
    opacity:
      table.getState().draggingColumn?.id === column.id ||
      table.getState().hoveredColumn?.id === column.id
        ? 0.5
        : 1,
    position:
      column.getIsPinned() && column.columnDef.columnDefType !== 'group'
        ? 'sticky'
        : undefined,
    right:
      column.getIsPinned() === 'right'
        ? `${getTotalRight(table, column)}px`
        : undefined,
    transition: table.options.enableColumnVirtualization
      ? 'none'
      : `padding 150ms ease-in-out`,
    ...widthStyles,
    ...(parseFromValuesOrFunc(tableCellProps?.sx, theme) as any),
  };
};

export const getCommonToolbarStyles = <TData extends MRT_RowData>({
  table,
  theme,
}: {
  table: MRT_TableInstance<TData>;
  theme: Theme;
}) => ({
  alignItems: 'flex-start',
  backgroundColor: getMRTTheme(table, theme).baseBackgroundColor,
  display: 'grid',
  flexWrap: 'wrap-reverse',
  minHeight: '3.5rem',
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 150ms ease-in-out',
  zIndex: 1,
});

export const flipIconStyles = (theme: Theme) =>
  theme.direction === 'rtl'
    ? { style: { transform: 'scaleX(-1)' } }
    : undefined;
