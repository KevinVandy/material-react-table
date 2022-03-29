import React, { FC } from 'react';
import { alpha, Box, Theme, Toolbar } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMRT } from '../useMRT';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';

export const commonToolbarStyles = (theme: Theme, fullScreen?: boolean) => ({
  backgroundColor: theme.palette.background.default,
  backgroundImage: `linear-gradient(${alpha(
    theme.palette.common.white,
    0.05,
  )},${alpha(theme.palette.common.white, 0.05)})`,
  display: 'grid',
  opacity: fullScreen ? 0.95 : 1,
  p: '0 !important',
  width: '100%',
  zIndex: 1,
});

interface Props {}

export const MRT_ToolbarTop: FC<Props> = () => {
  const {
    enableGlobalFilter,
    hideToolbarInternalActions,
    enablePagination,
    muiTableToolbarTopProps,
    positionPagination,
    positionToolbarActions,
    positionToolbarAlertBanner,
    renderToolbarCustomActions,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps(tableInstance)
      : muiTableToolbarTopProps;

  return (
    <Toolbar
      variant="dense"
      {...toolbarProps}
      sx={(theme) =>
        ({
          position: getState().fullScreen ? 'sticky' : undefined,
          top: getState().fullScreen ? '0' : undefined,
          ...commonToolbarStyles(theme, getState().fullScreen),
          ...toolbarProps?.sx,
        } as any)
      }
    >
      {positionToolbarAlertBanner === 'top' && <MRT_ToolbarAlertBanner />}
      <Box
        sx={{
          p: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {renderToolbarCustomActions?.(tableInstance) ?? <span />}
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {enableGlobalFilter && <MRT_SearchTextField />}
          {!hideToolbarInternalActions && positionToolbarActions === 'top' && (
            <MRT_ToolbarInternalButtons />
          )}
        </Box>
      </Box>
      <div>
        {enablePagination &&
          ['top', 'both'].includes(positionPagination ?? '') && (
            <MRT_TablePagination />
          )}
      </div>
      <MRT_LinearProgressBar />
    </Toolbar>
  );
};
