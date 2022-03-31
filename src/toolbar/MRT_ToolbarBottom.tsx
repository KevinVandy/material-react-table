import React, { FC } from 'react';
import { Box, Toolbar } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { commonToolbarStyles } from './MRT_ToolbarTop';

interface Props {}

export const MRT_ToolbarBottom: FC<Props> = () => {
  const {
    hideToolbarInternalActions,
    enablePagination,
    muiTableToolbarBottomProps,
    positionPagination,
    positionToolbarActions,
    positionToolbarAlertBanner,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { isFullScreen } = getState();

  const toolbarProps =
    muiTableToolbarBottomProps instanceof Function
      ? muiTableToolbarBottomProps(tableInstance)
      : muiTableToolbarBottomProps;

  return (
    <Toolbar
      variant="dense"
      {...toolbarProps}
      sx={(theme) =>
        ({
          bottom: isFullScreen ? '0' : undefined,
          position: isFullScreen ? 'fixed' : undefined,
          ...commonToolbarStyles({ theme, isFullScreen }),
          ...toolbarProps?.sx,
        } as any)
      }
    >
      <MRT_LinearProgressBar />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        {!hideToolbarInternalActions && positionToolbarActions === 'bottom' ? (
          <MRT_ToolbarInternalButtons />
        ) : (
          <span />
        )}
        {positionToolbarAlertBanner === 'bottom' && <MRT_ToolbarAlertBanner />}
        {enablePagination &&
          ['bottom', 'both'].includes(positionPagination ?? '') && (
            <MRT_TablePagination />
          )}
      </Box>
    </Toolbar>
  );
};
