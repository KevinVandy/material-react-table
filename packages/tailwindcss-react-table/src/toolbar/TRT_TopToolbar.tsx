import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { lighten } from '@mui/material/styles';
import { TRT_GlobalFilterTextField } from '../inputs/TRT_GlobalFilterTextField';
import { TRT_LinearProgressBar } from './TRT_LinearProgressBar';
import { TRT_TablePagination } from './TRT_TablePagination';
import { TRT_ToolbarAlertBanner } from './TRT_ToolbarAlertBanner';
import { TRT_ToolbarInternalButtons } from './TRT_ToolbarInternalButtons';
import { TRT_ToolbarDropZone } from './TRT_ToolbarDropZone';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.d';
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

interface Props<TData extends Record<string, any> = {}> {
  table: TRT_TableInstance<TData>;
}

export const TRT_TopToolbar = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enableGlobalFilter,
      enablePagination,
      enableToolbarInternalActions,
      topToolbarProps,
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
    topToolbarProps instanceof Function
      ? topToolbarProps({ table })
      : topToolbarProps;

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
        <TRT_ToolbarAlertBanner
          stackAlertBanner={stackAlertBanner}
          table={table}
        />
      )}
      {['both', 'top'].includes(positionToolbarDropZone ?? '') && (
        <TRT_ToolbarDropZone table={table} />
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
          <TRT_GlobalFilterTextField table={table} />
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
              <TRT_GlobalFilterTextField table={table} />
            )}
            <TRT_ToolbarInternalButtons table={table} />
          </Box>
        ) : (
          enableGlobalFilter &&
          positionGlobalFilter === 'right' && (
            <TRT_GlobalFilterTextField table={table} />
          )
        )}
      </Box>
      {enablePagination &&
        ['top', 'both'].includes(positionPagination ?? '') && (
          <TRT_TablePagination table={table} position="top" />
        )}
      <TRT_LinearProgressBar isTopToolbar table={table} />
    </Toolbar>
  );
};
