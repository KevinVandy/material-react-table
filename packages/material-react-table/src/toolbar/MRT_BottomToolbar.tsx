import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha } from '@mui/material/styles';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { commonToolbarStyles } from './MRT_TopToolbar';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_BottomToolbar: FC<Props> = ({ table }) => {
  const {
    getState,
    options: {
      enablePagination,
      muiBottomToolbarProps,
      positionPagination,
      positionToolbarAlertBanner,
      positionToolbarDropZone,
      renderBottomToolbarCustomActions,
    },
    refs: { bottomToolbarRef },
  } = table;
  const { isFullScreen } = getState();

  const isMobile = useMediaQuery('(max-width:720px)');

  const toolbarProps =
    muiBottomToolbarProps instanceof Function
      ? muiBottomToolbarProps({ table })
      : muiBottomToolbarProps;

  const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;

  return (
    <Toolbar
      variant="dense"
      {...toolbarProps}
      ref={(ref: HTMLDivElement) => {
        bottomToolbarRef.current = ref;
        if (toolbarProps?.ref) {
          // @ts-ignore
          toolbarProps.ref.current = ref;
        }
      }}
      sx={(theme) =>
        ({
          ...commonToolbarStyles({ theme }),
          bottom: isFullScreen ? '0' : undefined,
          boxShadow: `0 1px 2px -1px ${alpha(
            theme.palette.common.black,
            0.1,
          )} inset`,
          left: 0,
          position: isFullScreen ? 'fixed' : 'relative',
          right: 0,
          ...(toolbarProps?.sx instanceof Function
            ? toolbarProps.sx(theme)
            : (toolbarProps?.sx as any)),
        } as any)
      }
    >
      <MRT_LinearProgressBar isTopToolbar={false} table={table} />
      {positionToolbarAlertBanner === 'bottom' && (
        <MRT_ToolbarAlertBanner
          stackAlertBanner={stackAlertBanner}
          table={table}
        />
      )}
      {['both', 'bottom'].includes(positionToolbarDropZone ?? '') && (
        <MRT_ToolbarDropZone table={table} />
      )}
      <Box
        sx={{
          alignItems: 'center',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          p: '0.5rem',
          width: '100%',
        }}
      >
        {renderBottomToolbarCustomActions ? (
          renderBottomToolbarCustomActions({ table })
        ) : (
          <span />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: stackAlertBanner ? 'relative' : 'absolute',
            right: 0,
            top: 0,
          }}
        >
          {enablePagination &&
            ['bottom', 'both'].includes(positionPagination ?? '') && (
              <MRT_TablePagination table={table} position="bottom" />
            )}
        </Box>
      </Box>
    </Toolbar>
  );
};
