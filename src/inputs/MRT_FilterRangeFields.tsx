import React, { FC } from 'react';
import { Box } from '@mui/material';
import { MRT_FilterTextField } from './MRT_FilterTextField';
import { MRT_Header, MRT_TableInstance } from '..';

interface Props {
  header: MRT_Header;
  tableInstance: MRT_TableInstance;
}

const MRT_FilterRangeFields: FC<Props> = ({ header, tableInstance }) => {
  const {
    options: { localization },
  } = tableInstance;

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '6fr auto 5fr' }}>
      <MRT_FilterTextField
        header={header}
        inputIndex={0}
        tableInstance={tableInstance}
      />
      <Box
        sx={{
          width: '100%',
          minWidth: '5ch',
          textAlign: 'center',
        }}
      >
        {localization.to}
      </Box>
      <MRT_FilterTextField
        header={header}
        inputIndex={1}
        tableInstance={tableInstance}
      />
    </Box>
  );
};

export default MRT_FilterRangeFields;
