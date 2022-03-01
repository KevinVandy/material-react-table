import React, { FC } from 'react';
import { alpha, Toolbar } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';

interface Props {}

export const MRT_ToolbarBottom: FC<Props> = () => {
  const {
    hideToolbarInternalActions,
    manualPagination,
    muiTableToolbarBottomProps,
    positionPagination,
    fullScreen,
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
          backgroundColor: theme.palette.background.default,
          backgroundImage: `linear-gradient(${alpha(
            theme.palette.common.white,
            0.05,
          )},${alpha(theme.palette.common.white, 0.05)})`,
          bottom: fullScreen ? '0' : undefined,
          display: 'flex',
          justifyContent: 'space-between',
          overflowY: 'hidden',
          p: '0 0.5rem !important',
          position: fullScreen ? 'fixed' : undefined,
          width: 'calc(100% - 1rem)',
          zIndex: 1,
          ...toolbarProps?.sx,
        } as any)
      }
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
    </Toolbar>
  );
};
