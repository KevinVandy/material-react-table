import React, { FC } from 'react';
import { alpha, Box, Theme, Toolbar } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { MRT_ToolbarInternalButtons } from './MRT_ToolbarInternalButtons';
import { MRT_TablePagination } from './MRT_TablePagination';
import { MRT_ToolbarAlertBanner } from './MRT_ToolbarAlertBanner';
import { MRT_LinearProgressBar } from './MRT_LinearProgressBar';
import { MRT_TableInstance } from '..';

export const commonToolbarStyles = ({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  backgroundImage: `linear-gradient(${alpha(
    theme.palette.common.white,
    0.05,
  )},${alpha(theme.palette.common.white, 0.05)})`,
  display: 'grid',
  p: '0 !important',
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
      idPrefix,
      muiTableToolbarTopProps,
      positionPagination,
      positionToolbarActions,
      positionToolbarAlertBanner,
      renderToolbarCustomActions,
    },
  } = tableInstance;

  const { isFullScreen } = getState();

  const toolbarProps =
    muiTableToolbarTopProps instanceof Function
      ? muiTableToolbarTopProps({ tableInstance })
      : muiTableToolbarTopProps;

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
        <MRT_ToolbarAlertBanner tableInstance={tableInstance} />
      )}
      <Box
        sx={{
          p: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {renderToolbarCustomActions?.({ tableInstance }) ?? <span />}
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {enableGlobalFilter && (
            <MRT_SearchTextField tableInstance={tableInstance} />
          )}
          {enableToolbarInternalActions && positionToolbarActions === 'top' && (
            <MRT_ToolbarInternalButtons tableInstance={tableInstance} />
          )}
        </Box>
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
