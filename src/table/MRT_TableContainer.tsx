import React, { CSSProperties, FC, useEffect, useState } from 'react';
import { alpha, Box, TableContainer, Theme } from '@mui/material';
import { MRT_TableInstance } from '..';
import { MRT_Table } from './MRT_Table';

const commonBoxStyles = ({
  pinned,
  theme,
  visible,
}: {
  pinned?: 'left' | 'right';
  theme: Theme;
  visible?: boolean;
}): CSSProperties => ({
  display: 'grid',
  minWidth: visible ? '200px' : 0,
  overflowX: pinned ? 'scroll' : 'auto',
  boxShadow:
    pinned === 'left'
      ? `0 1px 12px ${alpha(theme.palette.common.black, 0.5)}`
      : pinned === 'right'
      ? `0 -1px 12px ${alpha(theme.palette.common.black, 0.5)}`
      : 'none',
});

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_TableContainer: FC<Props> = ({ tableInstance }) => {
  const {
    getCenterTableWidth,
    getIsSomeColumnsPinned,
    getLeftTableWidth,
    getRightTableWidth,
    getState,
    options: {
      enablePinning,
      enableStickyHeader,
      idPrefix,
      muiTableContainerProps,
    },
  } = tableInstance;

  const { isFullScreen, columnPinning } = getState();

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
      {enablePinning && getIsSomeColumnsPinned() ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `${getLeftTableWidth()}fr ${getCenterTableWidth()}fr ${getRightTableWidth()}fr`,
          }}
        >
          <Box
            sx={(theme: Theme) =>
              commonBoxStyles({
                pinned: 'left',
                theme,
                visible: !!columnPinning.left?.length,
              })
            }
          >
            <MRT_Table pinned="left" tableInstance={tableInstance} />
          </Box>
          <Box sx={(theme: Theme) => commonBoxStyles({ theme })}>
            <MRT_Table pinned="center" tableInstance={tableInstance} />
          </Box>
          <Box
            sx={(theme: Theme) =>
              commonBoxStyles({
                pinned: 'right',
                theme,
                visible: !!columnPinning.right?.length,
              })
            }
          >
            <MRT_Table pinned="right" tableInstance={tableInstance} />
          </Box>
        </Box>
      ) : (
        <MRT_Table pinned="none" tableInstance={tableInstance} />
      )}
    </TableContainer>
  );
};
