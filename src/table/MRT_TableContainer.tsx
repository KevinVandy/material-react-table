import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import { TableContainer } from '@mui/material';
import { MRT_Table } from './MRT_Table';
import type { MRT_TableInstance } from '..';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_TableContainer: FC<Props> = ({ tableInstance }) => {
  const {
    getState,
    options: {
      enableStickyHeader,
      enableRowVirtualization,
      muiTableContainerProps,
      tableId,
    },
  } = tableInstance;

  const { isFullScreen } = getState();

  const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);

  const tableContainerProps =
    muiTableContainerProps instanceof Function
      ? muiTableContainerProps({ tableInstance })
      : muiTableContainerProps;

  useIsomorphicLayoutEffect(() => {
    const topToolbarHeight =
      typeof document !== 'undefined'
        ? document?.getElementById(`mrt-${tableId}-toolbar-top`)
            ?.offsetHeight ?? 0
        : 0;

    const bottomToolbarHeight =
      typeof document !== 'undefined'
        ? document?.getElementById(`mrt-${tableId}-toolbar-bottom`)
            ?.offsetHeight ?? 0
        : 0;

    setTotalToolbarHeight(topToolbarHeight + bottomToolbarHeight);
  });

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <TableContainer
      {...tableContainerProps}
      ref={tableContainerRef}
      sx={{
        maxWidth: '100%',
        maxHeight:
          enableStickyHeader || enableRowVirtualization
            ? `clamp(350px, calc(100vh - ${totalToolbarHeight}px), 9999px)`
            : undefined,
        overflow: 'auto',
        ...tableContainerProps?.sx,
      }}
      style={{
        maxHeight: isFullScreen
          ? `calc(100vh - ${totalToolbarHeight}px)`
          : undefined,
        ...tableContainerProps?.style,
      }}
    >
      <MRT_Table
        tableContainerRef={tableContainerRef}
        tableInstance={tableInstance}
      />
    </TableContainer>
  );
};
