import React, { FC } from 'react';
import { Box } from '@mui/material';
import { MRT_FilterTextField } from './MRT_FilterTextField';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  instance: MRT_TableInstance;
}

export const MRT_FilterRangeFields: FC<Props> = ({ header, instance }) => {
  const {
    options: { localization },
  } = instance;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '6fr auto 5fr' }}>
      <MRT_FilterTextField header={header} inputIndex={0} instance={instance} />
      <Box
        sx={{
          width: '100%',
          minWidth: '5ch',
          textAlign: 'center',
        }}
      >
        {localization.to}
      </Box>
      <MRT_FilterTextField header={header} inputIndex={1} instance={instance} />
    </Box>
  );
};
