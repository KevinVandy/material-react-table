import React, { FC } from 'react';
import { Box } from '@mui/material';
import { MRT_FullScreenToggleButton } from '../buttons/MRT_FullScreenToggleButton';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { MRT_ToggleDensePaddingButton } from '../buttons/MRT_ToggleDensePaddingButton';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ToggleGlobalFilterButton } from '../buttons/MRT_ToggleGlobalFilterButton';
import { MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_ToolbarInternalButtons: FC<Props> = ({ tableInstance }) => {
  const {
    options: {
      enableColumnFilters,
      enableDensePaddingToggle,
      enableFilters,
      enableFullScreenToggle,
      enableGlobalFilter,
      enableHiding,
      renderToolbarInternalActions,
    },
  } = tableInstance;

  if (renderToolbarInternalActions) {
    return (
      <>
        {renderToolbarInternalActions({
          MRT_FullScreenToggleButton,
          MRT_ShowHideColumnsButton,
          MRT_ToggleDensePaddingButton,
          MRT_ToggleFiltersButton,
          MRT_ToggleGlobalFilterButton,
          tableInstance,
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
      {enableFilters && enableGlobalFilter && (
        <MRT_ToggleGlobalFilterButton tableInstance={tableInstance} />
      )}
      {enableFilters && enableColumnFilters && (
        <MRT_ToggleFiltersButton tableInstance={tableInstance} />
      )}
      {enableHiding && (
        <MRT_ShowHideColumnsButton tableInstance={tableInstance} />
      )}
      {enableDensePaddingToggle && (
        <MRT_ToggleDensePaddingButton tableInstance={tableInstance} />
      )}
      {enableFullScreenToggle && (
        <MRT_FullScreenToggleButton tableInstance={tableInstance} />
      )}
    </Box>
  );
};
