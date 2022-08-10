import React, { FC } from 'react';
import { Box } from '@mui/material';
import { MRT_FullScreenToggleButton } from '../buttons/MRT_FullScreenToggleButton';
import { MRT_GlobalFilterTextField } from '../inputs/MRT_GlobalFilterTextField';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { MRT_ToggleDensePaddingButton } from '../buttons/MRT_ToggleDensePaddingButton';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ToggleGlobalFilterButton } from '../buttons/MRT_ToggleGlobalFilterButton';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_ToolbarInternalButtons: FC<Props> = ({ table }) => {
  const {
    options: {
      enableColumnFilters,
      enableColumnOrdering,
      enableDensityToggle,
      enableFilters,
      enableFullScreenToggle,
      enableGlobalFilter,
      enableHiding,
      enablePinning,
      positionGlobalFilter,
      renderToolbarInternalActions,
    },
  } = table;

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        zIndex: 3,
      }}
    >
      {renderToolbarInternalActions?.({
        table,
      }) ?? (
        <>
          {enableGlobalFilter && positionGlobalFilter === 'right' && (
            <MRT_GlobalFilterTextField table={table} />
          )}
          {enableFilters && enableGlobalFilter && (
            <MRT_ToggleGlobalFilterButton table={table} />
          )}
          {enableFilters && enableColumnFilters && (
            <MRT_ToggleFiltersButton table={table} />
          )}
          {(enableHiding || enableColumnOrdering || enablePinning) && (
            <MRT_ShowHideColumnsButton table={table} />
          )}
          {enableDensityToggle && (
            <MRT_ToggleDensePaddingButton table={table} />
          )}
          {enableFullScreenToggle && (
            <MRT_FullScreenToggleButton table={table} />
          )}
        </>
      )}
    </Box>
  );
};
