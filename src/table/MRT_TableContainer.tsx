import React, { FC, useEffect, useState } from 'react';
import { TableContainer } from '@mui/material';
import { MRT_TableInstance } from '..';
import { MRT_Table } from './MRT_Table';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_TableContainer: FC<Props> = ({ tableInstance }) => {
  const {
    getState,
    options: { enableStickyHeader, idPrefix, muiTableContainerProps },
  } = tableInstance;

  const { isFullScreen } = getState();

  const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);

  const tableContainerProps =
    muiTableContainerProps instanceof Function
      ? muiTableContainerProps({ tableInstance })
      : muiTableContainerProps;

  useEffect(() => {
    const topToolbarHeight =
      typeof document !== 'undefined'
        ? document?.getElementById(`mrt-${idPrefix}-toolbar-top`)
            ?.offsetHeight ?? 0
        : 0;

    const bottomToolbarHeight =
      typeof document !== 'undefined'
        ? document?.getElementById(`mrt-${idPrefix}-toolbar-bottom`)
            ?.offsetHeight ?? 0
        : 0;

    setTotalToolbarHeight(topToolbarHeight + bottomToolbarHeight);
  });

  return (
    <TableContainer
      {...tableContainerProps}
      sx={{
        maxWidth: '100%',
        maxHeight: enableStickyHeader
          ? `clamp(350px, calc(100vh - ${totalToolbarHeight}px), 2000px)`
          : undefined,
        overflow: 'auto',
        ...tableContainerProps?.sx,
      }}
      style={{
        maxHeight: isFullScreen
          ? `calc(100vh - ${totalToolbarHeight}px)`
          : undefined,
      }}
    >
      <MRT_Table pinned="none" tableInstance={tableInstance} />
    </TableContainer>
  );
};
