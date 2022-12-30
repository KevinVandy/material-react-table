import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { lighten } from '@mui/material/styles';
import { MRT_GlobalFilterTextField } from '../inputs/MRT_GlobalFilterTextField';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import type { MRT_TableInstance } from '..';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_ToolbarDropZone } from './MRT_ToolbarDropZone';
import type { Theme } from '@mui/material/styles';

export const commonToolbarStyles = ({ theme }: { theme: Theme }) => ({
  alignItems: 'flex-start',
  backgroundColor: lighten(theme.palette.background.default, 0.04),
  backgroundImage: 'none',
  display: 'grid',
  flexWrap: 'wrap-reverse',
  minHeight: '3.5rem',
  overflow: 'hidden',
  p: '0 !important',
  transition: 'all 150ms ease-in-out',
  zIndex: 1,
});

interface Props {
  table: MRT_TableInstance;
}

export const MRT_TopToolbar: FC<Props> = ({ table }) => {
  const {
    getState,
    options: {
      enableGlobalFilter,
      enablePagination,
      enableToolbarInternalActions,
      muiTopToolbarProps,
      positionGlobalFilter,
      positionPagination,
      positionToolbarAlertBanner,
      positionToolbarDropZone,
      renderTopToolbarCustomActions,
    },
    refs: { topToolbarRef },
  } = table;

  const { isFullScreen, showGlobalFilter } = getState();

  const isMobile = useMediaQuery('(max-width:720px)');

  const toolbarProps =
    muiTopToolbarProps instanceof Function
      ? muiTopToolbarProps({ table })
      : muiTopToolbarProps;

  const stackAlertBanner =
    isMobile || !!renderTopToolbarCustomActions || showGlobalFilter;

  return (
    <Toolbar
      variant="dense"
      {...toolbarProps}
      ref={(ref: HTMLDivElement) => {
        topToolbarRef.current = ref;
        if (toolbarProps?.ref) {
          // @ts-ignore
          toolbarProps.ref.current = ref;
        }
      }}
      sx={(theme) =>
        ({
          position: isFullScreen ? 'sticky' : undefined,
          top: isFullScreen ? '0' : undefined,
          ...commonToolbarStyles({ theme }),
          ...(toolbarProps?.sx instanceof Function
            ? toolbarProps.sx(theme)
            : (toolbarProps?.sx as any)),
        } as any)
      }
    >
      {positionToolbarAlertBanner === 'top' && (
        <MRT_ToolbarAlertBanner
          stackAlertBanner={stackAlertBanner}
          table={table}
        />
      )}
      {['both', 'top'].includes(positionToolbarDropZone ?? '') && (
        <MRT_ToolbarDropZone table={table} />
      )}
      <Box
        sx={{
          alignItems: 'flex-start',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'space-between',
          p: '0.5rem',
          position: stackAlertBanner ? 'relative' : 'absolute',
          right: 0,
          top: 0,
          width: '100%',
        }}
      >
        {enableGlobalFilter && positionGlobalFilter === 'left' && (
          <MRT_GlobalFilterTextField table={table} />
        )}
        {renderTopToolbarCustomActions?.({ table }) ?? <span />}
        {enableToolbarInternalActions ? (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap-reverse',
              justifyContent: 'flex-end',
            }}
          >
            {enableGlobalFilter && positionGlobalFilter === 'right' && (
              <MRT_GlobalFilterTextField table={table} />
            )}
            <MRT_ToolbarInternalButtons table={table} />
          </Box>
        ) : (
          enableGlobalFilter &&
          positionGlobalFilter === 'right' && (
            <MRT_GlobalFilterTextField table={table} />
          )
        )}
      </Box>
      {enablePagination &&
        ['top', 'both'].includes(positionPagination ?? '') && (
          <MRT_TablePagination table={table} position="top" />
        )}
      <MRT_LinearProgressBar isTopToolbar table={table} />
    </Toolbar>
  );
};
