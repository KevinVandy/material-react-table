import Box from '@mui/material/Box';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { MRT_ToggleDensePaddingButton } from '../buttons/MRT_ToggleDensePaddingButton';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ToggleFullScreenButton } from '../buttons/MRT_ToggleFullScreenButton';
import { MRT_ToggleGlobalFilterButton } from '../buttons/MRT_ToggleGlobalFilterButton';
import { type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
}

export const MRT_ToolbarInternalButtons = <TData extends Record<string, any>>({
  table,
}: Props<TData>) => {
  const {
    options: {
      columnFilterDisplayMode,
      enableColumnFilters,
      enableColumnOrdering,
      enableColumnPinning,
      enableDensityToggle,
      enableFilters,
      enableFullScreenToggle,
      enableGlobalFilter,
      enableHiding,
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
          {enableFilters &&
            enableColumnFilters &&
            columnFilterDisplayMode !== 'popover' && (
              <MRT_ToggleFiltersButton table={table} />
            )}
          {(enableHiding || enableColumnOrdering || enableColumnPinning) && (
            <MRT_ShowHideColumnsButton table={table} />
          )}
          {enableDensityToggle && (
            <MRT_ToggleDensePaddingButton table={table} />
          )}
          {enableFullScreenToggle && (
            <MRT_ToggleFullScreenButton table={table} />
          )}
        </>
      )}
    </Box>
  );
};
