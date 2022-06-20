import React from 'react';
import { Box, NoSsr, Typography } from '@mui/material';
import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
const TS = require('!!raw-loader!./ColumnOptionsTable.tsx').default;

const ExampleTable = () => {
  return (
    <NoSsr>
      <Box sx={{ mt: '20rem' }}>
        <Typography>
          Wanna see the source code for this table? Check it out down below!
        </Typography>
        <SourceCodeSnippet tableId='column-options' typeScriptCode={TS} />
      </Box>
    </NoSsr>
  );
};

export default ExampleTable;
