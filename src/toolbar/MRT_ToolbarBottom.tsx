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
    manualPagination,
    muiTableToolbarBottomProps,
    positionPagination,
    positionToolbarActions,
    positionToolbarAlertBanner,
    tableInstance,
  } = useMRT();

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
          bottom: tableInstance.state.fullScreen ? '0' : undefined,
          position: tableInstance.state.fullScreen ? 'fixed' : undefined,
          ...commonToolbarStyles(theme, tableInstance),
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
        {!manualPagination &&
          ['bottom', 'both'].includes(positionPagination ?? '') && (
            <MRT_TablePagination />
          )}
      </Box>
    </Toolbar>
  );
};
