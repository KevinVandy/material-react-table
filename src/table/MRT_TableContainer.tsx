import React, { FC, useLayoutEffect, useState } from 'react';
import { alpha, Box, SxProps, TableContainer, Theme } from '@mui/material';
import { MRT_Table } from './MRT_Table';
import { MRT_TableInstance } from '..';

const commonBoxStyles = ({
  pinned,
  theme,
  visible,
}: {
  pinned?: 'left' | 'right';
  theme: Theme;
  visible?: boolean;
}) =>
  ({
    display: 'grid',
    minWidth: visible ? '200px' : 0,
    overflowX: 'auto',
    boxShadow:
      pinned === 'left'
        ? `0 1px 12px ${alpha(theme.palette.common.black, 0.5)}`
        : pinned === 'right'
        ? `0 -1px 12px ${alpha(theme.palette.common.black, 0.5)}`
        : 'none',
  } as SxProps<Theme>);

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
      enableColumnPinning,
      enableStickyHeader,
      idPrefix,
      muiTableContainerProps,
    },
  } = tableInstance;

  const { isFullScreen, columnPinning } = getState();

  const [totalToolbarHeight, setTotalToolbarHeight] = useState(0);

  const tableContainerProps =
    muiTableContainerProps instanceof Function
      ? muiTableContainerProps(tableInstance)
      : muiTableContainerProps;

  useLayoutEffect(() => {
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
      {enableColumnPinning && getIsSomeColumnsPinned() ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: `${getLeftTableWidth()}fr ${getCenterTableWidth()}fr ${getRightTableWidth()}fr`,
          }}
        >
          <Box
            // @ts-ignore
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
          <Box // @ts-ignore
            sx={(theme: Theme) => commonBoxStyles({ theme })}
          >
            <MRT_Table pinned="center" tableInstance={tableInstance} />
          </Box>
          <Box
            // @ts-ignore
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
