import React from 'react';
import Box from '@mui/material/Box';
import { MRT_FullScreenToggleButton } from '../buttons/MRT_FullScreenToggleButton';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { MRT_ToggleDensePaddingButton } from '../buttons/MRT_ToggleDensePaddingButton';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ToggleGlobalFilterButton } from '../buttons/MRT_ToggleGlobalFilterButton';
import type { MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarInternalButtons = <
  TData extends Record<string, any> = {},
>({
  table,
}: Props<TData>) => {
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
      initialState,
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
          {enableFilters &&
            enableGlobalFilter &&
            !initialState?.showGlobalFilter && (
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
