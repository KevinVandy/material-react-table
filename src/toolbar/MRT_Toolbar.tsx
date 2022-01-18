import React, { FC } from 'react';
import { styled, Toolbar as MuiToolbar, Typography } from '@mui/material';
import { MRT_SearchTextField } from '../inputs/MRT_SearchTextField';
import { useMaterialReactTable } from '../useMaterialReactTable';

const Toolbar = styled(MuiToolbar)({
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
});

interface Props {}

export const MRT_Toolbar: FC<Props> = () => {
  const {
    enableSearch,
    title,
    tableTitleProps,
    OverrideTableToolbarComponent,
    tableInstance,
  } = useMaterialReactTable();

  if (OverrideTableToolbarComponent) {
    return <>{OverrideTableToolbarComponent(tableInstance)}</>;
  }

  return (
    <Toolbar>
      {title ? <Typography {...tableTitleProps}>{title}</Typography> : <span />}
      {enableSearch && <MRT_SearchTextField />}
    </Toolbar>
  );
};
