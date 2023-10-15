import { useEffect, useLayoutEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TableContainer from '@mui/material/TableContainer';
import { alpha, lighten } from '@mui/material/styles';
import { MRT_Table } from './MRT_Table';
import { parseFromValuesOrFunc } from '../column.utils';
import { MRT_EditRowModal } from '../modals';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface Props<TData extends MRT_RowData> {
  table: MRT_TableInstance<TData>;
}

export const MRT_TableContainer = <TData extends MRT_RowData>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      createDisplayMode,
      editDisplayMode,
      enableStickyHeader,
      localization,
      muiCircularProgressProps,
      muiTableContainerProps,
    },
    refs: { bottomToolbarRef, tableContainerRef, topToolbarRef },
  } = table;
  const {
    creatingRow,
    editingRow,
    isFullScreen,
    isLoading,
    showLoadingOverlay,
  } = getState();

  const loading =
    (isLoading || showLoadingOverlay) && showLoadingOverlay !== false;

  const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);

  const tableContainerProps = parseFromValuesOrFunc(muiTableContainerProps, {
    table,
  });

  const circularProgressProps = parseFromValuesOrFunc(
    muiCircularProgressProps,
    { table },
  );

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

  const createModalOpen = createDisplayMode === 'modal' && creatingRow;
  const editModalOpen = editDisplayMode === 'modal' && editingRow;

  return (
    <TableContainer
      aria-busy={loading}
      aria-describedby="mrt-progress"
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
      style={{
        maxHeight: isFullScreen
          ? `calc(100vh - ${totalToolbarHeight}px)`
          : undefined,
        ...tableContainerProps?.style,
      }}
      sx={(theme) => ({
        maxHeight: enableStickyHeader
          ? `clamp(350px, calc(100vh - ${totalToolbarHeight}px), 9999px)`
          : undefined,
        maxWidth: '100%',
        overflow: 'auto',
        position: 'relative',
        ...(parseFromValuesOrFunc(tableContainerProps?.sx, theme) as any),
      })}
    >
      {loading ? (
        <Box
          sx={(theme) => ({
            alignItems: 'center',
            backgroundColor: alpha(
              lighten(theme.palette.background.paper, 0.05),
              0.5,
            ),
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            left: 0,
            maxHeight: '100vh',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '100%',
            zIndex: 2,
          })}
        >
          <CircularProgress
            aria-label={localization.noRecordsToDisplay}
            id="mrt-progress"
            {...circularProgressProps}
          />
        </Box>
      ) : null}
      <MRT_Table table={table} />
      {(createModalOpen || editModalOpen) && (
        <MRT_EditRowModal open table={table} />
      )}
    </TableContainer>
  );
};
