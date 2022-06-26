import React, { FC } from 'react';
import { Box, lighten, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { MRT_TableInstance } from '..';
import { MRT_GlobalFilterTextField } from '../inputs/MRT_GlobalFilterTextField';

export const commonToolbarStyles = ({ theme }: { theme: Theme }) => ({
  backgroundColor: lighten(theme.palette.background.default, 0.04),
  backgroundImage: 'none',
  display: 'grid',
  minHeight: '3.5rem',
  overflow: 'hidden',
  p: '0 !important',
  transition: 'all 0.2s ease-in-out',
  zIndex: 1,
});

interface Props {
  instance: MRT_TableInstance;
}

export const MRT_ToolbarTop: FC<Props> = ({ instance }) => {
  const {
    getState,
    options: {
      enableGlobalFilter,
      enablePagination,
      enableToolbarInternalActions,
      muiTableToolbarTopProps,
      positionGlobalFilter,
      positionPagination,
      positionToolbarAlertBanner,
      renderToolbarTopCustomActions,
      tableId,
    },
  } = instance;

  const { isFullScreen, showGlobalFilter } = getState();

  const isMobile = useMediaQuery('(max-width:720px)');

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps({ instance })
      : muiTableToolbarTopProps;

  const stackAlertBanner =
    isMobile ||
    (positionToolbarAlertBanner === 'top' &&
      (!!renderToolbarTopCustomActions || showGlobalFilter));

  return (
    <Toolbar
      id={`mrt-${tableId}-toolbar-top`}
      variant="dense"
      {...toolbarProps}
      sx={(theme) =>
        ({
          position: isFullScreen ? 'sticky' : undefined,
          top: isFullScreen ? '0' : undefined,
          ...commonToolbarStyles({ theme }),
          ...toolbarProps?.sx,
        } as any)
      }
    >
      {positionToolbarAlertBanner === 'top' && (
        <MRT_ToolbarAlertBanner
          stackAlertBanner={stackAlertBanner}
          instance={instance}
        />
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
          <MRT_GlobalFilterTextField instance={instance} />
        )}

        {renderToolbarTopCustomActions?.({ instance }) ?? <span />}
        {enableToolbarInternalActions ? (
          <MRT_ToolbarInternalButtons instance={instance} />
        ) : (
          enableGlobalFilter &&
          positionGlobalFilter === 'right' && (
            <MRT_GlobalFilterTextField instance={instance} />
          )
        )}
      </Box>
      {enablePagination &&
        ['top', 'both'].includes(positionPagination ?? '') && (
          <MRT_TablePagination instance={instance} position="top" />
        )}
      <MRT_LinearProgressBar alignTo="bottom" instance={instance} />
    </Toolbar>
  );
};
