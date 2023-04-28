import React from 'react';
import Box from '@mui/material/Box';
import { TRT_FilterTextField } from './TRT_FilterTextField';
import { TRT_Header, TRT_TableInstance } from '..';

interface Props {
  header: TRT_Header;
  table: TRT_TableInstance;
}

export const TRT_FilterRangeFields = ({ header, table }: Props) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '6fr 6fr', gap: '1rem' }}>
      <TRT_FilterTextField header={header} rangeFilterIndex={0} table={table} />
      <TRT_FilterTextField header={header} rangeFilterIndex={1} table={table} />
    </Box>
  );
};
