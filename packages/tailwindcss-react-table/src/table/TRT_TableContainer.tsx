import React, { useEffect, useLayoutEffect, useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import { TRT_Table } from './TRT_Table';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.d';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface Props {
  table: TRT_TableInstance;
}

export const TRT_TableContainer = ({ table }: Props) => {
  const {
    getState,
    options: { enableStickyHeader },
    refs: { tableContainerRef, bottomToolbarRef, topToolbarRef },
  } = table;
  const { isFullScreen } = getState();

  const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);

  let {
    options: { tableContainerProps },
  } = table;
  tableContainerProps =
    tableContainerProps instanceof Function
      ? tableContainerProps({ table })
      : tableContainerProps;

  useIsomorphicLayoutEffect(() => {
    const topToolbarHeight =
      typeof document !== 'undefined'
        ? topToolbarRef.current?.offsetHeight ?? 0
        : 0;

    const bottomToolbarHeight =
      typeof document !== 'undefined'
        ? bottomToolbarRef?.current?.offsetHeight ?? 0
        : 0;

    setTotalToolbarHeight(topToolbarHeight + bottomToolbarHeight);
  });

  return (
    <TableContainer
      {...tableContainerProps}
      ref={(node: HTMLDivElement) => {
        if (node) {
          tableContainerRef.current = node;
          if (tableContainerProps?.ref) {
            //@ts-ignore
            tableContainerProps.ref.current = node;
          }
        }
      }}
      sx={(theme) => ({
        maxWidth: '100%',
        maxHeight: enableStickyHeader
          ? `clamp(350px, calc(100vh - ${totalToolbarHeight}px), 9999px)`
          : undefined,
        overflow: 'auto',
        ...(tableContainerProps?.sx instanceof Function
          ? tableContainerProps.sx(theme)
          : (tableContainerProps?.sx as any)),
      })}
      style={{
        maxHeight: isFullScreen
          ? `calc(100vh - ${totalToolbarHeight}px)`
          : undefined,
        ...tableContainerProps?.style,
      }}
    >
      <TRT_Table table={table} />
    </TableContainer>
  );
};
