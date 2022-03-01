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
    disableFilters,
    disableColumnHiding,
    disableDensePaddingToggle,
    disableGlobalFilter,
    disableFullScreenToggle,
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
      {!disableGlobalFilter && <MRT_ToggleSearchButton />}
      {!disableFilters && <MRT_ToggleFiltersButton />}
      {!disableColumnHiding && <MRT_ShowHideColumnsButton />}
      {!disableDensePaddingToggle && <MRT_ToggleDensePaddingButton />}
      {!disableFullScreenToggle && <MRT_FullScreenToggleButton />}
    </Box>
  );
};
