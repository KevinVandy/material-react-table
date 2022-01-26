import React, { FC } from 'react';
import { styled } from '@mui/material';
import { MRT_ToggleFiltersButton } from '../buttons/MRT_ToggleFiltersButton';
import { MRT_ShowHideColumnsButton } from '../buttons/MRT_ShowHideColumnsButton';
import { useMaterialReactTable } from '../useMaterialReactTable';

const ToolbarButtonsContainer = styled('div')({
  display: 'flex',
  gap: '0.5rem',
});

interface Props {}

export const MRT_ToolbarButtons: FC<Props> = () => {
  const { disableFilters } = useMaterialReactTable();

  return (
    <ToolbarButtonsContainer>
      {!disableFilters && <MRT_ToggleFiltersButton />}
      <MRT_ShowHideColumnsButton />
    </ToolbarButtonsContainer>
  );
};
