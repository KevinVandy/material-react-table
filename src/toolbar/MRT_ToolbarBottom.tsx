import React, { FC } from 'react';
import { alpha, Box, Toolbar, useMediaQuery } from '@mui/material';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { commonToolbarStyles } from './MRT_ToolbarTop';
import { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_ToolbarBottom: FC<Props> = ({ table }) => {
  const {
    getState,
    options: {
      enablePagination,
      muiTableToolbarBottomProps,
      positionPagination,
      positionToolbarAlertBanner,
      renderToolbarBottomCustomActions,
      tableId,
    },
  } = table;
  const { isFullScreen } = getState();

  const isMobile = useMediaQuery('(max-width:720px)');

  const toolbarProps =
    muiTableToolbarBottomProps instanceof Function
      ? muiTableToolbarBottomProps({ table })
      : muiTableToolbarBottomProps;

  const stackAlertBanner =
    isMobile ||
    (positionToolbarAlertBanner === 'bottom' &&
      !!renderToolbarBottomCustomActions);

  return (
    <Toolbar
      id={`mrt-${tableId}-toolbar-bottom`}
      variant="dense"
      {...toolbarProps}
      sx={(theme) =>
        ({
          ...commonToolbarStyles({ theme }),
          bottom: isFullScreen ? '0' : undefined,
          boxShadow: `-3px 0 6px ${alpha(theme.palette.common.black, 0.1)}`,
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
        <MRT_ToolbarAlertBanner table={table} />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        {renderToolbarBottomCustomActions ? (
          <Box sx={{ p: '0.5rem' }}>
            {renderToolbarBottomCustomActions({ table })}
          </Box>
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
