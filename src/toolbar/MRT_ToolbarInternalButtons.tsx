import React, { FC } from 'react';
import { Box } from '@mui/material';
import { MRT_FullScreenToggleButton } from '../buttons/MRT_FullScreenToggleButton';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { MRT_ToggleDensePaddingButton } from '../buttons/MRT_ToggleDensePaddingButton';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ToggleGlobalFilterButton } from '../buttons/MRT_ToggleGlobalFilterButton';
import { MRT_TableInstance } from '..';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';

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

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        zIndex: 3,
      }}
    >
      {renderToolbarInternalActions?.({
        MRT_FullScreenToggleButton,
        MRT_ShowHideColumnsButton,
        MRT_ToggleDensePaddingButton,
        MRT_ToggleFiltersButton,
        MRT_ToggleGlobalFilterButton,
        tableInstance,
      }) ?? (
        <>
          {enableGlobalFilter && (
            <MRT_SearchTextField tableInstance={tableInstance} />
          )}
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
        </>
      )}
    </Box>
  );
};
