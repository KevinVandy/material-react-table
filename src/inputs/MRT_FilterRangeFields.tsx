import React, { FC } from 'react';
import { Box } from '@mui/material';
import { MRT_FilterTextField } from './MRT_FilterTextField';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  instance: MRT_TableInstance;
}

export const MRT_FilterRangeFields: FC<Props> = ({ header, instance }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '6fr 6fr', gap: '1rem' }}>
      <MRT_FilterTextField header={header} inputIndex={0} instance={instance} />
      <MRT_FilterTextField header={header} inputIndex={1} instance={instance} />
    </Box>
  );
};
