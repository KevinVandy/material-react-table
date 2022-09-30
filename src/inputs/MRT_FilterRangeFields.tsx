import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { MRT_FilterTextField } from './MRT_FilterTextField';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  table: MRT_TableInstance;
}

export const MRT_FilterRangeFields: FC<Props> = ({ header, table }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '6fr 6fr', gap: '1rem' }}>
      <MRT_FilterTextField header={header} rangeFilterIndex={0} table={table} />
      <MRT_FilterTextField header={header} rangeFilterIndex={1} table={table} />
    </Box>
  );
};
