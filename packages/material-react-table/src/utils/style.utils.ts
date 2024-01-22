import { type CSSProperties } from 'react';
import { type TableCellProps } from '@mui/material/TableCell';
import { type TooltipProps } from '@mui/material/Tooltip';
import { alpha, darken, lighten } from '@mui/material/styles';
import { type Theme } from '@mui/material/styles';
import {
  type MRT_Column,
  type MRT_Header,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';
import {
  getIsFirstRightPinnedColumn,
  getIsLastLeftPinnedColumn,
  getTotalRight,
} from '../utils/column.utils';
import { parseFromValuesOrFunc } from './utils';

export const parseCSSVarId = (id: string) => id.replace(/[^a-zA-Z0-9]/g, '_');

export const getMRTTheme = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  theme: Theme,
) => {
  const themeOverrides = parseFromValuesOrFunc(table.options.mrtTheme, theme);
  const baseBackgroundColor =
    themeOverrides?.baseBackgroundColor ??
    (theme.palette.mode === 'dark'
      ? lighten(theme.palette.background.default, 0.05)
      : theme.palette.background.default);
  return {
    baseBackgroundColor,
    draggingBorderColor: theme.palette.primary.main,
    matchHighlightColor:
      theme.palette.mode === 'dark'
        ? darken(theme.palette.warning.dark, 0.25)
        : lighten(theme.palette.warning.light, 0.5),
    menuBackgroundColor: lighten(baseBackgroundColor, 0.07),
    pinnedRowBackgroundColor: alpha(theme.palette.primary.main, 0.1),
    selectedRowBackgroundColor: alpha(theme.palette.primary.main, 0.2),
    ...themeOverrides,
  };
};

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
  const { baseBackgroundColor } = getMRTTheme(table, theme);
  const {
    options: { enableColumnVirtualization, layoutMode },
  } = table;
  const { columnDef } = column;

  const isPinned = columnDef.columnDefType !== 'group' && column.getIsPinned();

  const widthStyles: CSSProperties = {
    minWidth: `max(calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) * 1px), ${columnDef.minSize ?? 30}px)`,
    width: `calc(var(--${header ? 'header' : 'col'}-${parseCSSVarId(
      header?.id ?? column.id,
    )}-size) * 1px)`,
  };

  if (layoutMode === 'grid') {
    widthStyles.flex = `${
      [0, false].includes(columnDef.grow!)
        ? 0
        : `var(--${header ? 'header' : 'col'}-${parseCSSVarId(
            header?.id ?? column.id,
          )}-size)`
    } 0 auto`;
  } else if (layoutMode === 'grid-no-grow') {
    widthStyles.flex = `${+(columnDef.grow || 0)} 0 auto`;
  }

  const pinnedStyles = isPinned
    ? {
        '&[data-pinned="true"]': {
          '&:before': {
            backgroundColor: 'transparent',
            content: '""',
            height: '100%',
            left: 0,
            position: 'absolute',
            top: 0,
            width: '100%',
          },
          backgroundColor: alpha(
            darken(
              baseBackgroundColor,
              theme.palette.mode === 'dark' ? 0.05 : 0.01,
            ),
            0.97,
          ),
          boxShadow: getIsLastLeftPinnedColumn(table, column)
            ? `-4px 0 8px -6px ${alpha(theme.palette.grey[700], 0.5)} inset`
            : getIsFirstRightPinnedColumn(column)
              ? `4px 0 8px -6px ${alpha(theme.palette.grey[700], 0.5)} inset`
              : undefined,
          left:
            isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
          opacity: 0.98,
          position: 'sticky',
          right:
            isPinned === 'right'
              ? `${getTotalRight(table, column)}px`
              : undefined,
          zIndex: 1,
        },
      }
    : {};

  return {
    backgroundColor: 'inherit',
    backgroundImage: 'inherit',
    display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
    opacity:
      table.getState().draggingColumn?.id === column.id ||
      table.getState().hoveredColumn?.id === column.id
        ? 0.5
        : 1,
    transition: enableColumnVirtualization
      ? 'none'
      : `padding 150ms ease-in-out`,
    ...pinnedStyles,
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

export const getCommonTooltipProps = (
  placement?: TooltipProps['placement'],
): Partial<TooltipProps> => ({
  disableInteractive: true,
  enterDelay: 1000,
  enterNextDelay: 1000,
  placement,
});
