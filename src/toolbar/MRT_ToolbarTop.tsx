import React, { FC } from 'react';
import { Box, lighten, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { MRT_TableInstance } from '..';

export const commonToolbarStyles = ({ theme }: { theme: Theme }) => ({
  backgroundColor: lighten(theme.palette.background.default, 0.04),
  backgroundImage: 'none',
  display: 'grid',
  minHeight: '3.5rem',
  overflow: 'hidden',
  p: '0 !important',
  transition: 'all 0.2s ease-in-out',
  width: '100%',
  zIndex: 1,
});

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_ToolbarTop: FC<Props> = ({ tableInstance }) => {
  const {
    getState,
    options: {
      enablePagination,
      enableToolbarInternalActions,
      idPrefix,
      muiTableToolbarTopProps,
      positionPagination,
      positionToolbarActions,
      positionToolbarAlertBanner,
      renderToolbarCustomActions,
    },
  } = tableInstance;

  const { isFullScreen } = getState();

  const isMobile = useMediaQuery('(max-width:720px)');

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps({ tableInstance })
      : muiTableToolbarTopProps;

  const stackAlertBanner =
    isMobile ||
    (positionToolbarAlertBanner === 'top' && !!renderToolbarCustomActions);

  return (
    <Toolbar
      id={`mrt-${idPrefix}-toolbar-top`}
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
          tableInstance={tableInstance}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '0.5rem',
          position: stackAlertBanner ? 'relative' : 'absolute',
          right: 0,
          top: 0,
          width: 'calc(100% - 1rem)',
        }}
      >
        {renderToolbarCustomActions?.({ tableInstance }) ?? <span />}
        {enableToolbarInternalActions && positionToolbarActions === 'top' && (
          <MRT_ToolbarInternalButtons tableInstance={tableInstance} />
        )}
      </Box>
      <div>
        {enablePagination &&
          ['top', 'both'].includes(positionPagination ?? '') && (
            <MRT_TablePagination tableInstance={tableInstance} />
          )}
      </div>
      <MRT_LinearProgressBar tableInstance={tableInstance} />
    </Toolbar>
  );
};
