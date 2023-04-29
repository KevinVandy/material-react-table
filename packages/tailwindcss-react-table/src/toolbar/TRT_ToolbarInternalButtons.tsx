import React from 'react';
import Box from '@mui/material/Box';
import { TRT_FullScreenToggleButton } from '../buttons/TRT_FullScreenToggleButton';
import { TRT_ShowHideColumnsButton } from '../buttons/TRT_ShowHideColumnsButton';
import { TRT_ToggleDensePaddingButton } from '../buttons/TRT_ToggleDensePaddingButton';
import { TRT_ToggleFiltersButton } from '../buttons/TRT_ToggleFiltersButton';
import { TRT_ToggleGlobalFilterButton } from '../buttons/TRT_ToggleGlobalFilterButton';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.d';

interface Props<TData extends Record<string, any> = {}> {
  table: TRT_TableInstance<TData>;
}

export const TRT_ToolbarInternalButtons = <
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
              <TRT_ToggleGlobalFilterButton table={table} />
            )}
          {enableFilters && enableColumnFilters && (
            <TRT_ToggleFiltersButton table={table} />
          )}
          {(enableHiding || enableColumnOrdering || enablePinning) && (
            <TRT_ShowHideColumnsButton table={table} />
          )}
          {enableDensityToggle && (
            <TRT_ToggleDensePaddingButton table={table} />
          )}
          {enableFullScreenToggle && (
            <TRT_FullScreenToggleButton table={table} />
          )}
        </>
      )}
    </Box>
  );
};
