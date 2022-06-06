import React from 'react';
import { SourceCodeSnippet } from '../../components/mdx/SourceCodeSnippet';
import Example from './sandbox/src/TS';
const JS = require('!!raw-loader!./sandbox/src/JS.js').default;
const TS = require('!!raw-loader!./sandbox/src/TS.tsx').default;

const ExampleTable = () => {
  return (
    <SourceCodeSnippet
      codeSandboxURL="https://codesandbox.io/s/github/KevinVandy/material-react-table/tree/main/material-react-table-docs/examples/advanced/sandbox?file=/src/TS.tsx"
      Component={Example}
      javaScriptCode={JS}
      typeScriptCode={TS}
    />
  );
};

export default ExampleTable;
