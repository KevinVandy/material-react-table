import React, { FC } from 'react';
import { styled } from '@mui/material';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_DensePaddingSwitch } from '../inputs/MRT_DensePaddingSwitch';
import { MRT_ToggleSearchButton } from '../buttons/MRT_ToggleSearchButton';

const ToolbarButtonsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

interface Props {}

export const MRT_ToolbarButtons: FC<Props> = () => {
  const { disableFilters, disableColumnHiding, disableDensePaddingToggle, disableGlobalFilter } =
    useMaterialReactTable();

  return (
    <ToolbarButtonsContainer>
      {!disableGlobalFilter && <MRT_ToggleSearchButton />}
      {!disableFilters && <MRT_ToggleFiltersButton />}
      {!disableColumnHiding && <MRT_ShowHideColumnsButton />}
      {!disableDensePaddingToggle && <MRT_DensePaddingSwitch />}
    </ToolbarButtonsContainer>
  );
};