import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha } from '@mui/material/styles';
import { TRT_TablePagination } from './TRT_TablePagination';
import { TRT_ToolbarAlertBanner } from './TRT_ToolbarAlertBanner';
import { TRT_ToolbarDropZone } from './TRT_ToolbarDropZone';
import { TRT_LinearProgressBar } from './TRT_LinearProgressBar';
import { commonToolbarStyles } from './TRT_TopToolbar';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.d';

interface Props<TData extends Record<string, any> = {}> {
  table: TRT_TableInstance<TData>;
}

export const TRT_BottomToolbar = <TData extends Record<string, any> = {}>({
  table,
}: Props<TData>) => {
  const {
    getState,
    options: {
      enablePagination,
      bottomToolbarProps,
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
    bottomToolbarProps instanceof Function
      ? bottomToolbarProps({ table })
      : bottomToolbarProps;

  const stackAlertBanner = isMobile || !!renderBottomToolbarCustomActions;

  return (
    <Toolbar
      variant="dense"
      {...toolbarProps}
      ref={(node: HTMLDivElement) => {
        if (node) {
          bottomToolbarRef.current = node;
          if (toolbarProps?.ref) {
            // @ts-ignore
            toolbarProps.ref.current = node;
          }
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
      <TRT_LinearProgressBar isTopToolbar={false} table={table} />
      {positionToolbarAlertBanner === 'bottom' && (
        <TRT_ToolbarAlertBanner
          stackAlertBanner={stackAlertBanner}
          table={table}
        />
      )}
      {['both', 'bottom'].includes(positionToolbarDropZone ?? '') && (
        <TRT_ToolbarDropZone table={table} />
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
              <TRT_TablePagination table={table} position="bottom" />
            )}
        </Box>
      </Box>
    </Toolbar>
  );
};
