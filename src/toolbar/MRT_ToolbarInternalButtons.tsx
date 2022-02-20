import React, { FC } from 'react';
import { styled } from '@mui/material';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { useMRT } from '../useMRT';
import { MRT_ToggleDensePaddingButton } from '../buttons/MRT_ToggleDensePaddingButton';
import { MRT_ToggleSearchButton } from '../buttons/MRT_ToggleSearchButton';
import { MRT_FullScreenToggleButton } from '../buttons/MRT_FullScreenToggleButton';

const ToolbarButtonsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

interface Props {}

export const MRT_ToolbarInternalButtons: FC<Props> = () => {
  const {
    disableFilters,
    disableColumnHiding,
    disableDensePaddingToggle,
    disableGlobalFilter,
    disableFullScreenToggle,
  } = useMRT();

  return (
    <ToolbarButtonsContainer>
      {!disableGlobalFilter && <MRT_ToggleSearchButton />}
      {!disableFilters && <MRT_ToggleFiltersButton />}
      {!disableColumnHiding && <MRT_ShowHideColumnsButton />}
      {!disableDensePaddingToggle && <MRT_ToggleDensePaddingButton />}
      {!disableFullScreenToggle && <MRT_FullScreenToggleButton />}
    </ToolbarButtonsContainer>
  );
};
