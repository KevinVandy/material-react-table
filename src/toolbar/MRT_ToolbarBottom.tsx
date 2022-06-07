import React, { FC } from 'react';
import { alpha, Box, Toolbar, useMediaQuery } from '@mui/material';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { commonToolbarStyles } from './MRT_ToolbarTop';
import { MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_ToolbarBottom: FC<Props> = ({ tableInstance }) => {
  const {
    getState,
    options: {
      enableToolbarInternalActions,
      tableId,
      enablePagination,
      muiTableToolbarBottomProps,
      positionPagination,
      positionToolbarActions,
      positionToolbarAlertBanner,
      renderToolbarCustomActions,
    },
  } = tableInstance;

  const { isFullScreen } = getState();

  const isMobile = useMediaQuery('(max-width:720px)');

  const toolbarProps =
    muiTableToolbarBottomProps instanceof Function
      ? muiTableToolbarBottomProps({ tableInstance })
      : muiTableToolbarBottomProps;

  const stackAlertBanner =
    isMobile ||
    (positionToolbarAlertBanner === 'bottom' &&
      positionToolbarActions === 'bottom') ||
    (positionToolbarAlertBanner === 'bottom' &&
      !!renderToolbarCustomActions &&
      positionToolbarActions === 'bottom');

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
          position: isFullScreen ? 'fixed' : 'relative',
          ...toolbarProps?.sx,
        } as any)
      }
    >
      <MRT_LinearProgressBar alignTo="top" tableInstance={tableInstance} />
      {positionToolbarAlertBanner === 'bottom' && (
        <MRT_ToolbarAlertBanner tableInstance={tableInstance} />
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          position: stackAlertBanner ? 'relative' : 'absolute',
          right: 0,
          top: 0,
        }}
      >
        {enableToolbarInternalActions && positionToolbarActions === 'bottom' ? (
          <MRT_ToolbarInternalButtons tableInstance={tableInstance} />
        ) : (
          <span />
        )}
        {enablePagination &&
          ['bottom', 'both'].includes(positionPagination ?? '') && (
            <MRT_TablePagination tableInstance={tableInstance} />
          )}
      </Box>
    </Toolbar>
  );
};
