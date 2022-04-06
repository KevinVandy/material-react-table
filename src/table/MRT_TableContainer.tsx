import React, { FC } from 'react';
import { TableContainer } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_Table } from './MRT_Table';

interface Props {}

export const MRT_TableContainer: FC<Props> = () => {
  const {
    enableStickyHeader,
    idPrefix,
    muiTableContainerProps,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { isFullScreen } = getState();

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

  const tableHeadHeight =
    typeof document !== 'undefined'
      ? document?.getElementById(`mrt-${idPrefix}-table-head`)?.offsetHeight ??
        0
      : 0;

  const subtractHeight =
    topToolbarHeight +
    bottomToolbarHeight +
    (isFullScreen ? 0 : tableHeadHeight);

  return (
    <TableContainer
      {...tableContainerProps}
      sx={{
        maxWidth: '100%',
        overflow: 'auto',
        maxHeight: enableStickyHeader
          ? `clamp(350px, calc(100vh - ${subtractHeight}px), 2000px)`
          : undefined,
        ...tableContainerProps?.sx,
      }}
      style={{
        maxHeight: isFullScreen
          ? `calc(100vh - ${subtractHeight / 1}px)`
          : undefined,
      }}
    >
      <MRT_Table />
    </TableContainer>
  );
};
