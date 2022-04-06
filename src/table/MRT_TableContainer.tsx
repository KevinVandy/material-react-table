import React, { FC, useMemo } from 'react';
import { alpha, Box, SxProps, TableContainer, Theme } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Table } from './MRT_Table';

const commonBoxStyles = ({
  pinned,
  theme,
}: {
  pinned?: 'left' | 'right';
  theme: Theme;
}) =>
  ({
    display: 'grid',
    minWidth: '200px',
    overflowX: 'auto',
    boxShadow:
      pinned === 'left'
        ? `0 1px 12px ${alpha(theme.palette.common.black, 0.5)}`
        : pinned === 'right'
        ? `0 -1px 12px ${alpha(theme.palette.common.black, 0.5)}`
        : 'none',
  } as SxProps<Theme>);

interface Props {}

export const MRT_TableContainer: FC<Props> = () => {
  const {
    enableColumnPinning,
    enableStickyHeader,
    idPrefix,
    muiTableContainerProps,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { isFullScreen, columnPinning } = getState();

  const getIsSomeColumnPinned = useMemo(
    () => !!columnPinning.left?.length || !!columnPinning.right?.length,
    [columnPinning.left, columnPinning.right],
  );

  const tableContainerProps =
    muiTableContainerProps instanceof Function
      ? muiTableContainerProps(tableInstance)
      : muiTableContainerProps;

  const topToolbarHeight =
    typeof document !== 'undefined'
      ? document?.getElementById(`mrt-${idPrefix}-toolbar-top`)?.offsetHeight ??
        0
      : 0;

  const bottomToolbarHeight =
    typeof document !== 'undefined'
      ? document?.getElementById(`mrt-${idPrefix}-toolbar-bottom`)
          ?.offsetHeight ?? 0
      : 0;

  const subtractHeight = topToolbarHeight + bottomToolbarHeight;

  return (
    <TableContainer
      {...tableContainerProps}
      sx={{
        maxWidth: '100%',
        maxHeight: enableStickyHeader
          ? `clamp(350px, calc(100vh - ${subtractHeight}px), 2000px)`
          : undefined,
        overflow: 'auto',
        ...tableContainerProps?.sx,
      }}
      style={{
        maxHeight: isFullScreen
          ? `calc(100vh - ${subtractHeight}px)`
          : undefined,
      }}
    >
      {enableColumnPinning && getIsSomeColumnPinned ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `${tableInstance.getLeftTableWidth()}fr ${tableInstance.getCenterTableWidth()}fr ${tableInstance.getRightTableWidth()}fr`,
          }}
        >
          {!!columnPinning.left?.length && (
            <Box
              // @ts-ignore
              sx={(theme: Theme) => commonBoxStyles({ pinned: 'left', theme })}
            >
              <MRT_Table pinned="left" />
            </Box>
          )}
          <Box // @ts-ignore
            sx={(theme: Theme) => commonBoxStyles({ theme })}
          >
            <MRT_Table pinned="center" />
          </Box>
          {!!columnPinning.right?.length && (
            <Box
              // @ts-ignore
              sx={(theme: Theme) => commonBoxStyles({ pinned: 'right', theme })}
            >
              <MRT_Table pinned="right" />
            </Box>
          )}
        </Box>
      ) : (
        <MRT_Table pinned="none" />
      )}
    </TableContainer>
  );
};
