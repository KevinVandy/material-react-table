import React, { FC } from 'react';
import { Box } from '@mui/material';
import { MRT_FullScreenToggleButton } from '../buttons/MRT_FullScreenToggleButton';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { MRT_ToggleDensePaddingButton } from '../buttons/MRT_ToggleDensePaddingButton';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ToggleSearchButton } from '../buttons/MRT_ToggleSearchButton';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_ToolbarInternalButtons: FC<Props> = () => {
  const {
    enableColumnFilters,
    enableHiding,
    enableDensePaddingToggle,
    enableGlobalFilter,
    enableFullScreenToggle,
    renderToolbarInternalActions,
    tableInstance,
  } = useMRT();

  if (renderToolbarInternalActions) {
    return (
      <>
        {renderToolbarInternalActions(tableInstance, {
          MRT_ToggleSearchButton,
          MRT_ToggleFiltersButton,
          MRT_ShowHideColumnsButton,
          MRT_ToggleDensePaddingButton,
          MRT_FullScreenToggleButton,
        })}
      </>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
        p: '0 0.5rem',
      }}
    >
      {enableGlobalFilter && <MRT_ToggleSearchButton />}
      {enableColumnFilters && <MRT_ToggleFiltersButton />}
      {enableHiding && <MRT_ShowHideColumnsButton />}
      {enableDensePaddingToggle && <MRT_ToggleDensePaddingButton />}
      {enableFullScreenToggle && <MRT_FullScreenToggleButton />}
    </Box>
  );
};
