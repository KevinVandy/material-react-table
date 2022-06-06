import React, { FC } from 'react';
import { Box, lighten, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { MRT_TableInstance } from '..';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';

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
      enableGlobalFilter,
      enablePagination,
      enableToolbarInternalActions,
      tableId,
      muiTableToolbarTopProps,
      positionPagination,
      positionGlobalFilter,
      positionToolbarActions,
      positionToolbarAlertBanner,
      renderToolbarCustomActions,
    },
  } = tableInstance;

  const { isFullScreen, showGlobalFilter } = getState();

  const isMobile = useMediaQuery('(max-width:720px)');

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps({ tableInstance })
      : muiTableToolbarTopProps;

  const stackAlertBanner =
    isMobile ||
    (positionToolbarAlertBanner === 'top' &&
      (!!renderToolbarCustomActions || showGlobalFilter));

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
          width: renderToolbarCustomActions ? '100%' : undefined,
        }}
      >
        {enableGlobalFilter && positionGlobalFilter === 'left' && (
          <MRT_SearchTextField tableInstance={tableInstance} />
        )}
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
      <MRT_LinearProgressBar alignTo="bottom" tableInstance={tableInstance} />
    </Toolbar>
  );
};
